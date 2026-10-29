import { Link } from "react-router-dom";

// Tiny formatter for article/guide text.
// Blocks are separated by blank lines. "## " = heading, "### " = subheading,
// lines starting with "- " = bullet list. Inline [text](/path) = link.
function renderInline(text, keyBase) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2];
    if (href.startsWith("/")) {
      parts.push(<Link key={`${keyBase}-${i++}`} to={href}>{m[1]}</Link>);
    } else {
      parts.push(
        <a key={`${keyBase}-${i++}`} href={href} target="_blank" rel="noopener noreferrer">{m[1]}</a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function RichText({ text }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, idx) => {
        const b = block.trim();
        if (b.startsWith("### ")) return <h3 key={idx} className="h5 mt-4">{renderInline(b.slice(4), idx)}</h3>;
        if (b.startsWith("## ")) return <h2 key={idx} className="h4 mt-4">{renderInline(b.slice(3), idx)}</h2>;
        if (b.startsWith("- ")) {
          const items = b.split("\n").map((l) => l.replace(/^- /, "").trim()).filter(Boolean);
          return (
            <ul key={idx}>
              {items.map((it, j) => <li key={j}>{renderInline(it, `${idx}-${j}`)}</li>)}
            </ul>
          );
        }
        return <p key={idx}>{renderInline(b.replace(/\n/g, " "), idx)}</p>;
      })}
    </>
  );
}

export default RichText;
