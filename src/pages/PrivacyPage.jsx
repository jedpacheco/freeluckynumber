import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { CONTACT_EMAIL } from "./ContactPage.jsx";

const UPDATED = "October 29, 2026";

function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle={`Last updated ${UPDATED}`} label="Policy" />

      <main className="container py-5">
        <section className="content-panel">
          <p>
            This policy explains what information is collected when you visit LuckyVibe Daily at
            freeluckynumber.com, how it is used, and the choices you have. We've tried to keep it short
            and in plain English.
          </p>

          <h2>The short version</h2>
          <ul>
            <li>You don't need an account, and we don't ask for your name, email or payment details to use the tools.</li>
            <li>The tools run in your browser. Birthdays and names you type in are used to show your result and are not sent to us.</li>
            <li>We show ads from Google AdSense. Google and its partners use cookies to show those ads, and you can turn off personalized ads.</li>
          </ul>

          <h2>Information you type into the tools</h2>
          <p>
            When you enter a birthday, a name, a list of options for the decision wheel or a wish, that
            information is processed by code running on your own device. We don't store it on a server,
            and the tools don't keep it after you leave the page. Please don't type sensitive personal information into any entertainment tool.
          </p>

          <h2>Cookies and local storage</h2>
          <p>
            Cookies are small text files that a website or ad service stores in your browser. Local
            storage is a similar feature that lets a site remember small settings. We use local storage
            to remember that you've seen our cookie notice, and nothing else. Our
            advertising partners use cookies as described below.
          </p>

          <h2>Advertising and Google AdSense</h2>
          <p>
            We use Google AdSense to show ads on this site. This is how we keep the tools free.
          </p>
          <ul>
            <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
            <li>Google's use of advertising cookies, including the DoubleClick cookie, enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.</li>
            <li>You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
            <li>You can also opt out of some third-party vendors' use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
          </ul>
          <p>
            If you opt out, you'll still see ads, but they won't be based on your browsing. Other ad
            networks or vendors approved by Google may also serve ads here and set their own cookies. You
            can learn more about how Google uses information from sites that use its services at{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>.
          </p>
          <p>
            Visitors in the European Economic Area, the UK and Switzerland may be shown a consent message
            from Google that lets them choose how their data is used for ads.
          </p>

          <h2>Analytics and server logs</h2>
          <p>
            We don't currently run a separate analytics service such as Google Analytics. Our hosting
            provider may keep standard server logs, like IP address, browser type and the pages requested,
            for security and to keep the site running. If we add an analytics tool in the future, we will
            update this page before or when it goes live.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Some pages link to other websites, such as official lottery sites or Google's settings pages.
            We aren't responsible for their privacy practices, so please read their policies too.
          </p>

          <h2>Children's privacy</h2>
          <p>
            LuckyVibe Daily is meant for a general audience and is not directed at children under 13. We
            don't knowingly collect personal information from children. If you think a child has sent us
            personal information, contact us and we'll delete it. Lottery-related tools are intended only
            for adults of legal age where they live.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>You can block or delete cookies in your browser settings. The site still works without them.</li>
            <li>You can turn off personalized ads through Google Ad Settings or aboutads.info, linked above.</li>
            <li>Depending on where you live, you may have rights to access or delete personal information. Email us and we'll help.</li>
          </ul>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle information, we'll update this page and the date at the top.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit
            our <Link to="/contact">Contact page</Link>.
          </p>
        </section>
      </main>
    </>
  );
}

export default PrivacyPage;
