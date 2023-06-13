// const TrueFalseParser = (response) => {
//     const questionsList = response.split("\n\n");
//     const questions = [];

//     questionsList.forEach((element) => {
//         const respT = element.split("\n");
//         const question = {
//             question: respT[0],
//             answer: respT[1].substring(8).toLowerCase() === "true",
//         };
//         questions.push(question);
//     });

//     return questions;
// };

// export default TrueFalseParser;

const TrueFalseParser = (response) => {
    const questionsList = response.split("\n\n");
    const questions = [];

    questionsList.forEach((element) => {
        const respT = element.split("\n");
        let questionText = respT[0];
        let answerLineIndex = respT.findIndex((line) => line.startsWith("Answer:"));
        if (answerLineIndex === -1) {
            answerLineIndex = respT.findIndex((line, index) => index > 0 && line.startsWith("Answer:"));
            questionText = respT.slice(0, answerLineIndex).join(" ");
        }
        const question = {
            question: questionText,
            answer: respT[answerLineIndex].substring(8).trim().toLowerCase() === "true",
        };
        questions.push(question);
    });

    return questions;
};

export default TrueFalseParser;
