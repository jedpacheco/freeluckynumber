import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "luckyvibe-cookie-notice";

function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss(choice) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    } catch {
      /* storage blocked; just hide for this visit */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-notice" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <p className="mb-2 mb-md-0">
        This is a notice, not a consent choice. Got it only remembers the dismissal in this browser.
        It does not accept or refuse personalized ads. Google's advertising script may use cookies if
        an ad is served. Details are in the <Link to="/privacy">Privacy Policy</Link>. Ad
        personalization can be changed at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-light btn-sm" onClick={() => dismiss("ok")}>Got it</button>
      </div>
    </div>
  );
}

export default CookieNotice;
