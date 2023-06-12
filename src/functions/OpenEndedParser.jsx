const OpenEndedParser = (responseLocal) => {
    const questionsList = responseLocal.split("\n\n");
    const questions = [];

    questionsList.forEach((element) => {
        const respT = element.split("\n");
        const question = {
            question: respT[0],
            answer: respT[1],
            showAnswer: false,
        };
        questions.push(question);
    });

    console.log(questions);
    return questions;
};

export default OpenEndedParser;