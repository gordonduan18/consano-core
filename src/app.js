require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const myCohere = require('./utils/cohere')
const Sequelize = require('sequelize-cockroachdb');

const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialectOptions: {
    application_name: "docs_simplecrud_node-sequelize"
  }
});

const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Home Page
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Classify Inputs
app.post('/input', (req, res) => {
  if (!req.body.inputs) {
    res.send({
      error: 'you must provide a valid input'
    })
  }
  myCohere.classify(req.body.inputs).then( results => {
    console.log(results);
    let parsedResults = [];
    for ( const result of results) {
      let myScore = 0;
      for ( const label of result.confidences ) {
        if (label.option == "bad") myScore += (0.01 * label.confidence);
        else if (label.option == "good") myScore += label.confidence;
        else if (label.option == "okay") myScore += (0.5 * label.confidence);
      }
      myScore *= 100;
      parsedResults.push({
        input: result.input,
        prediction: result.prediction,
        score: myScore,
       });
    }
    res.send(parsedResults);
  }).catch( error => {
    console.log(error);
  });
})

const MyEntries = sequelize.define("myentries", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.TEXT,
  },
  lastName: {
    type: Sequelize.TEXT,
  },
  passage: {
    type: Sequelize.TEXT,
  },
  score: {
    type: Sequelize.FLOAT,
  },
  symptoms: {
    type: Sequelize.TEXT,
  }
});

// Get all Entries
app.get('/entries', (req, res) => {
  MyEntries.sync({
    force: false,
  }).then( () => {
    return MyEntries.findAll();
  }).then( (people) => {
    res.send(people);
  })
})

// Insert Entry into DB
app.post('/entries', (req, res) => {
  console.log(req.body);
  MyEntries.sync({
    force: false,
  }).then( () => {
    return MyEntries.bulkCreate([
      { firstName, lastName, passage, score, symptoms } = req.body
    ])
  }).catch(err => {
    console.log("error: ", err);
  });

  res.send("Entries have been created");
})


app.post('/extract', (req, res) => {
  if (!req.body.inputs) {
    res.send({
      error: 'you must provide a valid input'
    })
  }
  console.log(myCohere.extract(req.body.inputs));
  myCohere.extract(req.body.inputs).then(result => {
    res.send(result);
  }).catch(error => {
    console.log(error);
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})