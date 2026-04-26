"use client";

import React, { useEffect } from "react";
import axiosInstance from "../sharedComponents/axiosInstance/axiosInstance";

const MetadataProvider = ({ children }) => {
  useEffect(() => {
    const updateMetadata = async () => {
      try {
        const response = await axiosInstance.get("/settings");
        if (response.data.success) {
          const data = response.data.data;

          document.title = data.siteTitle || "BookShelf";

          let metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute("content", data.siteDescription || "");
          } else {
            metaDesc = document.createElement("meta");
            metaDesc.name = "description";
            metaDesc.content = data.siteDescription || "";
            document.head.appendChild(metaDesc);
          }

          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (metaKeywords) {
            metaKeywords.setAttribute("content", data.siteKeywords || "");
          } else {
            metaKeywords = document.createElement("meta");
            metaKeywords.name = "keywords";
            metaKeywords.content = data.siteKeywords || "";
            document.head.appendChild(metaKeywords);
          }

          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) {
            ogTitle.setAttribute("content", data.siteTitle || "");
          } else {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            ogTitle.content = data.siteTitle || "";
            document.head.appendChild(ogTitle);
          }

          let ogDesc = document.querySelector(
            'meta[property="og:description"]',
          );
          if (ogDesc) {
            ogDesc.setAttribute("content", data.siteDescription || "");
          } else {
            ogDesc = document.createElement("meta");
            ogDesc.setAttribute("property", "og:description");
            ogDesc.content = data.siteDescription || "";
            document.head.appendChild(ogDesc);
          }

          if (data.favicon) {
            let favicon = document.querySelector("link[rel='icon']");
            if (favicon) {
              favicon.href = `${data.favicon}?v=${Date.now()}`;
            } else {
              favicon = document.createElement("link");
              favicon.rel = "icon";
              favicon.href = `${data.favicon}?v=${Date.now()}`;
              document.head.appendChild(favicon);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch metadata settings:", error);
      }
    };

    updateMetadata();
  }, []);

  return <>{children}</>;
};

export default MetadataProvider;
