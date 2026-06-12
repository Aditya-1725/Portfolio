import { useState } from "react";

function Contact() {
  const [logs, setLogs] = useState([]);

  const handleDownload = () => {
    const messages = [
      "[✓] Initializing secure connection...",
      "[✓] Scanning target environment...",
      "[✓] Access granted...",
      "[✓] Injecting resume.pdf...",
      "[✓] Download completed.",
    ];

    setLogs([]);

    messages.forEach((msg, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg]);

        if (index === messages.length - 1) {
          setTimeout(() => {
            window.open("/resume.pdf", "_blank");
          }, 500);
        }
      }, index * 800);
    });
  };

  return (
    <div className="page-wrapper pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          Let's
          <span className="text-green-400"> Connect</span>
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto leading-8 mb-16">
          Whether it's collaboration, internships, projects, or just a
          conversation about technology and cyber security, I'm always happy to
          connect.
        </p>

        {/* Terminal */}

        <div
          className="
          bg-[#0a0a0a]
          border
          border-green-500/20
          rounded-2xl
          overflow-hidden
          shadow-[0_0_35px_rgba(0,255,136,0.08)]
          "
        >
          {/* Terminal Header */}

          <div
            className="
            flex
            items-center
            gap-2
            px-5
            py-3
            border-b
            border-green-500/10
            bg-[#0d0d0d]
            "
          >
            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>

            <p className="ml-4 text-xs text-gray-500 font-mono tracking-[0.3em]">
              CONTACT_TERMINAL
            </p>
          </div>

          {/* Terminal Body */}

          <div className="p-8 md:p-10 font-mono">
            {/* Whoami */}

            <div className="mb-8">
              <p className="text-green-400 mb-2">
                {">"} whoami
              </p>

              <p className="pl-5 text-gray-300">
                Aditya Vawhal
              </p>
            </div>

            {/* Social */}

            <div className="mb-8">
              <p className="text-green-400 mb-3">
                {">"} social --all
              </p>

              <div className="pl-5 space-y-3">
                <a
                  href="https://github.com/Aditya-1725"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-gray-300 hover:text-green-400 transition-all break-all"
                >
                  GitHub → github.com/Aditya-1725
                </a>

                <a
                  href="https://linkedin.com/in/aditya-vawhal-1725adi"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-gray-300 hover:text-green-400 transition-all break-all"
                >
                  LinkedIn → linkedin.com/in/aditya-vawhal-1725adi
                </a>

                <a
                  href="mailto:adityavawhal000@gmail.com"
                  className="block text-gray-300 hover:text-green-400 transition-all break-all"
                >
                  Email → adityavawhal000@gmail.com
                </a>
              </div>
            </div>

            {/* Resume */}

            <div className="mb-8">
              <p className="text-green-400 mb-4">
                {">"} resume --download
              </p>

              <div className="pl-5">
                <button
                  onClick={handleDownload}
                  className="
                  px-6
                  py-3
                  rounded-xl
                  bg-green-400
                  text-black
                  font-bold
                  hover:-translate-y-1
                  hover:shadow-[0_0_20px_rgba(0,255,136,0.35)]
                  transition-all
                  duration-300
                  "
                >
                  Download Resume
                </button>
              </div>
            </div>

            {/* Download Logs */}

            {logs.length > 0 && (
              <div className="mb-8">
                <p className="text-green-400 mb-3">
                  {">"} executing download...
                </p>

                <div
                  className="
                  ml-5
                  rounded-xl
                  border
                  border-green-500/10
                  bg-[#0d0d0d]
                  p-4
                  space-y-2
                  "
                >
                  {logs.map((log, index) => (
                    <p key={index} className="text-green-400">
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Cursor */}

            <div className="pt-2 text-green-400">
              {">"} <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;