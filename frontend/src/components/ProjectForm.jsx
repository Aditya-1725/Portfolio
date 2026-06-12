function ProjectForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
  isUploading,
}) {
  const inputClass = `
    w-full
    px-5
    py-4
    rounded-xl
    bg-[#0d0d0d]
    border
    border-green-500/20
    text-gray-200
    placeholder:text-gray-500
    outline-none
    focus:border-green-400
    focus:shadow-[0_0_15px_rgba(0,255,136,0.12)]
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
      {/* Cover Image */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Project Cover Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className={inputClass}
        />

        {formData.image instanceof File && (
          <p className="text-xs text-green-400 mt-2">
            Selected: {formData.image.name}
          </p>
        )}
      </div>

      {/* Title */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Project Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Enter project title"
          value={formData.title}
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
          placeholder="Write a short description about the project..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {/* Tech Stack */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Tech Stack
        </label>

        <input
          type="text"
          name="tech"
          placeholder="React, Node.js, MongoDB..."
          value={formData.tech}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* GitHub */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          GitHub Repository
        </label>

        <input
          type="text"
          name="github"
          placeholder="https://github.com/..."
          value={formData.github}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Category */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Category
        </label>

        <input
          type="text"
          name="category"
          placeholder="Web Development / Cyber Security"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Screenshots */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Project Screenshots
        </label>

        <input
          type="file"
          name="screenshots"
          accept="image/*"
          multiple
          onChange={handleChange}
          className={inputClass}
        />

        {formData.screenshots &&
          formData.screenshots.length > 0 && (
            <div className="mt-2 space-y-1">
              {Array.from(
                formData.screenshots
              ).map((file, index) => (
                <p
                  key={index}
                  className="text-xs text-green-400"
                >
                  {index + 1}. {file.name}
                </p>
              ))}
            </div>
          )}
      </div>

      {/* Featured Checkbox */}

      <div
        className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        border-green-500/10
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
          onChange={(e) =>
            handleChange({
              target: {
                name: "featured",
                type: "checkbox",
                checked: e.target.checked,
              },
            })
          }
          className="
            w-4
            h-4
            accent-green-400
            cursor-pointer
          "
        />

        <label
          htmlFor="featured"
          className="
          text-gray-300
          cursor-pointer
          select-none
          "
        >
          Show this project on the Home Page
        </label>
      </div>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={isUploading}
        className={`
          mt-2
          w-full
          py-4
          rounded-xl
          text-black
          font-bold
          tracking-wide
          transition-all
          duration-300
          ${
            isUploading
              ? "bg-green-300 opacity-70 cursor-not-allowed"
              : "bg-green-400 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]"
          }
        `}
      >
        {isUploading
          ? "Uploading Project..."
          : editingId
            ? "Update Project"
            : "Add Project"}
      </button>
    </form>
  );
}

export default ProjectForm;