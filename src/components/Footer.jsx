import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-4">
        <div className="row gy-4 align-items-center">
          <div className="col-md-6">
            <h2 className="h5 mb-2">LuckyVibe Daily</h2>
            <p className="mb-0">
              Fun lucky tools, random picks, and shareable number experiences for entertainment.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/methodology" className="footer-link">How we check our work</Link>
            <Link to="/articles" className="footer-link">Articles</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
          </div>
        </div>

        <hr className="footer-line" />

        <p className="small mb-0 text-center">
          Birthday and name numbers are calculated from what you type. The daily number and color come from the date. Wheels, eggs and lottery lines use the browser's random function. None of these results predict the future or change the odds in a game.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
