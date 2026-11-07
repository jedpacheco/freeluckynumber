import { Link } from "react-router-dom";

function EditorialNote() {
  return (
    <p className="editorial-note">
      Written by the LuckyVibe Daily editorial team. Passages about numerology, astrology and lucky colors describe traditions. They are not scientific findings and they do not predict events.{" "}
      <Link to="/methodology">How we check the math and the sources</Link>.
    </p>
  );
}

export default EditorialNote;
