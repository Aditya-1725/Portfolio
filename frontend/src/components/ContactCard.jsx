function ContactCard({ title, value }) {
  return (
    <div
      className="
  bg-[#101010]
  border
  border-green-500/20
  rounded-2xl
  p-8
  overflow-hidden
  hover:-translate-y-2
  hover:border-green-400
  hover:shadow-[0_0_25px_rgba(0,255,136,0.2)]
  transition-all
  duration-300
  "
    >
      <h3 className="text-green-400 text-lg font-semibold mb-2">{title}</h3>

      <p className="text-gray-300 break-all">{value}</p>
    </div>
  );
}

export default ContactCard;
