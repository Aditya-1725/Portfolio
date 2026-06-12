import { useEffect, useState } from "react";
import API from "../services/api";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await API.get("/experiences");

        // Sort newest start date first
        const sorted = [...res.data].sort(
          (a, b) =>
            new Date(b.startDate).getTime() -
            new Date(a.startDate).getTime()
        );

        setExperiences(sorted);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="page-wrapper pb-24 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          My
          <span className="text-purple-400">
            {" "}Experience
          </span>
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20 leading-8">
          My professional journey, internships, leadership roles,
          and practical experiences that helped shape my skills in
          Cyber Security and Full Stack Development.
        </p>

        {experiences.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No Experience Added Yet 🚀
          </div>
        ) : (
          <div className="relative">
            {/* Main Timeline Line */}

            <div
              className="
              hidden
              md:block
              absolute
              left-1/2
              top-0
              bottom-0
              w-[2px]
              -translate-x-1/2
              bg-gradient-to-b
              from-purple-500/20
              via-purple-400/70
              to-purple-500/20
              "
            ></div>

            <div className="space-y-16">
              {experiences.map((experience, index) => (
                <div
                  key={experience._id}
                  className={`
                    relative
                    flex
                    ${
                      index % 2 === 0
                        ? "md:justify-start"
                        : "md:justify-end"
                    }
                  `}
                >
                  {/* Timeline Dot */}

                  <div
                    className="
                    hidden
                    md:flex
                    absolute
                    left-1/2
                    top-10
                    -translate-x-1/2
                    w-5
                    h-5
                    rounded-full
                    bg-purple-400
                    border-[4px]
                    border-[#050505]
                    shadow-[0_0_20px_rgba(168,85,247,0.9)]
                    z-20
                    "
                  ></div>

                  {/* Card */}

                  <div
                    className="
                    w-full
                    md:w-[44%]
                    bg-[#101010]
                    border
                    border-purple-500/20
                    rounded-2xl
                    overflow-hidden
                    hover:-translate-y-1
                    hover:border-purple-400
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.18)]
                    transition-all
                    duration-300
                    "
                  >
                    <div className="px-8 py-7">
                      {/* Date Badge */}

                      <div
                        className="
                        inline-block
                        mb-5
                        px-4
                        py-2
                        rounded-full
                        bg-purple-500/10
                        border
                        border-purple-500/20
                        text-xs
                        text-purple-300
                        "
                      >
                        {new Date(
                          experience.startDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                        {" - "}
                        {experience.currentlyWorking
                          ? "Present"
                          : new Date(
                              experience.endDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                      </div>

                      <h2 className="text-2xl font-bold mb-3">
                        {experience.role}
                      </h2>

                      <p className="text-purple-400 font-semibold text-lg mb-4">
                        {experience.company}
                      </p>

                      <div className="flex items-center gap-3 text-gray-400 mb-5">
                        <span className="text-pink-400">📍</span>
                        <span>{experience.location}</span>
                      </div>

                      <p
                        className="text-gray-400 leading-8 text-[15px]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline End Dot */}

            <div
              className="
              hidden
              md:flex
              absolute
              left-1/2
              bottom-0
              translate-y-1/2
              -translate-x-1/2
              w-5
              h-5
              rounded-full
              bg-purple-400
              border-[4px]
              border-[#050505]
              shadow-[0_0_20px_rgba(168,85,247,0.9)]
              z-20
              "
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;