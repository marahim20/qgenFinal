import openAI, { Configuration, OpenAIApi } from "openai";

const generateQuestions = async (inputText, qtype) => {
    // console.log(inputText, qtype)
    // console.log(import.meta.env.VITE_OPENAI_KEY)
    const gptAPIKey = import.meta.env.VITE_OPENAI_KEY
    const configuration = new Configuration({
      apiKey: gptAPIKey,
    });
  
    let convo = [
      {
        role: "system",
        content: "You are a professional writer capable of editing content and generating MCQ questions from given text content only. The generated response shall have the MCQ questions and its answers.",
      },
      {
        role: "user",
        content: `format:
        1.Question
        a.content
        b.content
        c.content
        d.content
        Answer:option)content
        text:
         ${inputText}`,
      }
    ]
  
    const openAI = new OpenAIApi(configuration);
    try {
      const generateQuestions1 = async () => {
        const response = await openAI.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: convo,
          max_tokens: 1500,
        })
        // console.log(response);
  
        let generatedQuestions = response.data.choices[0].message?.content;
        // let generatedQuestions = response.data;
        return generatedQuestions;
      }
      const questions = generateQuestions1();
      return questions;
    } catch (error) {
      console.error(error)
    }
  }
  
  export default generateQuestions;