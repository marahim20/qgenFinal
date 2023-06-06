import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import axios from "axios";
import React, { state } from "react";

export default function App() {
  const menuOptions = [
    { key: "mcq", value: "MCQs" },
    { key: "type2", value: "type2" },
    { key: "type3", value: "type3" },
  ];
  const { prompt, setPrompt } = useState("");
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
  return (
    <>
      <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              <div id="left" className="flex-1 w-full h-full p-4">
                <form action="" className="w-full h-full flex flex-col">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-gray-200 flex-1 rounded-2xl text-xl p-4 outline-none align-text-top overflow-auto"
                    height="40px"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <div className="flex gap-4 font-semibold">
                    <select
                      name=""
                      id=""
                      className="flex-1 mt-4 text-lg bg-yellow-200 p-4 rounded-xl active:border-none"
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
                      type="submit"
                      className="bg-yellow-200 p-4 mt-4 rounded-xl"
                    >
                      Generate!
                    </button>
                  </div>
                </form>
              </div>
              <div id="right" className="flex-1 p-4 border-l-2 border-gray-400">
                <div className="bg-red-300 w-full h-full rounded-2xl">
                  plis display the questions here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
