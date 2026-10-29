import { useState } from "react";

function ShareButtons({ text = "Check out my result from LuckyVibe Daily!" }) {
  const [copied, setCopied] = useState(false);

  const encodedSubject = encodeURIComponent("My LuckyVibe Daily Result");
  const encodedBody = encodeURIComponent(text);
  const encodedSms = encodeURIComponent(text);

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
      alert("Copy was not available in this browser.");
    }
  }

  return (
    <div className="share-panel magic-fade-in">
      <p className="share-title">Share this result</p>

      <div className="share-buttons">
        <a
          className="btn btn-outline-primary"
          href={`mailto:?subject=${encodedSubject}&body=${encodedBody}`}
        >
          Email
        </a>

        <a className="btn btn-outline-success" href={`sms:?&body=${encodedSms}`}>
          Text
        </a>

        <button className="btn btn-outline-dark" type="button" onClick={copyResult}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default ShareButtons;
