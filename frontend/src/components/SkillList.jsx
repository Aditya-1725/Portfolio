function SkillList({
  skills,
  handleSkillDelete,
}) {
  return (
    <div className="mt-2">
      {/* Heading */}

      <h2 className="text-3xl font-bold mb-8">
        Existing
        <span className="text-orange-400">
          {" "}Skills
        </span>
      </h2>

      {/* Empty State */}

      {skills.length === 0 ? (
        <div
          className="
          text-center
          py-16
          rounded-2xl
          border
          border-orange-500/10
          bg-[#0d0d0d]
          "
        >
          <p className="text-gray-500">
            No skills added yet 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="
              bg-[#0d0d0d]
              border
              border-orange-500/20
              rounded-2xl
              p-6
              hover:border-orange-400
              hover:shadow-[0_0_20px_rgba(251,146,60,0.10)]
              transition-all
              duration-300
              "
            >
              <div
                className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
                "
              >
                {/* Left Section */}

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-3 break-words">
                    {skill.name}
                  </h3>

                  {skill.description && (
                    <p className="text-gray-400 text-sm leading-7 break-words">
                      {skill.description}
                    </p>
                  )}
                </div>

                {/* Right Section */}

                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleSkillDelete(skill._id)
                    }
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

export default SkillList;