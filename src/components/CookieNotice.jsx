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
        We use cookies, including cookies from Google, to show ads and to understand how the site is used.
        You can read more in our <Link to="/privacy">Privacy Policy</Link> or change ad personalization at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-light btn-sm" onClick={() => dismiss("ok")}>Got it</button>
      </div>
    </div>
  );
}

export default CookieNotice;
