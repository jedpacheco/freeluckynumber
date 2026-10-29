import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMeta, SITE_URL } from "../seo/routeMeta.js";

// Keeps title/description/canonical correct during client-side navigation.
// The prerender script writes the same values into each page's static HTML.
function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getMeta(pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description, { tag: "meta", attrs: { name: "description" } });
    setMeta('link[rel="canonical"]', "href", SITE_URL + meta.canonical, { tag: "link", attrs: { rel: "canonical" } });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default Seo;
