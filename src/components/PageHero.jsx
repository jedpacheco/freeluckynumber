function PageHero({ title, subtitle, label }) {
  return (
    <section className="page-hero sparkle-bg">
      <div className="container py-5 text-center">
        {label && <span className="eyebrow">{label}</span>}
        <h1 className="display-4 fw-black">{title}</h1>
        <p className="lead mb-0">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHero;
