import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { oldData } from "./oldData";
import { inputWorkshopObj } from "../Create workshop/inputObj";
import { EditWorkshop } from "./EditWorkshop";
import { useLocation } from "react-router-dom";

const EditWorkshopForm = () => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputValue, setInputValue] = useState(inputWorkshopObj());
  const location = useLocation();
  const searchData = new URLSearchParams(location.search);
  const _id = searchData.get("data");

  const handleEditWorkshop = () => {
    EditWorkshop(inputValue, setErrorsState, _id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/workshop/" + _id)
      .then(({ data }) => {
        setInputValue(oldData(data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id]);

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  let errorMassage = "השדה חייב להיות מלא";

  return (
    <Box>
      <Avatar sx={{ bgcolor: "pink", width: 50, height: 50 }}>
        <CreateIcon />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {`עריכת סדנא: ${inputValue.title}`}
      </Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Grid container flexDirection={"column"}>
        <Typography sx={{ mr: 1, mt: 2 }}>כותרת</Typography>
        <TextField
          id="title"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.title}
          autoComplete="on"
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
        />
        {errorsState && errorsState.alt && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Button
          variant="outlined"
          onClick={handleEditWorkshop}
          sx={{ mt: 2, mb: 2 }}
        >
          עריכת הסדנא{" "}
        </Button>
      </Grid>
    </Box>
  );
};

export default EditWorkshopForm;
