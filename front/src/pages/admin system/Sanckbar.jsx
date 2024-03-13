import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Sanckbar = (text) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        sx={{ mr: 5 }}
        size="small"
        aria-label="home-page"
        color="inherit"
        onClick={() => {
          navigate("/");
        }}
      >
        <HomeIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      sx={{ color: text.color }}
      message={text.text}
      action={action}
    />
  );
};

export default Sanckbar;
