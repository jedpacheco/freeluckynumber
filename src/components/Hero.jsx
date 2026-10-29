import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section sparkle-bg">
      <div className="container py-5">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <span className="eyebrow">Fun tools • daily numbers • random picks</span>
            <h1 className="hero-title">
              Discover your lucky vibe today.
            </h1>
            <p className="hero-copy">
              Generate lucky numbers, spin a decision wheel, calculate playful profiles,
              and share your results with friends.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/daily" className="btn magic-button">
                Reveal Today’s Number
              </Link>
              <Link to="/generators" className="btn ghost-button">
                Explore Tools
              </Link>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero-orb-wrap">
              <div className="mega-orb">7</div>
              <div className="orbit-dot orbit-one"></div>
              <div className="orbit-dot orbit-two"></div>
              <div className="orbit-dot orbit-three"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
