import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import HeroSection from "../components/HeroSection";
import ProfileTerminal from "../components/ProfileTerminal";
import ProjectCard from "../components/ProjectCard";
import ContactCard from "../components/ContactCard";
import ExperienceCard from "../components/ExperienceCard";

function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        const featuredProjects = res.data
          .filter((project) => project.featured)
          .sort((a, b) => {
            const dateA = a.createdAt
              ? new Date(a.createdAt).getTime()
              : new Date(a._id.substring(0, 8) * 1000).getTime();

            const dateB = b.createdAt
              ? new Date(b.createdAt).getTime()
              : new Date(b._id.substring(0, 8) * 1000).getTime();

            return dateB - dateA;
          });

        setProjects(featuredProjects);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const res = await API.get("/experiences");
        setExperiences(res.data.filter((experience) => experience.featured));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        setSkills(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
    fetchExperiences();
    fetchSkills();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          About <span className="text-green-400">Me</span>
        </h2>

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-start">
          {/* Left Side - Terminal */}

          <ProfileTerminal />

          {/* Right Side - Details */}

          <div className="flex flex-col h-full min-h-[500px]">
            <h3 className="text-4xl font-bold mb-8">
              Cyber Security Student &
              <span className="text-green-400"> MERN Developer</span>
            </h3>

            <p className="text-gray-400 text-lg leading-9 mb-10">
              I'm Aditya Vawhal, a Computer Science Engineering student
              specializing in Cyber Security. I enjoy building secure web
              applications, exploring ethical hacking, and creating modern
              full-stack experiences with the MERN stack.
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#101010] border border-green-500/20 rounded-xl p-5 hover:border-green-400 hover:-translate-y-1 transition-all duration-300">
                <p className="text-green-400 font-semibold mb-2">
                  🎓 Education
                </p>

                <p className="text-gray-300 text-sm">
                  B.Tech CSE (Cyber Security)
                </p>
              </div>

              <div className="bg-[#101010] border border-green-500/20 rounded-xl p-5 hover:border-green-400 hover:-translate-y-1 transition-all duration-300">
                <p className="text-green-400 font-semibold mb-2">📊 CGPA</p>

                <p className="text-gray-300 text-sm">9.0 / 10</p>
              </div>

              <div className="bg-[#101010] border border-green-500/20 rounded-xl p-5 hover:border-green-400 hover:-translate-y-1 transition-all duration-300">
                <p className="text-green-400 font-semibold mb-2">📍 Location</p>

                <p className="text-gray-300 text-sm">Surat, Gujarat</p>
              </div>

              <div className="bg-[#101010] border border-green-500/20 rounded-xl p-5 hover:border-green-400 hover:-translate-y-1 transition-all duration-300">
                <p className="text-green-400 font-semibold mb-2">
                  💻 Specialization
                </p>

                <p className="text-gray-300 text-sm">MERN + Cyber Security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}

      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          My <span className="text-green-400">Skills</span>
        </h2>

        <div className="flex justify-center">
  <div
    className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    xl:grid-cols-5
    gap-4
    sm:gap-5
    place-items-center
    w-fit
    mx-auto
    "
  >
    {skills.map((skill) => (
      <div
        key={skill._id}
        className="
        w-[155px]
        sm:w-44
        h-14
        bg-[#101010]/80
        border
        border-green-500/20
        rounded-xl
        flex
        items-center
        justify-center
        hover:border-green-400
        hover:-translate-y-2
        hover:scale-105
        hover:shadow-[0_0_25px_rgba(0,255,136,0.25)]
        transition-all
        duration-300
        "
      >
        <p className="text-green-400 font-mono text-[14px] sm:text-[15px] tracking-wide">
          {">"} {skill.name}
        </p>
      </div>
    ))}
  </div>
</div>
      </section>
      {/* Featured Experience */}

      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Featured
          <span className="text-purple-400"> Experience</span>
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14">
          Internships, leadership roles and practical experiences that helped
          shape my journey in Cyber Security and Full Stack Development.
        </p>

        {experiences.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience._id}
                  company={experience.company}
                  role={experience.role}
                  location={experience.location}
                  description={experience.description}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  currentlyWorking={experience.currentlyWorking}
                />
              ))}
            </div>

            <div className="text-center mt-14">
              <button
                onClick={() => navigate("/experience")}
                className="
          px-8
          py-3.5
          rounded-xl
          border-2
          border-purple-400
          text-purple-300
          hover:bg-purple-400
          hover:text-black
          hover:-translate-y-1
          hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
          transition-all
          duration-300
          "
              >
                View Full Journey →
              </button>
            </div>
          </>
        )}
      </section>

      {/* Projects */}

      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Featured <span className="text-green-400">Projects</span>
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14">
          A collection of projects focused on secure development, modern web
          technologies, and practical problem solving.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              image={project.image}
              title={project.title}
              description={project.description}
              tech={project.tech}
              github={project.github}
              category={project.category}
            />
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => navigate("/projects")}
            className="
px-9
py-3.5
rounded-xl
border-2
border-green-400
font-semibold
hover:bg-green-400
hover:text-black
hover:-translate-y-1
hover:shadow-[0_0_25px_rgba(0,255,136,0.25)]
transition-all
duration-300
"
          >
            View All Projects →
          </button>
        </div>
      </section>

      {/* Contact */}

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-14">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Contact <span className="text-green-400">Me</span>
        </h2>

        <div
          className="
  max-w-4xl
  mx-auto
  bg-[#101010]
  border
  border-green-500/20
  rounded-3xl
  p-10
  text-center
  "
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Build Something Secure?
          </h3>
          <div className="mb-10">
            <p className="text-center text-gray-400 leading-8 max-w-2xl mx-auto mb-6">
              I'm a Computer Science Engineering student exploring Cyber
              Security, Web Development, and Application Development. Feel free
              to connect, check out my work, or follow my learning journey
              through the links below.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8 text-sm text-gray-400">
              <span>Email • Discussions & Opportunities</span>
              <span className="hidden md:block text-green-500/40">|</span>

              <span>GitHub • Projects & Code</span>
              <span className="hidden md:block text-green-500/40">|</span>

              <span>LinkedIn • Professional Network</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="
    px-8
    py-3.5
    rounded-xl
    bg-green-400
    text-black
    font-bold
    hover:-translate-y-1
    hover:shadow-[0_0_25px_rgba(0,255,136,0.25)]
    transition-all
    duration-300
    "
          >
            Contact Me →
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
