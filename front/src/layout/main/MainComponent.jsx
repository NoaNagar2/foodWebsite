import React from "react";
import { Container } from "@mui/material";

const MainComponent = ({ children }) => {
  return <Container sx={{ mt: 10 }}>{children}</Container>;
};

export default MainComponent;
