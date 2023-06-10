import MCQDisplayer from "./functions/MCQDisplayer";
import History from "./pages/History.jsx";
import AppLeft from "./pages/AppLeft";
import { useState } from "react";

export default function App() {
  const [questionsGlobal, setQuestionsGlobal] = useState([
    // {
    //   question: "Question1",
    //   answer: "answer1",
    //   options: ["option1", "option2", "option3", "option4"],
    //   showAnswer: false,
    // },
  ]);
  const handleQuestionsUpdate = (updatedQuestions) => {
    setQuestionsGlobal(updatedQuestions);
  };
  return (
    <>
      <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              <AppLeft onQuestionsUpdate={handleQuestionsUpdate} />
              <div
                id="right"
                className="flex-1 p-4 border-l-2 border-gray-400 text-black"
              >
                <div className="bg-red-300 h-full rounded-2xl overflow-auto scrollbar-hide">
                  {MCQDisplayer(questionsGlobal)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
