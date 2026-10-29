import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { getMeta, allRoutes, sitemapExclude, SITE_URL, notFoundMeta } from "./seo/routeMeta.js";

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}

export { getMeta, allRoutes, sitemapExclude, SITE_URL, notFoundMeta };
