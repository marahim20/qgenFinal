// const TrueFalseParser = (response) => {
//     const lines = response.split("\n");
//     const questions = [];

//     for (let i = 0; i < lines.length; i += 2) {
//         const questionText = lines[i];
//         const answerLine = lines[i + 1];
//         const answer = answerLine.substring(8).trim().toLowerCase() === "true";

//         const question = {
//             question: questionText,
//             answer: answer,
//         };

//         questions.push(question);
//     }

//     return questions;
// };

// export default TrueFalseParser;


const TrueFalseParser = (response) => {
    const lines = response.split("\n");
    const questions = [];

    let currentQuestion = null;

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        if (/^\d+\./.test(line)) {
            // Line starts with a digit, indicating a new question
            const questionLine = line;
            const answerLine = lines[i + 1];

            currentQuestion = {
                question: questionLine,
                answer: answerLine.substring(8).trim().toLowerCase() === "true",
            };

            questions.push(currentQuestion);
        } else {
            continue;
        }
    }

    return questions;
};

export default TrueFalseParser;
