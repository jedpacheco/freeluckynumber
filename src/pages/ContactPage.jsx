import PageHero from "../components/PageHero.jsx";

// PLACEHOLDER: change CONTACT_EMAIL to a real inbox you check before publishing.
export const CONTACT_EMAIL = "contactfreeluckynumber@gmail.com";

function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Questions, corrections or ideas? We'd like to hear them." label="Contact" />

      <main className="container py-5">
        <section className="content-panel">
          <h2>Email</h2>
          <p>
            The best way to reach us is by email at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We read every message and
            usually reply within a few business days.
          </p>

          <h2>What you can write to us about</h2>
          <ul>
            <li>A tool that isn't working right, or a result that looks wrong.</li>
            <li>A mistake in one of our articles, such as an incorrect fact or outdated lottery format.</li>
            <li>Ideas for new tools or topics you'd like us to cover.</li>
            <li>Privacy questions, including requests about any information we may hold.</li>
            <li>Advertising or partnership questions.</li>
          </ul>

          <h2>A quick note</h2>
          <p>
            We can't predict lottery results, tell you which numbers will win, or give financial,
            medical or legal advice. Everything on LuckyVibe Daily is for entertainment and learning.
            If gambling is causing problems for you or someone you know, free and confidential help is
            available in the U.S. by calling or texting 1-800-GAMBLER.
          </p>
        </section>
      </main>
    </>
  );
}

export default ContactPage;
