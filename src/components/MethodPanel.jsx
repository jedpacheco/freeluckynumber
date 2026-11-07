export function FactList({ rows }) {
  return (
    <dl className="method-facts">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function MethodPanel({ id, title, lede, children }) {
  return (
    <section className="content-panel method-panel mt-4" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {lede ? <p>{lede}</p> : null}
      {children}
    </section>
  );
}

export default MethodPanel;
