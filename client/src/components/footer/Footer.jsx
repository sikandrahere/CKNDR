import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { footerItems } from "../allFiles";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div >
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-300 p-8">
        {footerItems.map((item) =>
          item.active ? (
            <li className="font-bold text-gray-700" key={item.name}>
              {item.name}
              {item.subItems && (
                <ul className="mt-4 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.name}
                      className="text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => navigate(subItem.slug)}
                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
              {item.contact && (
                <ul className="mt-4 space-y-2 text-gray-500">
                  <li>Email: {item.contact.email}</li>
                  <li>Phone: {item.contact.phone}</li>
                </ul>
              )}
            </li>
          ) : null
        )}
      </ul>

      <div className="flex flex-col items-start m-10">
        <h4 className="font-bold text-lg text-gray-700 mb-4">KEEP IN TOUCH</h4>
        <div className="flex space-x-4 text-2xl text-gray-700 cursor-pointer">
          <div onClick={() => window.open("https://www.facebook.com/", "_blank")}>
            <FaFacebook />
          </div>
          <div onClick={() => window.open("https://www.instagram.com/", "_blank")}>
            <FaInstagram />
          </div>
          <div onClick={() => window.open("https://www.twitter.com/", "_blank")}>
            <FaTwitter />
          </div>
          <div onClick={() => window.open("https://www.youtube.com/", "_blank")}>
            <FaYoutube />
          </div>
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          <p>&copy; 2025 Snkrs. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;