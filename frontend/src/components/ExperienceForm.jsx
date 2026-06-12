function ExperienceForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
}) {
  const inputClass = `
    w-full
    px-5
    py-4
    rounded-xl
    bg-[#0d0d0d]
    border
    border-purple-500/20
    text-gray-200
    placeholder:text-gray-500
    outline-none
    focus:border-purple-400
    focus:shadow-[0_0_15px_rgba(168,85,247,0.12)]
    transition-all
    duration-300
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      flex-col
      gap-5
      "
    >
      {/* Company */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Company / Organization
        </label>

        <input
          type="text"
          name="company"
          placeholder="ABC Security Pvt. Ltd."
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Role */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Role / Position
        </label>

        <input
          type="text"
          name="role"
          placeholder="Cyber Security Intern"
          value={formData.role}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Location */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Location
        </label>

        <input
          type="text"
          name="location"
          placeholder="Surat, Gujarat"
          value={formData.location}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Description */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe your work, responsibilities and achievements..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {/* Dates */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-purple-400 font-medium mb-2">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {!formData.currentlyWorking && (
          <div>
            <label className="block text-sm text-purple-400 font-medium mb-2">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        )}
      </div>

      {/* Checkboxes */}

      <div className="space-y-4">
        <div
          className="
          flex
          items-center
          gap-4
          rounded-xl
          border
          border-purple-500/10
          bg-[#0d0d0d]
          px-5
          py-4
          "
        >
          <input
            type="checkbox"
            id="currentlyWorking"
            name="currentlyWorking"
            checked={formData.currentlyWorking}
            onChange={handleChange}
            className="
            w-4
            h-4
            accent-purple-400
            cursor-pointer
            "
          />

          <label
            htmlFor="currentlyWorking"
            className="text-gray-300 cursor-pointer select-none"
          >
            I am currently working here
          </label>
        </div>

        <div
          className="
          flex
          items-center
          gap-4
          rounded-xl
          border
          border-purple-500/10
          bg-[#0d0d0d]
          px-5
          py-4
          "
        >
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="
            w-4
            h-4
            accent-purple-400
            cursor-pointer
            "
          />

          <label
            htmlFor="featured"
            className="text-gray-300 cursor-pointer select-none"
          >
            Show this experience on the Home Page
          </label>
        </div>
      </div>

      {/* Submit Button */}

      <button
        type="submit"
        className="
        mt-2
        w-full
        py-4
        rounded-xl
        bg-purple-400
        text-black
        font-bold
        tracking-wide
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]
        transition-all
        duration-300
        "
      >
        {editingId
          ? "Update Experience "
          : "Add Experience "}
      </button>
    </form>
  );
}

export default ExperienceForm;