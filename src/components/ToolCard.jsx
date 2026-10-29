import { Link } from "react-router-dom";

function ToolCard({ tool }) {
  return (
    <article className="tool-card magic-card-hover h-100">
      <div className="tool-icon">{tool.icon}</div>
      <span className="badge rounded-pill text-bg-warning mb-3">{tool.badge}</span>
      <h2 className="h4">{tool.title}</h2>
      <p>{tool.description}</p>
      <Link to={tool.path} className="stretched-link">
        Open tool
      </Link>
    </article>
  );
}

export default ToolCard;
