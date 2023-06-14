import React from "react";

const FillInTheBlanksDisplayer = (questions) => {
    return questions.map((quest, index) => {
        return (
            <React.Fragment key={index}>
                <div className="text-xl flex flex-col p-4 m-4 rounded-2xl bg-gray-200">
                    <div className="flex items-center">
                        <div className="z-0">{quest.question}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-green-700">
                            {quest.answer}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    });
};

export default FillInTheBlanksDisplayer;
