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
      { text: "I have lower back pain.", label: "bad" },
      { text: "It mgiht be infected.", label: "bad" },
      { text: "I have been coughing since last week.", label: "bad" },
      {
        text: "I don't feel well, could you prescrive me with some medication.",
        label: "bad",
      },
      { text: "I have been having a fever and a running nose.", label: "bad" },
      { text: "I have a sore throat.", label: "bad" },
      { text: "There is nasal congestion.", label: "bad" },
      { text: "I am having trouble breathing.", label: "bad" },
      { text: "I have chest burn", label: "bad" },
      { text: "I am feeling ancious", label: "bad" },
      { text: "I hit my head and then blacked out.", label: "bad" },
      { text: "I got into a car accident.", label: "bad" },
      { text: "My shoulder has bee dislocated. ", label: "bad" },
      { text: "I am feeling better than yesterday.", label: "good" },
      { text: "My condition is improving.", label: "good" },
      { text: "My symptoms are going away.", label: "good" },
      { text: "I am experiencing less pain.", label: "good" },
      { text: "I'm not feeling tired and I have energy. ", label: "good" },
      { text: "My bowel movement is good.", label: "good" },
      { text: "My stomach stopped hurting.", label: "good" },
      {
        text: "The medicaiton has helped relieve some symptoms. ",
        label: "good",
      },
      { text: "I almost feel back to normal.", label: "good" },
      { text: "I am feeling great. ", label: "good" },
      { text: "There has been visibile progress in my rehab.", label: "good" },
      { text: "My fever is dying down", label: "good" },
      { text: "I can breathe easier", label: "good" },
      { text: "I'm coughing up less fluid", label: "good" },
      { text: "I feel an appetite again", label: "good" },
      { text: "I feel less pressure in my head", label: "good" },
      { text: "My blood pressure is normal", label: "good" },
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
        text: "Alright, I wanted to check on my post-surgery stithces.",
        label: "okay",
      },
      { text: "I has been a long day.", label: "okay" },
      { text: "I do not feel like I have been getting better.", label: "okay" },
      { text: "I am safe, but my family member is in danger", label: "okay" },
      { text: "I don't want to walk much", label: "okay" },
      { text: "I have a regular diet", label: "okay" },
      { text: "I have been eating the normal amount of meals", label: "okay" },
      { text: "I am back at my normal weight", label: "okay" },
    ],
  });
  return new Promise((resolve, reject) => {
    resolve(response.body.classifications);
  });
};

module.exports = classify;
