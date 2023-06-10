const MCQParser = (responseLocal) => {
  const questionsList = responseLocal.split("\n\n");
  const questions = [];
  console.log(questionsList);

  questionsList.forEach((element) => {
    const respT = element.split("\n");
    const question = {
      question: respT[0],
      answer: respT[5],
      options: respT.slice(1, 5),
      showAnswer: false,
    };
    questions.push(question);
  });
  console.log(questions);
  return questions;
};

export default MCQParser;
