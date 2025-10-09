import React from "react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  return (
    <div className="sitemap-container">
      <div className="sitemap-box">
        <h1 className="sitemap-title">Website Structure Diagram</h1>

        <div className="tree">
          <TreeItem
            title="Home"
            path="/"
            desc="The main landing page showcasing highlights of the restaurant."
          />
          <TreeItem
            title="About"
            path="/about"
            desc="Learn more about our story, team, and culinary philosophy."
          />
          <TreeItem
            title="Menu"
            path="/menu"
            desc="Browse our full selection of dishes, drinks, and specialties."
          />

          <TreeItem
            title="Stories"
            desc="Explore articles, news, and special stories from our restaurant."
          >
            <TreeItem
              title="Blog"
              path="/blog"
              level={1}
              desc="Food insights, cooking tips, and cultural stories."
            />
            <TreeItem
              title="Events"
              level={1}
              desc="Special occasions and upcoming restaurant events."
            >
              <TreeItem
                title="Workshops"
                path="/workshops"
                level={2}
                desc="Cooking and mixology classes hosted by our chefs."
              />
              <TreeItem
                title="Meetups"
                path="/meetups"
                level={2}
                desc="Community gatherings and food lover meetups."
              />
            </TreeItem>
          </TreeItem>

          <TreeItem
            title="Contact"
            path="/contact"
            desc="Get in touch with us, find our location, or connect online."
          />
          <TreeItem
            title="Reservation"
            path="/reservation"
            desc="Book a table online by choosing your preferred date and time."
          />
        </div>
      </div>
    </div>
  );
}

function TreeItem({ title, path, desc, children, level = 0 }) {
  return (
    <div className="tree-item">
      <div className="tree-node">
        <span className="tree-dot"></span>

        {path ? (
          <Link
            to={path}
            className={`tree-label ${level > 0 ? "sub" : ""}`}
            title={path}
          >
            {title}
          </Link>
        ) : (
          <span className={`tree-label ${level > 0 ? "sub" : ""}`}>
            {title}
          </span>
        )}
      </div>

      {desc && <p className="tree-desc">{desc}</p>}

      {children && <div className="tree-children">{children}</div>}
    </div>
  );
}
