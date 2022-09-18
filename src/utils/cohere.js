const cohere = require("cohere-ai");

cohere.init("fI8gMsefp8fym7XyxHFX3ihZav4fEjIaAdqlaQS3");

const classify = async (inputs) => {
  const response = await cohere.classify({
    inputs: [inputs],
    examples: [
      { text: "I want to cry everyday.", label: "bad" },
      { text: "I have no motivation to get out of bed.", label: "bad" },
      { text: "There is a piercing pain in my heart.", label: "bad" },
      { text: "I have shortness of breath.", label: "bad" },
      { text: "I haven't been pooping.", label: "bad" },
      { text: "I am feeling better than yesterday.", label: "good" },
      { text: "My condition is improving.", label: "good" },
      { text: "My symptoms are going away.", label: "good" },
      { text: "I am experiencing less pain.", label: "good" },
      { text: "I'm not feeling tired and I have energy.", label: "good" },
      { text: "My bowel movement is good.", label: "good" },
      { text: "My stomach stopped hurting.", label: "good" },
      {
        text: "The medication has helped relieve some symptoms.",
        label: "good",
      },
      { text: "I almost feel back to normal.", label: "good" },
      { text: "I am feeling great.", label: "good" },
      { text: "There has been visible progress in my rehab.", label: "good" },
      { text: "I'm feeling better", label: "good" },
      { text: "I'm feeling a bit better", label: "good" },
      { text: "I'm ready to go home", label: "good" },
      { text: "I am regaining my sense of smell", label: "good" },
      { text: "My vision has returned", label: "good" },
      { text: "My vision has improved", label: "good" },
      { text: "My vision isn't blurry anymore", label: "good" },
      { text: "I can stand on my own", label: "good" },
      { text: "There has been no improvement.", label: "okay" },
      { text: "I'm doing okay.", label: "okay" },
      { text: "Nothing bad has happened to me today.", label: "okay" },
      {
        text: "I am feeling some pain, but it has gotten better.",
        label: "okay",
      },
      { text: "There is a weird sensation in my arm.", label: "okay" },
      { text: "I am just here for an annual checkup.", label: "okay" },
      { text: "I want to go on a walk.", label: "okay" },
      {
        text: "Alright, I wanted to check on my post-surgery stitches",
        label: "okay",
      },
      { text: "It has been a long day.", label: "okay" },
      { text: "I do not feel like I have been getting better.", label: "okay" },
      { text: "I feel neither good nor bad", label: "okay" },
      { text: "I am feeling a bit numb", label: "okay" },
      { text: "I feel fine", label: "okay" },
      { text: "My blood pressure is normal", label: "okay" },
      { text: "I don't feel tired", label: "okay" },
      { text: "I dont have a large appetite", label: "okay" },
      { text: "I don't want to walk much", label: "okay" },
      { text: "I have a regular diet", label: "okay" },
      { text: "I have been eating the normal amount of meals", label: "okay" },
      { text: "I am back at my normal weight", label: "okay" },
      { text: "I feel around the same as usual", label: "okay" },
      { text: "Nothing new has happened to me", label: "okay" },
      {
        text: "My cough has gotten worse, but my sore throat has gotten better.",
        label: "okay",
      },
      { text: "I feel less sick, but my stomache persists", label: "okay" },
      {
        text: "My fever has gotten better, but I stil do not feel very well",
        label: "okay",
      },
      { text: "My blood pressure is normal", label: "okay" },
    ],
  });
  return new Promise((resolve, reject) => {
    if (!response.body) {
      reject("Error during cohere.classify");
    }
    resolve(response.body.classifications);
  });
};

const extract = async(input) => {
    const response = await cohere.generate({
      prompt: "This program will extract key medical terms from patient passages that describe their symptoms. Here are some examples:\nPassage: I'm feeling a headache, my left knee is hurting, my nose is stuffy but I feel good. Also, I tore my achilles.\n\nExtracted symptoms: headache, left knee pain, nasal congestion, torn achilles\n\n--\n\nPassage: My mom visited today and it was good to see her. My dog died. The hospital food is surprisingly decent. The numbness in my right ear is gone but I think I have the flu. I'm coughing a lot and feeling really tired.\n\nExtracted symptoms: cough, fatigue\n\n--\n\nPassage: It looks warmer outside today. I'm still having diarrhea, but the pressure in my head is gone. The blood from my wound is still there and my vision is blurry.\n\nExtracted symptoms: diarrhea, headache, wound, blurry vision\n\n--\n\n\Passage: Yesterday, I saw Gorgina at the grovery store, but something seemed wrong. I couldn't really understand what she was saying to me. What was weirder was that one side of her face wasn't moving. She was stumbling into shelves and squinting a lot.\n\nExtracted symptoms: stroke, vision loss\n\n--\n\nPassage: Today, I was taking a walk around the neighbouhood when passed my best friend. I had a conversation with her, but she looked a little off balance. I'm not sure what it is but the was stumbling, and squinting a lot. One side of her face is drooping and it became difficult to understand her speaking.\n\nExtracted symptoms: stroke, loss of vision\n\n--\n\nPassage: I tore my meniscus and broke my tibia\n\nExtracted symptoms: torn meniscus, fractured tibia\n\n--\n\nPassage: " + input + "\n\nExtracted symptoms: ",
      model: 'large',
      max_tokens: 10,
      temperature: 0.5,
      stop_sequences: ['--'],
      p: 1.0,
    });
    return new Promise((resolve, reject) => {
      if (!response.body) {
        reject("Error during cohere.classify");
      }
      const returnText = response.body.generations[0].text;
      if (returnText.slice(-2) == "--") {
        resolve(returnText.slice(0, -2).trim())
      } else {
        resolve(returnText);
      }
    });
  
  

}

module.exports = { classify, extract};
