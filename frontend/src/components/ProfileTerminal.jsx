import { useEffect, useState } from "react";

function ProfileTerminal() {
  const terminalData = [
    {
      command: "whoami",
      output: "Aditya Vawhal",
    },
    {
      command: "education",
      output: "B.Tech CSE (Cyber Security)",
    },
    {
      command: "location",
      output: "Surat, Gujarat",
    },
    {
      command: "cgpa",
      output: "9.0 / 10",
    },
    {
      command: "socialconnect",
      output: "linkedin.com/in/aditya-vawhal-1725adi",
    },
  ];

  const [lines, setLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (commandIndex >= terminalData.length) {
      const restart = setTimeout(() => {
        setLines([]);
        setCurrentCommand("");
        setCommandIndex(0);
        setCharIndex(0);
        setShowOutput(false);
      }, 2500);

      return () => clearTimeout(restart);
    }

    const current = terminalData[commandIndex];

    if (!showOutput) {
      if (charIndex < current.command.length) {
        const timer = setTimeout(() => {
          setCurrentCommand(
            current.command.substring(0, charIndex + 1)
          );
          setCharIndex((prev) => prev + 1);
        }, 80);

        return () => clearTimeout(timer);
      } else {
        const pause = setTimeout(() => {
          setShowOutput(true);
        }, 300);

        return () => clearTimeout(pause);
      }
    }

    const outputTimer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          command: current.command,
          output: current.output,
        },
      ]);

      setCurrentCommand("");

      setTimeout(() => {
        setCharIndex(0);
        setShowOutput(false);
        setCommandIndex((prev) => prev + 1);
      }, 900);
    }, 300);

    return () => clearTimeout(outputTimer);
  }, [charIndex, commandIndex, showOutput]);

  return (
    <div
      className="
      bg-[#101010]
      border
      border-green-500/20
      rounded-2xl
      overflow-hidden
      shadow-[0_0_35px_rgba(0,255,136,0.08)]
      hover:shadow-[0_0_45px_rgba(0,255,136,0.15)]
      transition-all
      duration-500
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        px-6
        py-4
        border-b
        border-green-500/10
        bg-[#0d0d0d]
        "
      >
        <div className="flex items-center gap-2 mr-5">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
        </div>

        <p className="text-xs text-gray-500 font-mono tracking-[0.25em]">
          PROFILE_TERMINAL
        </p>
      </div>

      {/* Terminal Body */}

      <div
        className="
         p-8
  min-h-[500px]
  h-[500px]
  font-mono
  text-[15px]
  overflow-hidden
        "
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-6">
            <p className="text-green-400">
              {">"} {line.command}
            </p>

            {line.command === "socialconnect" ? (
              <a
                href="https://linkedin.com/in/aditya-vawhal-1725adi"
                target="_blank"
                rel="noreferrer"
                className="
                block
                mt-2
                text-gray-300
                hover:text-green-400
                transition-all
                break-all
                "
              >
                {line.output}
              </a>
            ) : (
              <p className="text-gray-300 mt-2 pl-2">
                {line.output}
              </p>
            )}
          </div>
        ))}

        {commandIndex < terminalData.length && (
          <p className="text-green-400">
            {">"} {currentCommand}
            <span className="animate-pulse ml-1">█</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileTerminal;