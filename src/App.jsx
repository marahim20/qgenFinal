import React, { useState, useRef } from "react";
import MCQDisplayer from "./functions/MCQDisplayer";
import OpenEndedDisplayer from "./functions/OpenEndedDisplayer.jsx";
import TrueOrFalseDisplayer from "./functions/TrueOrFalseDisplayer.jsx";
import FillInTheBlanksDisplayer from "./functions/FillInTheBlanksDisplayer.jsx";
import AppLeft from "./pages/AppLeft";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function App() {
  const [questionsGlobal, setQuestionsGlobal] = useState([]);
  const [qtype, setQType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoading = (loadingState) => {
    setLoading(loadingState);
  };

  const handleQuestionsUpdate = (updatedQuestions) => {
    setQuestionsGlobal(updatedQuestions);
    console.log("updatedQuestions", updatedQuestions);
  };

  const handleQTypeUpdate = (updatedQType) => {
    setQType(updatedQType);
    console.log("updatedQType", updatedQType);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };

  return (
    <>
      <div className="bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <button className="absolute right-8 rounded-xl p-3 text-black bg-green-300 shadow-xl" onClick={() => handleLogout()}>Logout</button>
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              <AppLeft
                onSetLoading={handleLoading}
                onQuestionsUpdate={handleQuestionsUpdate}
                onQTypeUpdate={handleQTypeUpdate}
              />
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
