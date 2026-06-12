function CertificateForm({
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
    border-cyan-500/20
    text-gray-200
    placeholder:text-gray-500
    outline-none
    focus:border-cyan-400
    focus:shadow-[0_0_15px_rgba(34,211,238,0.12)]
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
      {/* Certificate Title */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Certificate Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="IBM Cyber Security Fundamentals"
          value={formData.title}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Issuer */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Issued By
        </label>

        <input
          type="text"
          name="issuer"
          placeholder="IBM / Cisco / Udemy..."
          value={formData.issuer}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Issue Date */}

      <div>
        <label className="block text-sm text-cyan-400 font-medium mb-2">
          Issue Date
        </label>

        <input
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Certificate Image */}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Certificate Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className={inputClass}
        />

        {formData.image instanceof File && (
          <p className="text-xs text-cyan-400 mt-2">
            Selected: {formData.image.name}
          </p>
        )}
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
              ? "bg-cyan-300 opacity-70 cursor-not-allowed"
              : "bg-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          }
        `}
      >
        {isUploading
          ? "Uploading Certificate..."
          : editingId
            ? "Update Certificate"
            : "Add Certificate"}
      </button>
    </form>
  );
}

export default CertificateForm;