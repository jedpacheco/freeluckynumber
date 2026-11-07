import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { CONTACT_EMAIL } from "./ContactPage.jsx";

const UPDATED = "November 7, 2026";

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
            <li>Pages load Google's AdSense script so Google can serve ads when its systems allow it. If an ad is served, Google and its partners may use cookies. You can turn off personalized ads in Google's own settings.</li>
          </ul>

          <h2>Information you type into the tools</h2>
          <p>
            When you enter a birthday, a name, a list of options for the decision wheel or a wish, that
            information is processed by code running on your own device. We don't store it on a server,
            and the tools don't keep it after you leave the page. Please don't type sensitive personal information into any entertainment tool.
          </p>

          <h2>Cookies and local storage</h2>
          <p>
            Cookies are small text files that a website or ad service can store in your browser. Local
            storage is a similar feature that lets a site remember a small setting. We use local storage
            for one key, luckyvibe-cookie-notice, which records that you dismissed the notice. We do not
            use it for an account or for the numbers you calculate. If Google serves an ad, Google and
            its partners may set their own cookies, as described below.
          </p>

          <h2>Advertising and Google AdSense</h2>
          <p>
            The tools are free to use. Pages load Google's AdSense publisher script, and the site
            publishes an ads.txt file naming that publisher. Marked advertisement areas are reserved for
            ads. Whether an ad appears is up to Google, your browser and your location. This policy does
            not state an approval status and does not describe a serving configuration beyond the script
            and ads.txt file.
          </p>
          <ul>
            <li>If ads are served, third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this website or other websites.</li>
            <li>Google's use of advertising cookies, including the DoubleClick cookie, enables it and its partners to serve ads based on visits to this site and other sites on the Internet.</li>
            <li>You can turn off personalized advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
            <li>You can also opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
          </ul>
          <p>
            Other vendors approved by Google may also serve ads and set their own cookies. How Google
            uses information from sites that use its services is described at{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>.
          </p>

          <h2>The cookie notice is not a consent tool</h2>
          <p>
            The notice at the bottom of the page has one button, "Got it." Choosing it writes the
            dismissal into local storage and hides the notice on later visits. It does not send a
            consent or refusal signal to Google. It is not a Google-certified consent management
            platform, and it is not a record that you agreed to or refused personalized ads.
          </p>
          <p>
            Google's EU user consent policy requires a Google-certified consent management platform,
            integrated with the IAB Transparency and Consent Framework, when personalized ads are served
            to people in the European Economic Area, the United Kingdom or Switzerland. The requirement
            and the certified-platform list are Google's, on{" "}
            <a href="https://support.google.com/adsense/answer/13554116" target="_blank" rel="noopener noreferrer">
              Google's consent management requirements
            </a>{" "}
            and the{" "}
            <a href="https://www.google.com/about/company/user-consent-policy/" target="_blank" rel="noopener noreferrer">
              EU user consent policy
            </a>.
            This site has not added its own homemade consent banner in place of that platform, and this
            policy does not claim that a certified platform is active.
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
