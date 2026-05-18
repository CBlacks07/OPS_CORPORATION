export default function ConstellationBG() {
  const circles = Array.from({length: 30});
  return (
    <svg className="absolute inset-0 -z-10 w-full h-full opacity-20" aria-hidden>
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      {circles.map((_, i) => (
        <circle key={i} cx={`${(i * 97) % 100}%`} cy={`${(i * 53) % 100}%`} r={(i % 4) + 1} fill="#22d3ee" />
      ))}
    </svg>
  );
}
