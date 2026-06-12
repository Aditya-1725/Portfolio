function ExperienceCard({
  company,
  role,
  location,
  description,
  startDate,
  endDate,
  currentlyWorking,
}) {
  const formatDuration = () => {
    const start = new Date(startDate);
    const end = currentlyWorking ? new Date() : new Date(endDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let duration = "";

    if (years > 0) {
      duration += `${years} yr${years > 1 ? "s" : ""} `;
    }

    if (remainingMonths > 0) {
      duration += `${remainingMonths} m`;
    }

    return duration.trim();
  };

  return (
    <div
      className="
      w-full
      bg-[#101010]
      border
      border-purple-500/20
      rounded-2xl
      overflow-hidden
      hover:-translate-y-2
      hover:border-purple-400
      hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]
      transition-all
      duration-300
      "
    >
      {/* Outer spacing wrapper */}
      <div className="p-[2px]">
        {/* Actual card body */}
        <div className="rounded-xl bg-transparent">
          {/* Content Area */}
          <div className="px-8 pt-7 pb-6">
            <h3 className="text-2xl font-bold leading-tight mb-3">
              {role}
            </h3>

            <p className="text-purple-400 text-lg font-semibold mb-4">
              {company}
            </p>

            <div className="flex items-center gap-2 text-gray-400 mb-5">
              <span className="text-base">Location:</span>

              <span className="text-[15px]">
                {location}
              </span>
            </div>

            <p
              className="
              text-gray-400
              text-[15px]
              leading-7
              break-words
              "
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          </div>

          {/* Footer */}
          <div
            className="
            border-t
            border-purple-500/10
            px-8
            py-4
            flex
            items-center
            justify-between
            gap-4
            "
          >
            <p className="text-sm text-gray-500">
              {new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
              {" - "}
              {currentlyWorking
                ? "Present"
                : new Date(endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
            </p>

            <span
              className="
              shrink-0
              px-3
              py-1.5
              rounded-full
              bg-purple-500/10
              border
              border-purple-500/20
              text-purple-300
              text-xs
              font-medium
              "
            >
              {formatDuration()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;