import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Alert,
  Box,
  Avatar,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { inputWorkshopObj } from "./inputObj";
import { CreateWorkshop } from "./CreateWorkshop";

const CreateWorkshopForm = () => {
  const [inputValue, setInputValue] = useState(inputWorkshopObj);
  const [errorsState, setErrorsState] = useState(null);

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCreateWorkshop = () => {
    CreateWorkshop(inputValue, setErrorsState);
  };

  let errorMassage = "השדה חייב להיות מלא";

  return (
    <Box>
      <Avatar sx={{ bgcolor: "pink" }}>
        <CreateIcon />
      </Avatar>
      <Typography>יצירת סדנא</Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Grid container flexDirection={"column"}>
        <Typography sx={{ mr: 1, mt: 2 }}>כותרת</Typography>
        <TextField
          id="title"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.title}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.title && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>כותרת משנה</Typography>
        <TextField
          id="subtitle"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.subtitle}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.subtitle && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>תאריך</Typography>
        <TextField
          id="date"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.date}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.date && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>שעה</Typography>
        <TextField
          id="time"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.time}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.time && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>כתובת</Typography>
        <TextField
          id="address"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.address}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.address && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>תמונה</Typography>
        <TextField
          id="url"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.url}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.url && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>Alt</Typography>
        <TextField
          id="alt"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.alt}
          autoComplete="on"
          required
        />
        {errorsState && errorsState.alt && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Button
          variant="outlined"
          onClick={handleCreateWorkshop}
          sx={{ mt: 2, mb: 2 }}
        >
          יצירת סדנא
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateWorkshopForm;
