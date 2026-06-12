function SkillCard({ icon, title, subtitle }) {
  return (
    <div
      className="
      bg-[#101010]
      border
      border-green-500/20
      rounded-2xl
      p-8
      flex
      flex-col
      items-center
      text-center
      hover:-translate-y-2
      hover:border-green-400
      hover:shadow-[0_0_30px_rgba(0,255,136,0.25)]
      transition-all
      duration-300
      "
    >
      <div className="text-5xl text-green-400 mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

export default SkillCard;