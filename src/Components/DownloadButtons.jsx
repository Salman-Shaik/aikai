import React from "react";
import "../css/DownloadApp.css";
const DownloadButton = ({ className, url, alt, src }) => {
  return (
    <a href={url}>
      <img alt={alt} src={src} className={className} />
    </a>
  );
};
export const GooglePlayButton = ({ className }) => {
  return (
    <DownloadButton
      src={
        "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
      }
      alt="Get it on Google Play"
      url="https://play.google.com/store/apps/details?id=co.aikai"
      className={className}
    />
  );
};

export const GalaxyStoreButton = ({ className }) => {
  return (
    <DownloadButton
      src={
        "https://img.samsungapps.com/seller/images/badges/galaxyStore/png_big/GalaxyStore_English.png?ver=1617639800000"
      }
      alt="Available on Samsung Galaxy Store"
      url="https://galaxy.store/aikai"
      className={className}
    />
  );
};

export const AmazonAppStoreButton = ({ className }) => {
  return (
    <DownloadButton
      src={"amazonBadgeBlack.png"}
      alt="Get it on Amazon App Store"
      url="https://www.amazon.in/dp/B092CR1Y1Z"
      className={className}
    />
  );
};
