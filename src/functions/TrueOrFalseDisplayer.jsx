import React from "react";

const TrueFalseDisplayer = (questions) => {
    return questions.map((quest, index) => {
        return (
            <div
                key={index}
                className="text-xl flex flex-col p-4 m-4 rounded-2xl bg-gray-200"
            >
                <div className="flex items-center">
                    <div className="z-0">{quest.question}</div>
                </div>
                <div className="text-green-700">{quest.answer ? "True" : "False"}</div>
            </div>
        );
    });
};

export default TrueFalseDisplayer;