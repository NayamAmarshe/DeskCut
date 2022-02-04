import { useState, useEffect, useRef } from "react";
import { checkBox } from "../public/checkbox";

const Home = () => {
  const programRef = useRef(null);
  const iconRef = useRef(null);
  const [loadedProgram, setLoadedProgram] = useState(false);
  const [loadedIcon, setLoadedIcon] = useState(false);
  const [customExec, setCustomExec] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [error, setError] = useState(false);

  const [input, setInput] = useState({
    name: "",
    comment: "",
    exec: "",
    icon: "",
    terminal: false,
  });

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, exec, icon } = input;
    const isValid = Object.values({ name, exec, icon }).every(Boolean);

    if (!isValid) {
      alert("Please enter the values correctly");
    } else {
      window.electron.message(input);
      alert("Shortcut Successfully Created!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-50">
      {/* Heading */}
      <h1 className="text-2xl font-bold pt-5 text-slate-600">DeskCut</h1>
      <p className="text-sm leading-tight pb-2 text-slate-400">
        Shortcut Creator
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-5 w-96">
        {/* Text Inputs */}
        <input
          type="text"
          name="name"
          placeholder="App Name"
          value={input.name}
          onChange={(e) =>
            setInput({
              ...input,
              name: e.target.value.replace(/[^A-Z0-9]+/gi, " "),
            })
          }
        />
        <input
          type="text"
          name="comment"
          placeholder="App Description"
          value={input.comment}
          onChange={(e) => setInput({ ...input, comment: e.target.value })}
        />

        {/* Terminal Checkbox */}
        <button
          type="button"
          className={`${terminal ? "checkbox-on" : "checkbox-off"} checkbox-bg`}
          onClick={() => {
            setTerminal(!terminal);
            setInput({ ...input, terminal: terminal });
          }}
        >
          <p className="flex-grow">Run in Terminal</p>
          {!terminal ? (
            <svg
              className="text-xl align-"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7,5C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V7c0-1.103-0.897-2-2-2H7z M7,17V7h10l0.002,10H7z"></path>
            </svg>
          ) : (
            <svg
              className="text-xl "
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 9H15V15H9z"></path>
              <path d="M19,17V7c0-1.103-0.897-2-2-2H7C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10C18.103,19,19,18.103,19,17z M7,7h10 l0.002,10H7V7z"></path>
            </svg>
          )}
        </button>

        {/* Custom Exec Checkbox */}
        <button
          type="button"
          className={`${
            customExec ? "checkbox-on" : "checkbox-off"
          } checkbox-bg animate`}
          onClick={() => setCustomExec(!customExec)}
        >
          <p className="flex-grow">Use Custom Exec Command</p>

          {!customExec ? (
            <div>
              <svg
                className="text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7,5C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V7c0-1.103-0.897-2-2-2H7z M7,17V7h10l0.002,10H7z"></path>
              </svg>
            </div>
          ) : (
            <div>
              <svg
                className="text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 9H15V15H9z"></path>
                <path d="M19,17V7c0-1.103-0.897-2-2-2H7C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10C18.103,19,19,18.103,19,17z M7,7h10 l0.002,10H7V7z"></path>
              </svg>
            </div>
          )}
        </button>

        {/* Choose File Buttons */}
        <div className="flex flex-col gap-5 animate">
          {/* Custom Exec Input */}
          {customExec ? (
            <input
              type="text"
              name="exec"
              placeholder="App Description"
              value={input.exec}
              onChange={(e) => setInput({ ...input, exec: e.target.value })}
            />
          ) : (
            <button
              type="button"
              onClick={() => programRef.current.click()}
              className="picker flex flex-col items-center justify-center"
            >
              {/* Program Picker */}
              <p>Choose Program</p>
              {loadedProgram && (
                <p className="truncate w-80 bg-red-300 rounded-lg p-1 text-slate-700 mt-2">
                  {programRef?.current?.files[0]?.name}
                </p>
              )}
            </button>
          )}
          {/* Icon Button */}
          <button
            type="button"
            onClick={() => iconRef.current.click()}
            className="picker flex flex-col items-center justify-center"
          >
            {/* Program Picker */}
            <p>Choose Icon</p>
            {loadedIcon && (
              <p className="truncate w-80 bg-red-300 rounded-lg p-1 text-slate-700 mt-2">
                {iconRef?.current?.files[0]?.name}
              </p>
            )}
          </button>
        </div>

        {/* File Picker */}
        <input
          type="file"
          name="programFile"
          ref={programRef}
          className="hidden"
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log(programRef.current);
            setInput({ ...input, exec: programRef?.current?.files[0]?.path });
            if (programRef?.current?.files[0]?.path) {
              setLoadedProgram(true);
            } else {
              setLoadedProgram(false);
            }
          }}
        />
        <input
          type="file"
          name="iconFile"
          ref={iconRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log(iconRef.current);
            setInput({ ...input, icon: iconRef?.current?.files[0]?.path });
            if (iconRef?.current?.files[0]?.path) {
              setLoadedIcon(true);
            } else {
              setLoadedIcon(false);
            }
          }}
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
