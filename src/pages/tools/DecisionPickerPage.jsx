import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import DecisionWheel from "../../components/DecisionWheel.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";

function DecisionPickerPage() {
  const [shareText, setShareText] = useState(
    "I used the Decision Wheel on LuckyVibe Daily to make a fun choice."
  );

  return (
    <ToolLayout
      title="Random Decision Picker"
      subtitle="Spin the wheel and let chance choose from your options."
      label="Decision Tool"
    >
      <DecisionWheel onResult={setShareText} />

      <ShareButtons text={shareText} />

      <section className="content-panel mt-5">
        <h2>Fun ways to use the wheel</h2>
        <ul>
          <li>Pick what to eat for dinner.</li>
          <li>Choose a movie or game night idea.</li>
          <li>Decide between weekend plans.</li>
          <li>Randomly select a classroom or party activity.</li>
        </ul>
        <p className="mb-0">
          Use this tool for light, low-risk decisions. Important decisions should always use real judgment.
        </p>
      </section>

      <AdBox label="Advertisement" />
    </ToolLayout>
  );
}

export default DecisionPickerPage;
