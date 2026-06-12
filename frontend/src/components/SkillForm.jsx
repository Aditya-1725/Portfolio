function SkillForm({
  skillData,
  handleSkillChange,
  handleSkillSubmit,
}) {
  const inputClass = `
    w-full
    px-5
    py-4
    rounded-xl
    bg-[#0d0d0d]
    border
    border-orange-500/20
    text-gray-200
    placeholder:text-gray-500
    outline-none
    focus:border-orange-400
    focus:shadow-[0_0_15px_rgba(251,146,60,0.12)]
    transition-all
    duration-300
  `;

  return (
    <form
      onSubmit={handleSkillSubmit}
      className="
      flex
      flex-col
      gap-5
      "
    >
      {/* Skill Name */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Skill Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="React.js / Node.js / Cyber Security..."
          value={skillData.name}
          onChange={handleSkillChange}
          className={inputClass}
        />
      </div>

      {/* Submit Button */}

      <button
        type="submit"
        className="
        mt-2
        w-full
        py-4
        rounded-xl
        bg-orange-400
        text-black
        font-bold
        tracking-wide
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(251,146,60,0.35)]
        transition-all
        duration-300
        "
      >
        Add Skill 🚀
      </button>
    </form>
  );
}

export default SkillForm;