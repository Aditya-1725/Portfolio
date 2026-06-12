function CertificateCard({ title, issuer, issueDate, image }) {
  return (
    <div
      className="
      w-full
      bg-[#101010]
      border
      border-cyan-500/20
      rounded-2xl
      overflow-hidden
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]
      transition-all
      duration-300
      "
    >
      {/* Certificate Preview */}

      <div
        className="
        h-56
        bg-[#0d0d0d]
        border-b
        border-cyan-500/10
        flex
        items-center
        justify-center
        overflow-hidden
        "
      >
        {image ? (
          <a
            href={image}
            target="_blank"
            rel="noreferrer"
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={image}
              alt={title}
              className="
              w-full
              h-full
              object-contain
              p-4
              cursor-zoom-in
              hover:scale-[1.03]
              transition-transform
              duration-300
              "
            />
          </a>
        ) : (
          <p className="text-gray-500 font-mono">
            Certificate Preview
          </p>
        )}
      </div>

      {/* Card Content */}

      <div className="p-7">
        <h3
          className="
          text-2xl
          font-bold
          leading-snug
          mb-5
          min-h-[64px]
          "
        >
          {title}
        </h3>

        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
            Issued By
          </p>

          <span
            className="
            inline-block
            px-3
            py-1.5
            rounded-full
            bg-cyan-500/10
            border
            border-cyan-500/20
            text-cyan-400
            text-sm
            "
          >
            {issuer}
          </span>
        </div>

        <div className="pt-4 border-t border-cyan-500/10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
            Issue Date
          </p>

          <p className="text-gray-400 text-sm">
            {issueDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;