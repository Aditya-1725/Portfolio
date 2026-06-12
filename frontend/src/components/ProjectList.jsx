function ProjectList({
  projects,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="mt-2">
      {/* Heading */}

      <h2 className="text-3xl font-bold mb-8">
        Existing
        <span className="text-green-400">
          {" "}Projects
        </span>
      </h2>

      {/* Empty State */}

      {projects.length === 0 ? (
        <div
          className="
          text-center
          py-16
          rounded-2xl
          border
          border-green-500/10
          bg-[#0d0d0d]
          "
        >
          <p className="text-gray-500">
            No projects added yet 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="
              bg-[#0d0d0d]
              border
              border-green-500/20
              rounded-2xl
              p-6
              hover:border-green-400
              hover:shadow-[0_0_20px_rgba(0,255,136,0.08)]
              transition-all
              duration-300
              "
            >
              <div
                className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-6
                "
              >
                {/* Left Side */}

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-3 break-words">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-7 mb-4 break-words">
                    {project.tech}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.category && (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-400
                        "
                      >
                        {project.category}
                      </span>
                    )}

                    {project.featured && (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-yellow-500/10
                        border
                        border-yellow-500/20
                        text-yellow-300
                        "
                      >
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side */}

                <div
                  className="
                  flex
                  flex-row
                  sm:flex-row
                  gap-3
                  flex-shrink-0
                  "
                >
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    font-semibold
                    hover:bg-green-400
                    hover:text-black
                    transition-all
                    duration-300
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-red-500/10
                    border
                    border-red-500/20
                    text-red-400
                    font-semibold
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                    duration-300
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;