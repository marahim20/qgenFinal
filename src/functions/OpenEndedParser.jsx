const OpenEndedParser = (responseLocal) => {
    const lines = responseLocal.split("\n");
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
                answer: answerLine,
            };

            questions.push(currentQuestion);
        } else {
            continue;
        }

    }

    console.log(questions);
    return questions;
};

export default OpenEndedParser;