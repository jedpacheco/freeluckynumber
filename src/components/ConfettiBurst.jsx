function ConfettiBurst({ active }) {
  if (!active) {
    return null;
  }

  const pieces = Array.from({ length: 36 }, (_, index) => index);

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          className="confetti-piece"
          key={piece}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        ></span>
      ))}
    </div>
  );
}

export default ConfettiBurst;
