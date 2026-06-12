function ExperienceList({
  experiences,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="mt-2">
      {/* Heading */}

      <h2 className="text-3xl font-bold mb-8">
        Existing
        <span className="text-purple-400">
          {" "}Experience
        </span>
      </h2>

      {/* Empty State */}

      {experiences.length === 0 ? (
        <div
          className="
          text-center
          py-16
          rounded-2xl
          border
          border-purple-500/10
          bg-[#0d0d0d]
          "
        >
          <p className="text-gray-500">
            No experience added yet 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="
              bg-[#0d0d0d]
              border
              border-purple-500/20
              rounded-2xl
              p-6
              hover:border-purple-400
              hover:shadow-[0_0_20px_rgba(168,85,247,0.10)]
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
                {/* Left Section */}

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-2 break-words">
                    {exp.role}
                  </h3>

                  <p className="text-purple-400 font-medium mb-4 break-words">
                    {exp.company}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {exp.location && (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-purple-500/10
                        border
                        border-purple-500/20
                        text-purple-300
                        "
                      >
                        📍 {exp.location}
                      </span>
                    )}

                    {exp.currentlyWorking && (
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
                        ● Current
                      </span>
                    )}

                    {exp.featured && (
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

                {/* Right Section */}

                <div
                  className="
                  flex
                  flex-row
                  gap-3
                  flex-shrink-0
                  "
                >
                  <button
                    type="button"
                    onClick={() => handleEdit(exp)}
                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-purple-500/10
                    border
                    border-purple-500/20
                    text-purple-300
                    font-semibold
                    hover:bg-purple-400
                    hover:text-black
                    transition-all
                    duration-300
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(exp._id)}
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

export default ExperienceList;