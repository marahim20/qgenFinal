import React from "react";

const MCQDisplayer = (questions) => {
  return questions.map((quest, index) => {
    return (
      <React.Fragment>
        <div
          key={index}
          className="text-xl flex flex-col p-4 m-4 rounded-2xl bg-gray-200"
        >
          <div className="flex items-center">
            <div className="z-0">{quest.question}</div>
          </div>
          {quest.options.map((option, index1) => {
            return <div key={index1}>{option}</div>;
          })}
          <div className="text-green-700">{quest.answer}</div>
        </div>
      </React.Fragment>
    );
  });
};

export default MCQDisplayer;
