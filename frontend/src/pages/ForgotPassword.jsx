import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const [bootText, setBootText] =
    useState([]);

  const [statusMessage, setStatusMessage] =
    useState(
      "> awaiting administrator identity..."
    );

  useEffect(() => {
    const lines = [
      "> loading recovery module...",
      "> verifying secure environment...",
      "> awaiting administrator identity...",
    ];

    let i = 0;

    setBootText([lines[0]]);

    const interval = setInterval(() => {
      i++;

      if (i < lines.length) {
        setBootText(
          lines.slice(0, i + 1)
        );
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () =>
      clearInterval(interval);
  }, []);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    setStatusMessage(
      "> generating recovery token..."
    );

    try {
      await API.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      setStatusMessage(
        "✔ recovery link sent successfully"
      );
       setEmail("");
      alert(
        "Recovery email sent successfully. Please check your inbox."
      );
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong."
      );

      setStatusMessage(
        "✖ recovery failed"
      );
       setEmail("");
    }   

    setIsLoading(false);
  };

  return (
    <div
      className="
      relative
      overflow-hidden
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#050505]
      px-6
    "
    >
      {/* Background Grid */}

      <div
        className="
        absolute
        inset-0
        pointer-events-none
        opacity-[0.08]
        bg-[linear-gradient(rgba(0,255,136,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.5)_1px,transparent_1px)]
        bg-[size:32px_32px]
      "
      ></div>

      {/* Glow */}

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        rounded-full
        bg-green-500/10
        blur-[140px]
        animate-pulse
      "
      ></div>

      <div
        className="
        relative
        z-10
        w-full
        max-w-lg
        rounded-2xl
        border
        border-green-500/20
        bg-[#0d0d0d]
        overflow-hidden
        shadow-[0_0_35px_rgba(0,255,136,0.08)]
      "
      >
        {/* Header */}

        <div className="flex items-center gap-2 px-5 py-3 border-b border-green-500/10">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <span className="ml-4 text-green-400 font-mono text-xs tracking-[4px] animate-pulse">
            PASSWORD_RECOVERY_TERMINAL
          </span>
        </div>

        <div className="p-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Recover
            <span className="text-green-400">
              {" "}Access
            </span>
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Recover your administrator account.
          </p>

          {/* Terminal */}

          <div
            className="
            mb-6
            rounded-lg
            bg-black/40
            border
            border-green-500/10
            px-4
            py-3
            font-mono
            text-green-400
            text-xs
            h-[105px]
            overflow-hidden
          "
          >
            {!isLoading ? (
              <div className="space-y-1">
                {bootText.map(
                  (
                    line,
                    index
                  ) => (
                    <p
                      key={index}
                    >
                      {line}
                    </p>
                  )
                )}

                <p>
                  {">"}{" "}
                  <span className="animate-pulse">
                    █
                  </span>
                </p>
              </div>
            ) : (
              <>
                <p>
                  {
                    statusMessage
                  }
                </p>

                <p className="mt-2">
                  {">"}{" "}
                  <span className="animate-pulse">
                    █
                  </span>
                </p>
              </>
            )}
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Administrator Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(
                  e
                ) =>
                  setEmail(
                    e.target
                      .value
                  )
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-[#050505]
                  border
                  border-green-500/20
                  outline-none
                  focus:border-green-400
                  transition-all
                "
              />
            </div>

            <button
              type="submit"
              disabled={
                isLoading
              }
              className="
                w-full
                py-3.5
                rounded-xl
                bg-green-400
                text-black
                font-bold
                tracking-wider
                hover:-translate-y-1
                hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]
                transition-all
                duration-300
              "
            >
              SEND RECOVERY LINK
            </button>
          </form>

          <button
            onClick={() =>
              navigate(
                "/admin/login"
              )
            }
            className="
              mt-5
              text-sm
              text-green-400
              hover:text-green-300
              transition-colors
            "
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;