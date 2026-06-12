import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch Project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);

  // Gallery = Cover Image + Screenshots
  const galleryImages = project
    ? [
        ...(project.image ? [project.image] : []),
        ...(project.screenshots || []),
      ]
    : [];

  // Auto Slideshow
  useEffect(() => {
    if (galleryImages.length <= 1 || isPaused) return;

    const timer = setTimeout(() => {
      setCurrentImage((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentImage, galleryImages.length, isPaused]);

  // Manual Navigation
  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  // Loading
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading Project...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper pb-24">
      <div className="max-w-[1150px] mx-auto px-6 lg:px-8">
        {/* Back Button */}

        <button
          onClick={() => navigate("/projects")}
          className="
          flex
          items-center
          gap-2
          mb-10
          text-gray-400
          hover:text-green-400
          transition-all
          duration-300
          "
        >
          ← Back to Projects
        </button>

        {/* Title */}

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          {project.title}
        </h1>

        {/* Main Card */}

        <div
          className="
          bg-[#101010]
          border
          border-green-500/20
          rounded-3xl
          p-8
          md:p-10
          shadow-[0_0_35px_rgba(0,255,136,0.06)]
          "
        >
          {/* Description */}

          <p className="text-gray-400 text-[16px] leading-8 mb-10">
            {project.description}
          </p>

          {/* Tech Stack */}

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
              Tech Stack
            </p>

            <div
              className="
              inline-block
              px-5
              py-3
              rounded-xl
              bg-green-500/10
              border
              border-green-500/20
              "
            >
              <p className="text-green-400 leading-7">
                {project.tech}
              </p>
            </div>
          </div>

          {/* GitHub */}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="
              inline-flex
              items-center
              justify-center
              mb-12
              px-6
              py-3
              rounded-xl
              border-2
              border-green-400
              text-green-400
              font-semibold
              hover:bg-green-400
              hover:text-black
              hover:-translate-y-1
              hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]
              transition-all
              duration-300
              "
            >
              View GitHub ↗
            </a>
          )}

          {/* Gallery */}

          {galleryImages.length > 0 && (
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Project Gallery
              </h2>

              <div
                className="
                relative
                rounded-2xl
                overflow-hidden
                border
                border-green-500/15
                bg-[#0d0d0d]
                "
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Slider */}

                <div className="overflow-hidden">
                  <div
                    className="
                    flex
                    transition-transform
                    duration-[800ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                    style={{
                      transform: `translateX(-${currentImage * 100}%)`,
                    }}
                  >
                    {galleryImages.map((img, index) => (
                      <a
                        key={index}
                        href={img}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full min-w-full flex-none"
                      >
                        <div
                          className="
                          flex
                          items-center
                          justify-center
                          bg-[#111]
                          min-h-[500px]
                          "
                        >
                          <img
                            src={img}
                            alt={`Project Screenshot ${index + 1}`}
                            className="
                            max-h-[500px]
                            w-full
                            object-contain
                            cursor-zoom-in
                            hover:opacity-95
                            transition-all
                            duration-300
                            "
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Navigation */}

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-12
                      h-12
                      rounded-full
                      bg-black/70
                      backdrop-blur-sm
                      border
                      border-green-500/20
                      hover:bg-green-400
                      hover:text-black
                      hover:border-green-400
                      transition-all
                      duration-300
                      "
                    >
                      ◀
                    </button>

                    <button
                      onClick={nextImage}
                      className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      w-12
                      h-12
                      rounded-full
                      bg-black/70
                      backdrop-blur-sm
                      border
                      border-green-500/20
                      hover:bg-green-400
                      hover:text-black
                      hover:border-green-400
                      transition-all
                      duration-300
                      "
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}

              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-3 mt-7">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`
                        w-3
                        h-3
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          currentImage === index
                            ? "bg-green-400 scale-125"
                            : "bg-gray-600 hover:bg-gray-500"
                        }
                      `}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;