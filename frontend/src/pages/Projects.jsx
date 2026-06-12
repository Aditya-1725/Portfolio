import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="page-wrapper pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          My
          <span className="text-green-400"> Projects</span>
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto leading-8 mb-16">
          A collection of projects focused on modern web development, cyber
          security, automation, and practical problem solving. Click on any
          project to explore screenshots, technologies, and implementation
          details.
        </p>

        {/* Projects Grid */}

        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">
              No projects available right now 🚀
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
            justify-items-center
            "
          >
            {[...projects]
              .sort((a, b) => {
                const dateA = a.createdAt
                  ? new Date(a.createdAt).getTime()
                  : new Date(a._id.substring(0, 8) * 1000).getTime();

                const dateB = b.createdAt
                  ? new Date(b.createdAt).getTime()
                  : new Date(b._id.substring(0, 8) * 1000).getTime();

                return dateB - dateA; // Newest first
              })
              .map((project) => (
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
        )}
      </div>
    </div>
  );
}

export default Projects;
