function AdBox({ label = "Advertisement" }) {
  return (
    <aside className="ad-box my-5" aria-label={label}>
      <span>Advertisement</span>
      <p className="mb-0">
        Sponsored content may appear here.
      </p>
    </aside>
  );
}

export default AdBox;
