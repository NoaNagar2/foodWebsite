import React from "react";
import NavBarComponent from "./header/NavBarComponent";
import MainComponent from "./main/MainComponent";
import { Box } from "@mui/material";
import FooterComponent from "./footer/FooterComponent";
import tmc from "twin-moon-color";
import { createTheme } from "@mui/material/styles";

const LayoutComponent = ({ children }) => {
  const themes = tmc({
    favActive: "*#FB0000",
  });

  return (
    <Box sx={{ width: "98vw" }}>
      <NavBarComponent />
      <MainComponent>{children}</MainComponent>
      <FooterComponent />
    </Box>
  );
};

export default LayoutComponent;
