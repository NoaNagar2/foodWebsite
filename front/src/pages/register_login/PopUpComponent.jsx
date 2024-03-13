import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import { useNavigate } from "react-router-dom";

const PopUpComponent = () => {
  const [checkRegister, setCheckRegister] = useState(true);
  const [checkLogin, setCheckLogin] = useState(false);

  const handleRegisterClick = (e) => {
    setCheckRegister(true);
    setCheckLogin(false);
  };

  const handleLoginClick = (e) => {
    setCheckLogin(true);
    setCheckRegister(false);
  };

  return (
    <Box sx={{ border: "2px solid #dbabc3" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            border: 1,
            p: 2,
          }}
        >
          <Button onClick={handleRegisterClick}>הרשמה</Button>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            border: 1,
            p: 2,
          }}
        >
          <Button onClick={handleLoginClick}>התחברות</Button>
        </Box>
      </Box>
      {checkRegister && <RegisterComponent />}
      {checkLogin && <LoginComponent />}
    </Box>
  );
};

export default PopUpComponent;
