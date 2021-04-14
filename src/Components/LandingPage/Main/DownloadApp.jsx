import React from "react";
import {
  AmazonAppStoreButton,
  GalaxyStoreButton,
  GooglePlayButton,
} from "../../DownloadButtons";

export const DownloadApp = () => {
  return (
    <section className="downloadApp">
      <p className="page_info">Android</p>
      <section className="appDownloadButtons">
        <section className="storeSection">
          <img
            src={"playStoreQr.png"}
            alt="Get it on google play store"
            className="downloadQr"
          />
          <p className="page_info">or</p>
          <GooglePlayButton className="mobilePlayButton" />
        </section>
        <section className="storeSection">
          <img
            src={"galaxyStoreQr.png"}
            alt="Available on galaxy store"
            className="downloadQr"
          />
          <p className="page_info">or</p>
          <GalaxyStoreButton className="mobileGalaxyButton" />
        </section>
        <section className="storeSection">
          <img
            src={"amazonStoreQr.png"}
            alt="Get it on amazon app store"
            className="downloadQr"
          />
          <p className="page_info">or</p>
          <AmazonAppStoreButton className="mobileAmazonButton" />
        </section>
      </section>
    </section>
  );
};
