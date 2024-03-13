import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Divider,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { getToken } from "../../service/storageService";
import Sanckbar from "./Sanckbar";
import { sendMailValidation } from "../../validation/sendMailValidation";

const Participant = (_id) => {
  const [workshopFromServer, setWorkshopFromServer] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openSanckbar, setOpenSanckbar] = useState(false);
  const [errSanckbar, setErrSanckbar] = useState(false);
  const [errorsState, setErrorsState] = useState(null);
  const [inputValue, setInputValue] = useState({
    subject: "",
    description: "",
  });

  const token = getToken();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/workshop/" + _id._id)
      .then(({ data }) => {
        setWorkshopFromServer(data);
      })
      .catch((e) => {
        setErrSanckbar(true);
      });
  }, []);

  const handelOpen = () => {
    setOpenForm(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSendEmail = async () => {
    try {
      const joiValidate = sendMailValidation(inputValue);

      setErrorsState(joiValidate);
      if (joiValidate) return;

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/workshop/reminder/" + _id._id,
        inputValue,
        config
      );
      setOpenSanckbar(true);
    } catch (e) {
      setErrSanckbar(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const participant = workshopFromServer.participant;
  let errorMassage = "השדה חייב להיות מלא";

  return (
    <Box sx={{ pl: 5, pr: 5, pb: 5 }}>
      {participant?.map((p, index) => (
        <Box key={index}>
          <Typography>{`${p.firstName} ${p.lastName}`}</Typography>
          <Typography>{p.email}</Typography>
          <Typography>{p.phone}</Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
        </Box>
      ))}
      <Button variant="text" onClick={handelOpen}>
        שליחת תזכורת למשתתפים
      </Button>
      {openForm && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="subject"
            label="שורת נושא"
            variant="standard"
            value={inputValue.subject}
            onChange={handleInputChange}
          />
          {errorsState && errorsState.subject && (
            <Alert severity="warning">{errorMassage}</Alert>
          )}
          <TextField
            id="description"
            label="תיאור"
            variant="standard"
            value={inputValue.description}
            onChange={handleInputChange}
          />
          {errorsState && errorsState.description && (
            <Alert severity="warning">{errorMassage}</Alert>
          )}
          <Button variant="text" onClick={handleSendEmail}>
            שליחה
          </Button>
        </Box>
      )}
      {openSanckbar && <Sanckbar text="נשלח בהצלחה" color="green" />}
      {errSanckbar && <Sanckbar text="משהו השתבש... נסי שנית" color="red" />}
    </Box>
  );
};

export default Participant;
