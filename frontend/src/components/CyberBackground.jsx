function CyberBackground() {
  return (
    <>
      {/* Animated Grid */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.07]
        pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 18s linear infinite",
        }}
      />

      {/* Floating Glow Orb 1 */}
      <div
        className="
        absolute
        top-[15%]
        left-[10%]
        w-72
        h-72
        rounded-full
        bg-green-400/10
        blur-[120px]
        animate-pulse
        "
      />

      {/* Floating Glow Orb 2 */}
      <div
        className="
        absolute
        bottom-[10%]
        right-[8%]
        w-80
        h-80
        rounded-full
        bg-cyan-400/10
        blur-[140px]
        animate-pulse
        "
        style={{
          animationDuration: "6s",
        }}
      />

      {/* Floating Particles */}
      {[...Array(18)].map((_, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-green-400/40"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${
              8 + Math.random() * 8
            }s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Animated Horizontal Line */}
      <div
        className="
        absolute
        top-1/2
        left-0
        w-full
        h-px
        bg-gradient-to-r
        from-transparent
        via-green-400/20
        to-transparent
        animate-pulse
        "
      />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes gridMove {
            from {
              transform: translateY(0px);
            }
            to {
              transform: translateY(50px);
            }
          }

          @keyframes floatParticle {
            0% {
              transform: translateY(0px);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(-80px);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
}

export default CyberBackground;