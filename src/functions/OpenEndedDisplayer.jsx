import React from "react";

const OpenEndedDisplayer = (questions) => {
    return questions.map((quest, index) => {
        return (
            <React.Fragment key={index}>
                <div className="text-xl p-4 m-4 rounded-2xl bg-gray-200">
                    <div>{quest.question}</div>
                    <div className="mt-2 text-green-700">{quest.answer}</div>
                </div>
            </React.Fragment>
        );
    });
};

export default OpenEndedDisplayer;