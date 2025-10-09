import React from "react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  // ==========================
  // Dữ liệu sitemap
  // ==========================
  const sitemapData = [
    {
      title: "Home",
      path: "/",
      desc: "The main landing page showcasing highlights of the restaurant.",
    },
    {
      title: "About",
      path: "/about",
      desc: "Learn more about our story, team, and culinary philosophy.",
    },
    {
      title: "Menu",
      path: "/menu",
      desc: "Browse our full selection of dishes, drinks, and specialties.",
    },
    {
      title: "Stories",
      desc: "Explore articles, news, and special stories from our restaurant.",
      children: [
        {
          title: "Blog",
          path: "/blog",
          desc: "Food insights, cooking tips, and cultural stories.",
        },
        {
          title: "Events",
          desc: "Special occasions and upcoming restaurant events.",
          children: [
            {
              title: "Workshops",
              path: "/workshops",
              desc: "Cooking and mixology classes hosted by our chefs.",
            },
            {
              title: "Meetups",
              path: "/meetups",
              desc: "Community gatherings and food lover meetups.",
            },
          ],
        },
      ],
    },
    {
      title: "Contact",
      path: "/contact",
      desc: "Get in touch with us, find our location, or connect online.",
    },
    {
      title: "Reservation",
      path: "/reservation",
      desc: "Book a table online by choosing your preferred date and time.",
    },
  ];

  return (
    <div className="sitemap-container">
      <div className="sitemap-box">
        <h1 className="sitemap-title">Website Structure Diagram</h1>
        <Tree data={sitemapData} />
      </div>
    </div>
  );
}

// ==========================
// Component đệ quy Tree
// ==========================
function Tree({ data, level = 0 }) {
  return (
    <div className={`tree-level tree-level-${level}`}>
      {data.map((item, index) => (
        <div key={index} className="tree-item">
          <div className="tree-node">
            <span className="tree-dot"></span>
            {item.path ? (
              <Link
                to={item.path}
                className={`tree-label ${level > 0 ? "sub" : ""}`}
                title={item.path}
              >
                {item.title}
              </Link>
            ) : (
              <span className={`tree-label ${level > 0 ? "sub" : ""}`}>
                {item.title}
              </span>
            )}
          </div>

          {item.desc && <p className="tree-desc">{item.desc}</p>}

          {item.children && (
            <div className="tree-children">
              <Tree data={item.children} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
