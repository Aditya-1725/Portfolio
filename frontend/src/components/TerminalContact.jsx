function TerminalContact() {
  return (
    <div className="bg-[#101010] border border-green-500/20 rounded-2xl p-8 font-mono">

      <p className="text-green-400 mb-4">
        {">"} whoami
      </p>

      <p className="mb-8">
        Aditya Vawhal
      </p>

      <p className="text-green-400 mb-4">
        {">"} social --all
      </p>

      <div className="space-y-3 mb-8">

        <a
          href="https://github.com/Aditya-1725"
          target="_blank"
          rel="noreferrer"
          className="block text-gray-300 hover:text-green-400"
        >
          GitHub → github.com/Aditya-1725
        </a>

        <a
          href="https://linkedin.com/in/aditya-vawhal-1725adi"
          target="_blank"
          rel="noreferrer"
          className="block text-gray-300 hover:text-green-400"
        >
          LinkedIn → linkedin.com/in/aditya-vawhal-1725adi
        </a>

        <a
          href="mailto:adityavawhal000@gmail.com"
          className="block text-gray-300 hover:text-green-400"
        >
          Email → adityavawhal000@gmail.com
        </a>

      </div>

      <p className="text-green-400">
        {">"} download resume
      </p>

    </div>
  );
}

export default TerminalContact;