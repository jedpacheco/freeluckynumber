function LuckyOrb({ number, label = "Lucky Number", animated = true }) {
  return (
    <div className={animated ? "lucky-orb animated-orb" : "lucky-orb"}>
      <span className="orb-label">{label}</span>
      <strong>{number}</strong>
    </div>
  );
}

export default LuckyOrb;
