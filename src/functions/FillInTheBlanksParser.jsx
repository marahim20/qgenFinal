const FillInTheBlanksParser = (responseLocal) => {
    const questionsList = responseLocal.split("\n\n");
    const questions = [];

    questionsList.forEach((element) => {
        const respT = element.split("\n");
        const answer = respT[1].substring(8);
        const question = {
            question: respT[0],
            answer: answer,
            showAnswer: false,
        };
        questions.push(question);
    });

    return questions;
};

export default FillInTheBlanksParser;
