import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CyberBackground from "./CyberBackground";

// Stable array outside component
const titles = [
  "Cyber Security Student",
  "MERN Developer",
  "Full Stack Learner",
  "Problem Solver",
];

function HeroSection() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentTitle.substring(0, text.length + 1));

        if (text === currentTitle) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        setText(currentTitle.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex]);

  return (
    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      px-6
      md:px-10
      pt-20
      "
    >
      {/* Background */}
      <CyberBackground />

      {/* Glow Effects */}
      <div className="absolute top-20 -left-20 w-[450px] h-[450px] bg-green-500/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[170px]" />

      {/* Main Content */}
      <div
        className="
        relative
        z-10
        max-w-[1200px]
        mx-auto
        w-full
        grid
        lg:grid-cols-2
        gap-16
        lg:gap-24
        items-center
        "
      >
        {/* Left Side */}

        <div className="text-center lg:text-left">
          <p
            className="
            text-green-400
            font-mono
            tracking-[0.3em]
            text-base
            md:text-lg
            mb-5
            "
          >
            {">"} HELLO WORLD_
          </p>

          <h1
            className="
            text-6xl
            md:text-7xl
            lg:text-8xl
            font-black
            leading-none
            mb-8
            "
          >
            Aditya
            <br />
            <span className="text-green-400">Vawhal</span>
          </h1>

          {/* Typing Title */}

          <div className="h-12 mb-8">
            <p className="text-xl md:text-2xl font-mono text-gray-300">
              <span className="text-green-400">{">"} </span>

              {text}

              <span className="text-green-400 animate-pulse ml-1">|</span>
            </p>
          </div>

          <p
            className="
            text-gray-400
            text-lg
            leading-9
            max-w-xl
            mx-auto
            lg:mx-0
            mb-10
            "
          >
            Passionate about building secure web applications, exploring ethical
            hacking, and creating modern full-stack experiences with the MERN
            stack.
          </p>

          {/* Action Buttons */}

          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <button
              onClick={() => navigate("/projects")}
              className="
              px-9
              py-4
              rounded-xl
              bg-green-400
              text-black
              font-bold
              tracking-wide
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(0,255,136,0.35)]
              transition-all
              duration-300
              "
            >
              View Projects →
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="
              px-9
              py-4
              rounded-xl
              border-2
              border-green-400
              text-green-400
              font-bold
              tracking-wide
              hover:bg-green-400
              hover:text-black
              hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(0,255,136,0.25)]
              transition-all
              duration-300
              "
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Side - Profile */}

        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Background Glow */}
            <div
              className="
              absolute
              inset-0
              rounded-3xl
              bg-green-400/20
              blur-3xl
              scale-90
              group-hover:scale-100
              transition-all
              duration-500
              "
            />

            {/* Image Card */}
            <div
              className="
    relative
    overflow-hidden
    rounded-3xl
    border
    border-green-500/20
    bg-[#101010]/70
    backdrop-blur-md
    shadow-[0_0_35px_rgba(0,255,136,0.12)]
    group-hover:-translate-y-2
    group-hover:shadow-[0_0_45px_rgba(0,255,136,0.2)]
    transition-all
    duration-500
    p-8
  "
            >
              <img
                src="/images/Profile.png"
                alt="Aditya Vawhal"
                draggable="false"
                className="
    w-[340px]
    md:w-[400px]
    lg:w-[430px]
    h-auto
    object-cover
    select-none
    scale-120
    transition-transform
    duration-500
    group-hover:scale-125
  "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
