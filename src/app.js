import 'dotenv/config';
const express = require('express')
const bodyParser = require('body-parser')
const myCohere = require('./utils/cohere')
const app = express()
const port = 3000

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/input', (req, res) => {
  if (!req.body.inputs) {
    res.send({
      error: 'you must provide a valid input'
    })
  }
  myCohere(req.body.inputs).then( results => {
    let parsedResults = [];
    for ( const result of results) {
      parsedResults.push({
        input: result.input,
        prediction: result.prediction,
        confidences: result.confidences,
       });
    }
    res.send(parsedResults);
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})