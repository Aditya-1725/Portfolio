import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [statusMessage, setStatusMessage] = useState(
    "> authentication required",
  );

  const [bootText, setBootText] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      navigate("/admin");
    }

    const lines = [
      "> booting secure shell...",
      "> loading encrypted modules...",
      "> verifying environment...",
      "> authentication required",
    ];

    let i = 0;

    setBootText([lines[0]]);

    const interval = setInterval(() => {
      i++;

      if (i < lines.length) {
        setBootText(lines.slice(0, i + 1));
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    setStatusMessage("> validating credentials...");

    try {
      const res = await API.post("/auth/login", formData);

      setStatusMessage("> establishing secure session...");

      setTimeout(() => {
        localStorage.setItem("adminToken", res.data.token);

        setStatusMessage("✔ access granted");

        setTimeout(() => {
          navigate("/admin");
        }, 700);
      }, 600);
    } catch (error) {
      console.log(error);

      setStatusMessage("✖ access denied");

      alert(error?.response?.data?.message || "Invalid credentials");

      setIsLoading(false);
    }
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
      {/* Cyber Grid */}

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

      {/* Scanline Overlay */}

      <div
        className="
    absolute
    inset-0
    pointer-events-none
    opacity-[0.06]
    bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,255,136,0.15)_3px)]
  "
      ></div>

      {/* Glow Behind the Login Card */}

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

      {/* Login Card */}

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
          "
        >
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <span className="ml-4 text-green-400 font-mono text-xs tracking-[4px] animate-pulse">
            ADMIN_ACCESS_TERMINAL
          </span>
        </div>

        {/* Body */}

        <div className="p-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Secure
            <span className="text-green-400"> Login</span>
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Secure administrator gateway for portfolio management.
          </p>

          {/* Terminal Status */}

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
    h-[125px]
    overflow-hidden
    flex
    flex-col
    justify-start
  "
          >
            {!isLoading ? (
              <div className="space-y-1">
                {bootText.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}

                <p>
                  {">"} <span className="animate-pulse">█</span>
                </p>
              </div>
            ) : (
              <div>
                <p>{statusMessage}</p>

                <p className="mt-2">
                  {">"} <span className="animate-pulse">█</span>
                </p>
              </div>
            )}
          </div>

          {/* Login Form */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                  focus:shadow-[0_0_12px_rgba(0,255,136,0.15)]
                  transition-all
                "
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
                  focus:shadow-[0_0_12px_rgba(0,255,136,0.15)]
                  transition-all
                "
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full
                py-3.5
                rounded-xl
                font-bold
                tracking-wider
                transition-all
                duration-300
                ${
                  isLoading
                    ? "bg-green-300 text-black opacity-70 cursor-not-allowed"
                    : "bg-green-400 text-black hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]"
                }
              `}
            >
              {isLoading ? "INITIALIZING..." : "INITIALIZE ACCESS"}
            </button>
          </form>

          <button
            type="button"
            className="
              mt-5
              text-sm
              text-green-400
              hover:text-green-300
              transition-colors
            "
            onClick={() => navigate("/admin/forgot-password")}
          >
            {">"} Recover Access
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
