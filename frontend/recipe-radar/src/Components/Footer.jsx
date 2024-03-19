import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
  return (
    <footer>
      <p>
        <CopyrightIcon /> Copyright {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
