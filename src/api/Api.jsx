import { switchCase } from "@babel/types";
import openAI, { Configuration, OpenAIApi } from "openai";

const generateQuestions = async (inputText, qtype) => {
     console.log(inputText, qtype)
    // console.log(import.meta.env.VITE_OPENAI_KEY)
    const gptAPIKey = import.meta.env.VITE_OPENAI_KEY
    const configuration = new Configuration({
      apiKey: gptAPIKey,
    });

    let format_for_answer=`format:
    1.Question
    a.content
    b.content
    c.content
    d.content
    Answer:option)content
    text:
     ${inputText}`
    switch (qtype) {
      case "MCQs":
        break;
      case "Open-Ended":
        format_for_answer=`format:
                            1.Question
                            Answer:content
                            text:
                            ${inputText}`;
        break;
      case "Fill in the Blanks":
        format_for_answer=`format:
                            1.Question
                            Answer:content
                            text:
                            ${inputText}`;
        break;
      case "True or False":
        format_for_answer=`format:
                            1.Question
                            Answer:content
                            text:
                            ${inputText}`;
      default:
        console.log("Selected fruit is not apple, banana, or orange.");
    }
    let convo = [
      {
        role: "system",
        content: "You are a professional writer capable of editing content and generating " +{qtype}+ " questions from given text content only. The generated response shall have the " +{qtype}+ " questions and its answers."
      },
      {
        role: "user",
        content: format_for_answer,
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