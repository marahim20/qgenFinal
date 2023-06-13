import React from "react";
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
} from "react-icons/ai";
import { AwesomeButtonProgress } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [QType, setQType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const handlePromptSubmit = async (promptL, qtypeL) => {
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
    props.onQuestionsUpdate(parsedQuestions);
    props.onQTypeUpdate(qtypeL);
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
        <div className="bg-red-200 p-3 mt-4 gap-3 rounded-xl flex items-center justify-center">
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
              onClick={() => {
                setShowHistory(true);
              }}
            >
              <AiOutlineHistory size="1.5rem" />
            </button>
          </div>
        </div>
        <div className="bg-blue-200 p-3 mt-4 gap-3 rounded-xl flex items-center justify-center">
          <div className="tooltip" data-tip="Save Response">
            <button>
              <AiOutlineSave size="1.5rem" />
            </button>
          </div>
          <div className="tooltip" data-tip="Export as PDF">
            <button>
              <AiOutlineFilePdf size="1.5rem" />
            </button>
          </div>
        </div>
        <div className="bg-yellow-200 mt-4 rounded-xl flex items-center justify-center">
          <AwesomeButtonProgress
            type="primary"
            ripple
            loadingLabel="Generating"
            onPress={async (event, release) => {
              setIsLoading(true);
              await handlePromptSubmit(prompt, QType);
              setIsLoading(false);
              release();
            }}
            resultLabel="Generated!"
            style={{ backgroundColor: "#FEF08A", color: "#FEF08A" }}
          >
            Generate!
          </AwesomeButtonProgress>
        </div>
      </div>
    </div>
  );
}
