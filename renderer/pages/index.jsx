import { useState, useEffect, useRef } from "react";

const Home = () => {
  const programRef = useRef(null);
  const iconRef = useRef(null);
  const [loadedProgram, setLoadedProgram] = useState(false);
  const [loadedIcon, setLoadedIcon] = useState(false);
  const [customExec, setCustomExec] = useState(false);
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
    Object.keys(input).map((key) => {
      if (key !== "comment" || key !== "terminal") {
        if (input[key].length < 1) {
          setError(true);
        }
      }
    });
    if (error) {
      alert("Please enter the values correctly");
    } else {
      window.electron.message(input);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="p-5 text-2xl font-bold">DeskCut - Shortcut Creator</h1>

      <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-3 w-96">
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

        {/* Custom Exec Checkbox */}
        <div className="flex gap-2 justify-center items-center">
          <p>Use Custom Exec Command</p>
          <input
            type="checkbox"
            name="exec"
            checked={customExec}
            onChange={(e) => {
              setCustomExec(!customExec);
              setInput({ ...input, exec: "" });
            }}
          />
        </div>

        {/* Choose File Buttons */}
        <div className="flex flex-col gap-2">
          {/* Custom Exec Input */}
          {customExec ? (
            <input
              type="text"
              name="Exec"
              placeholder="Custom Execution Command"
              value={input.exec}
              onChange={(e) => setInput({ ...input, exec: e.target.value })}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              {/* Program Picker */}
              <button onClick={() => programRef.current.click()}>
                Choose Program
              </button>
              <p className="truncate w-80">
                {loadedProgram && programRef.current.files[0].path}
              </p>
            </div>
          )}
          {/* Icon Picker */}
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => iconRef.current.click()}>Choose Icon</button>
            <p className="truncate w-80">
              {loadedIcon && iconRef.current.files[0].path}
            </p>
          </div>
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
            setInput({ ...input, exec: programRef.current.files[0].path });
            setLoadedProgram(true);
          }}
        />
        <input
          type="file"
          ref={iconRef}
          accept="image/*"
          name="iconFile"
          className="hidden"
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setInput({ ...input, icon: iconRef.current.files[0].path });
            setLoadedIcon(true);
          }}
        />

        {/* Terminal Checkbox */}
        <div className="flex gap-2 justify-center items-center">
          <p>Run in Terminal</p>
          <input
            type="checkbox"
            name="exec"
            checked={input.terminal}
            onChange={(e) => {
              console.log(e.target.checked);
              setInput({ ...input, terminal: e.target.checked });
            }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
