import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import axios from "axios";
import generateQuestions from "./api/Api";

export default function App() {
  const menuOptions = [
    { key: "Multiple Choice Questions", value: "MCQs" },
    { key: "Open Ended Questions", value: "Open-Ended" },
    { key: "Fill in the blanks Questions", value: "Fill in the Blanks" },
    { key: "True or False Questions", value: "True or False" },
  ];
  const [questionsGlobal, setQuestionsGlobal] = useState([
    {
      question: "",
      answer: "",
      options: [],
      showAnswer: false,
    },
  ]);
  const [QType, setQType]  = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
  };

  const parseResponse = (responseLocal) => {
    const questionsList = responseLocal.split("\n\n");
    const questions = [];
    console.log(questionsList);

    questionsList.forEach((element) => {
      const respT = element.split("\n");
      const question = {
        question: respT[0],
        answer: respT[5],
        options: respT.slice(1, 5),
        showAnswer: false,
      };
      questions.push(question);
    });
    console.log(questions);
    setQuestionsGlobal(questions);
  };

  const questionParser = questionsGlobal.map((quest, index) => {
    return (
      <div key={index} className="text-xl flex flex-col p-4 m-4 rounded-2xl bg-gray-200">
        <div>{quest.question}</div>
        {quest.options.map((option, index1) => {
          return <div key={index1}>{option}</div>;
        })}
        <div className="text-green-700">{quest.answer}</div>
      </div>
    );
  });

  const handlePromptSubmit = async (promptLocal, qtypeLocal) => {
    const resp = await generateQuestions(promptLocal, qtypeLocal);
    setGeneratedResponse(resp);
    parseResponse(resp);
    axios.post('/', Headers = {prompt, questionsGlobal, QType}).
    then().
    finally()
  };

  const [generatedResponse, setGeneratedResponse] = useState("");

  return (
    <>
      <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              <div id="left" className="flex-1 w-full h-full p-4 flex flex-col">
                {/* <form
                  action=""
                  className="w-full h-full flex flex-col"
                  onSubmit={handlePromptSubmit(prompt, QType)}
                > */}
                <textarea
                  type="text"
                  className="bg-gray-200 flex-1 rounded-2xl text-xl p-4 outline-none align-text-top overflow-y-auto"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                />
                <div className="flex gap-4 font-semibold">
                  <select
                    name="qtype"
                    className="flex-1 mt-4 text-lg bg-yellow-200 p-4 rounded-xl active:border-none"
                    onChange={(event) => setQType(event.target.value)}
                  >
                    {menuOptions.map((option) => {
                      return (
                        <option
                          key={option.key}
                          value={option.key}
                          className="bg-white"
                        >
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                  {/* <input type="file" name="" id="" > */}
                  <div className="bg-yellow-200 p-4 mt-4 rounded-xl flex items-center justify-center">
                    <input
                      type="file"
                      name="file"
                      onChange={changeHandler}
                      hidden
                    />
                    <div>
                      <button
                        // onClick={handleSubmission}
                        onClick={() => {
                          const input =
                            document.querySelector("input[type=file]");
                          input.click();
                        }}
                      >
                        <AiOutlinePaperClip size="1.5rem" />
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-yellow-200 p-4 mt-4 rounded-xl"
                    onClick={() => handlePromptSubmit(prompt, QType)}
                  >
                    Generate!
                  </button>
                </div>
                {/* </form> */}
              </div>
              <div id="right" className="flex-1 p-4 border-l-2 border-gray-400">
                <div className="bg-red-300 h-full rounded-2xl overflow-auto scrollbar-hide">
                  {questionParser}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
