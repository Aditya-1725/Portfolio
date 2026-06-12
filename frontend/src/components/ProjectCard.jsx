import { useNavigate } from "react-router-dom";

function ProjectCard({
  id,
  title,
  description,
  tech,
  image,
  github,
  category,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${id}`)}
      className="
      group
      cursor-pointer
      w-full
      max-w-[360px]
      bg-[#101010]
      border
      border-green-500/20
      rounded-2xl
      overflow-hidden
      hover:-translate-y-2
      hover:border-green-400
      hover:shadow-[0_0_30px_rgba(0,255,136,0.18)]
      transition-all
      duration-300
      "
    >
      {/* Project Image */}

      <div className="h-52 overflow-hidden bg-[#0d0d0d]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500 font-mono">No Preview Available</p>
          </div>
        )}
      </div>

      {/* Content Wrapper */}

      <div className="p-7">
        {/* Category */}

        {category && (
          <div className="mb-4">
            <span
              className="
              inline-block
              px-3
              py-1
              rounded-full
              bg-green-500/10
              border
              border-green-500/20
              text-xs
              text-green-400
              font-medium
              tracking-wide
              "
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}

        <h3 className="text-2xl font-bold leading-tight mb-4">{title}</h3>

        {/* Description */}

        <p
          className="
  text-gray-400
  text-[15px]
  leading-7
  mb-8
  line-clamp-2
  "
        >
          {description}
        </p>

        {/* Tech Stack */}

        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
            Tech Stack
          </p>

          <p className="text-green-400 text-sm leading-6">{tech}</p>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between gap-4">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="
              inline-flex
              items-center
              justify-center
              px-5
              py-2.5
              rounded-lg
              border
              border-green-400
              text-green-400
              font-medium
              hover:bg-green-400
              hover:text-black
              transition-all
              duration-300
              "
            >
              View GitHub ↗
            </a>
          ) : (
            <div />
          )}

          <span
            className="
            text-sm
            text-gray-500
            group-hover:text-green-400
            transition-colors
            duration-300
            "
          >
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
