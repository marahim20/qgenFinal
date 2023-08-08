import React, { useEffect } from "react";
import generateQuestions from "../api/Api";
import MCQParser from "../functions/MCQParser";
import OpenEndedParser from "../functions/OpenEndedParser.jsx";
import TrueOrFalseParser from "../functions/TrueOrFalseParser.jsx";
import FillInTheBlanksParser from "../functions/FillInTheBlanksParser.jsx";
import { useState } from "react";
import {
  AiOutlineFilePdf,
  AiOutlineHistory,
  AiOutlinePaperClip,
  AiOutlineSave,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { AwesomeButtonProgress } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";

export default function AppLeft(props) {
  const menuOptions = [
    { key: "Multiple Choice Questions", value: "MCQs" },
    { key: "Open Ended Questions", value: "Open-Ended" },
    // { key: "Fill in the blanks Questions", value: "Fill in the Blanks" },
    { key: "True or False Questions", value: "True or False" },
  ];
  const changeFileHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const handleFileSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
  };
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [QType, setQType] = useState("MCQs");
  const [prompt, setPrompt] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const handlePromptSubmit = async (promptL, qtypeL) => {
    console.log("handlePromptSubmitCalled");
    setLoading(true);
    // props.onSetLoading(true);

    const Response = await generateQuestions(promptL, qtypeL);
    console.log(Response);
    let parsedQuestions;
    if (qtypeL === "Open-Ended") {
      parsedQuestions = OpenEndedParser(Response);
    } else if (qtypeL === "Fill in the Blanks") {
      parsedQuestions = FillInTheBlanksParser(Response);
    } else if (qtypeL === "True or False") {
      parsedQuestions = TrueOrFalseParser(Response);
    } else {
      parsedQuestions = MCQParser(Response);
    }
    setGeneratedResponse(parsedQuestions);
    props.onQuestionsUpdate(parsedQuestions);
    props.onQTypeUpdate(qtypeL);

    setLoading(false);
    // props.onSetLoading(false);
  };
  const handleSave = async () => {
    console.log("handleSaveCalled");
    const email = localStorage.getItem("email");
    const data = {
      user_id: email,
      prompt: prompt,
      qtype: QType,
      generatedResponse: generatedResponse,
    };
    const response = await axios.post("https://qgen-final-backend.vercel.app/getdata/", data);
    console.log(response);
  };
  const [updatedQuestionsGlobal, setUpdatedQuestionsGlobal] = useState(props.questionsGlobal);

  useEffect(() => {
    setUpdatedQuestionsGlobal(props.questionsGlobal);
  }, [props.questionsGlobal]);

  const handleExportPDF = () => {
    const formattedData = updatedQuestionsGlobal.map((entry, index) => {
      return `${entry.question}\nAnswer: ${entry.answer}`;
    }).join("\n\n");

    const textBlob = new Blob([formattedData], { type: "text/plain" });
    const url = URL.createObjectURL(textBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "questions_and_answers.txt"; // Change the filename and extension
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  return (
    <div
      id="left"
      className="flex-1 w-full h-full p-4 flex flex-col text-black"
    >
      <textarea
        type="text"
        className="bg-gray-200 flex-1 rounded-2xl text-xl p-4 outline-none align-text-top overflow-y-auto"
        value={prompt}
        placeholder="Enter your text here..."
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <div className="flex gap-4 font-semibold items-center">
        <select
          name="qtype"
          className="flex-1 mt-4 text-lg bg-yellow-200 p-3 rounded-xl active:border-none"
          onChange={(event) => setQType(event.target.value)}
        >
          {menuOptions.map((option) => {
            return (
              <option key={option.key} value={option.value} className="bg-white">
                {option.value}
              </option>
            );
          })}
        </select>
        {/* <div className="bg-red-200 p-3 mt-4 gap-3 rounded-xl flex items-center justify-center">
          <input type="file" name="file" onChange={changeFileHandler} hidden />
          <div className="tooltip" data-tip="Upload">
            <button
              // onClick={handleFileSubmission}
              onClick={() => {
                const input = document.querySelector("input[type=file]");
                input.click();
              }}
            >
              <AiOutlinePaperClip size="1.5rem" />
            </button>
          </div>
          <div className="tooltip" data-tip="History">
            <button
              onClick={async () => {

                setShowHistory(true);
              }}
            >
              <AiOutlineHistory size="1.5rem" />
            </button>
          </div>
        </div> */}
        <div className="bg-blue-200 p-3 mt-4 gap-3 rounded-xl flex items-center justify-center">
          <div className="tooltip" data-tip="Save Response">
            <button onClick={() => handleSave()}>
              <AiOutlineSave size="1.5rem" />
            </button>
          </div>
          <div className="tooltip" data-tip="Export Data">
            <button onClick={() => handleExportPDF()}>
              <AiOutlineFilePdf size="1.5rem" />
            </button>
          </div>
        </div>
        <div className="bg-yellow-200 mt-4 rounded-xl flex items-center justify-center">
          <button
            className="bg-yellow-200 p-3 gap-3 rounded-xl flex items-center justify-center"
            onClick={async () => {
              await handlePromptSubmit(prompt, QType);
            }}>
            {
              loading ?
                (<div className="w-full h-full flex items-center justify-center px-8">
                  <AiOutlineLoading3Quarters className="animate-spin" size={24} />
                </div>) : "Generate"
            }
          </button>
        </div>
      </div>
    </div >
  );
}
