// src/components/section/Chef.jsx
import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import { getPersons } from "@api/chefApi";

export default function Chef() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const data = await getPersons(); // gọi API
        setChefs(data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) return <p>Loading chefs...</p>;

  return (
    <section className="chef-section">
      <SectionHeader subtitle="Chef" title="Our Master Chef" />

      <div className="chef-grid">
        {chefs.map((chef) => (
          <div className="chef-card" key={chef.id}>
            <img src={chef.image} alt={chef.name} className="chef-image" />
            <h3 className="chef-name">{chef.name}</h3>
            <p className="chef-role">{chef.role}</p>
            <div className="chef-socials">
              {chef.social?.twitter && (
                <a href={chef.social.twitter} target="_blank">
                  <FaTwitter />
                </a>
              )}
              {chef.social?.facebook && (
                <a href={chef.social.facebook} target="_blank">
                  <FaFacebookF />
                </a>
              )}
              {chef.social?.google && (
                <a href={chef.social.google} target="_blank">
                  <FaGooglePlusG />
                </a>
              )}
              {chef.social?.instagram && (
                <a href={chef.social.instagram} target="_blank">
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
