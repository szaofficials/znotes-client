// Layout.jsx
import React from "react";
import { Disclaimer } from "./Disclaimer";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useDeviceSize } from "../../Context/DeviceSizeContext";

const Layout = ({ children }) => {
  const { isMobile } = useDeviceSize();
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const headerStyle = {
    flexShrink: 0,
  };

  const contentStyle = {
    flexGrow: 1,
    overflow: "auto",
  };

  const footerStyle = {
    flexShrink: 0,
  };

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        {!isMobile && <Disclaimer />}
        <Navbar />
      </header>
      {isMobile && (
        <main style={contentStyle}>
          {children}
          <Footer />
        </main>
      )}
      {!isMobile && (
        <>
          <main style={contentStyle}>{children}</main>
          <footer style={footerStyle}>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
