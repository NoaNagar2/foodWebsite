import React, { useRef } from "react";
import Typography from "@mui/material/Typography";
import { CSSTransition } from "react-transition-group";
import "./home.css";

const TypographyAnimation = ({ show, text }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={show}
      timeout={700}
      classNames="typography"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {text}
        </Typography>
      </div>
    </CSSTransition>
  );
};

export default TypographyAnimation;
