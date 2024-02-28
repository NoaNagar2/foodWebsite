import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Alert,
  AlertTitle,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { joinValidation } from "../../validation/joinValidation";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";

const JoinComponent = (_id) => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [joined, setJoined] = useState(false);
  const [workshop, setWorkshop] = React.useState();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/workshop/" + _id.id)
      .then(({ data }) => {
        setWorkshop(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputsChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleJoinClick = async () => {
    const joiResponse = joinValidation(inputValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;

    await axios
      .patch("http://localhost:8080/api/v1/workshop/" + _id.id, inputValue)
      .then((data) => {
        setJoined(true);
      })
      .catch(() => {});
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {workshop?.title}
      </Typography>
      <Typography sx={{ mb: 1 }}>{workshop?.subtitle}</Typography>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ ml: 3, mb: 1 }}>בתאריך:{workshop?.date}</Typography>
        <Typography sx={{ mb: 1 }}>בשעה:{workshop?.time}</Typography>
      </Box>
      <Typography>כתובת:{workshop?.address}</Typography>

      <TextField
        autoFocus
        name="firstName"
        id="firstName"
        label="שם פרטי"
        value={inputValue.firstName}
        onChange={handleInputsChange}
        sx={{ mt: 2, direction: "rtl" }}
        required
        fullWidth
      />
      {errorsState && errorsState.firstName && (
        <Alert severity="warning">{errorsState.firstName}</Alert>
      )}
      <TextField
        name="lastName"
        id="lastName"
        label="שם משפחה"
        value={inputValue.lastName}
        onChange={handleInputsChange}
        sx={{ mt: 2, direction: "rtl" }}
        required
        fullWidth
      />
      {errorsState && errorsState.lastName && (
        <Alert severity="warning">{errorsState.lastName}</Alert>
      )}
      <TextField
        name="email"
        id="email"
        label="אימייל"
        value={inputValue.email}
        onChange={handleInputsChange}
        sx={{ mt: 2, direction: "rtl" }}
        required
        fullWidth
      />
      {errorsState && errorsState.email && (
        <Alert severity="warning">{errorsState.email}</Alert>
      )}
      <TextField
        name="phone"
        id="phone"
        label="טלפון"
        value={inputValue.phone}
        onChange={handleInputsChange}
        sx={{ mt: 2, direction: "rtl" }}
        required
        fullWidth
      />
      {errorsState && errorsState.phone && (
        <Alert severity="warning">{errorsState.phone}</Alert>
      )}
      <Button onClick={handleJoinClick}>הצטרפות</Button>
      {joined && (
        <Alert
          icon={<CheckIcon fontSize="inherit" sx={{ ml: 1 }} />}
          severity="success"
        >
          <AlertTitle> יש! את/ה איתנו!</AlertTitle>
          אם לא קיבלת מייל שמאשר את השתתפותך, צרו איתנו קשר
          <IconButton
            href="https://www.instagram.com/invites/contact/?i=1pwua9sdpaev1&utm_content=3kfxmi"
            target="blank"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://wa.me/972506409478" target="blank">
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/shenhav.binyamin?mibextid=LQQJ4d"
            target="blank"
          >
            <FacebookIcon />
          </IconButton>
        </Alert>
      )}
    </Box>
  );
};

export default JoinComponent;
