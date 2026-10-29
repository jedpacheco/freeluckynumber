import PageHero from "./PageHero.jsx";

function ToolLayout({ title, subtitle, label, children }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} label={label} />

      <main className="container py-5">
        {children}
      </main>
    </>
  );
}

export default ToolLayout;
