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
            <Link to="/articles" className="footer-link">Articles</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
          </div>
        </div>

        <hr className="footer-line" />

        <p className="small mb-0 text-center">
          Results are randomly generated for fun and entertainment only. They do not guarantee outcomes or improve odds.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
