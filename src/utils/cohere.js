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
    resolve(response.body.classifications);
  });
};

module.exports = classify;
