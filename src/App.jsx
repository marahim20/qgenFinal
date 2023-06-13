import MCQDisplayer from "./functions/MCQDisplayer";
import OpenEndedDisplayer from "./functions/OpenEndedDisplayer.jsx";
import TrueOrFalseDisplayer from "./functions/TrueOrFalseDisplayer.jsx";
import FillInTheBlanksDisplayer from "./functions/FillInTheBlanksDisplayer.jsx";
import History from "./pages/History.jsx";
import AppLeft from "./pages/AppLeft";
import { useState } from "react";

export default function App() {
  const [questionsGlobal, setQuestionsGlobal] = useState([
  ]);
  const [qtype, setQType] = useState("");
  const handleQuestionsUpdate = (updatedQuestions) => {
    setQuestionsGlobal(updatedQuestions);
    console.log("updatedQuestions", updatedQuestions);
  };
  const handleQTypeUpdate = (updatedQType) => {
    setQType(updatedQType);
    console.log("updatedQType", updatedQType);
  };
  return (
    <>
      <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              <AppLeft onQuestionsUpdate={handleQuestionsUpdate} onQTypeUpdate={handleQTypeUpdate} />
              <div
                id="right"
                className="flex-1 p-4 border-l-2 border-gray-400 text-black"
              >
                <div className="bg-red-300 h-full rounded-2xl overflow-auto scrollbar-hide">
                  {qtype === "MCQs" ? (
                    MCQDisplayer(questionsGlobal)
                  ) : qtype === "Open-Ended" ? (
                    OpenEndedDisplayer(questionsGlobal)
                  ) : qtype === "Fill in the Blanks" ? (
                    FillInTheBlanksDisplayer(questionsGlobal)
                  ) : qtype === "True or False" ? (
                    TrueOrFalseDisplayer(questionsGlobal)
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
