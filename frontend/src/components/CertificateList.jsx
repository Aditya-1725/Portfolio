function CertificateList({
  certificates,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="mt-2">
      {/* Heading */}

      <h2 className="text-3xl font-bold mb-8">
        Existing
        <span className="text-cyan-400">
          {" "}Certificates
        </span>
      </h2>

      {/* Empty State */}

      {certificates.length === 0 ? (
        <div
          className="
          text-center
          py-16
          rounded-2xl
          border
          border-cyan-500/10
          bg-[#0d0d0d]
          "
        >
          <p className="text-gray-500">
            No certificates added yet 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="
              bg-[#0d0d0d]
              border
              border-cyan-500/20
              rounded-2xl
              p-6
              hover:border-cyan-400
              hover:shadow-[0_0_20px_rgba(34,211,238,0.10)]
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
                  <h3 className="text-xl font-bold mb-3 break-words">
                    {certificate.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                      text-cyan-400
                      "
                    >
                      {certificate.issuer}
                    </span>

                    {certificate.issueDate && (
                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-gray-500/10
                        border
                        border-gray-500/20
                        text-gray-300
                        "
                      >
                        {new Date(
                          certificate.issueDate,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
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
                    onClick={() => handleEdit(certificate)}
                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    text-cyan-400
                    font-semibold
                    hover:bg-cyan-400
                    hover:text-black
                    transition-all
                    duration-300
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(certificate._id)}
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

export default CertificateList;