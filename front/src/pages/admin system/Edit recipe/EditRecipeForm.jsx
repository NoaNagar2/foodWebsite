import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  Alert,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import { inputValueObj } from "./inputValue";
import { useParams } from "react-router-dom";
import { newData } from "./newData";
import { EditRecipe } from "./EditRecipe";
import { useLocation } from "react-router-dom";

const EditRecipeForm = () => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputValue, setInputValue] = useState(inputValueObj());
  const location = useLocation();
  const searchData = new URLSearchParams(location.search);
  const _id = searchData.get("data");

  const updateChange = () => {
    EditRecipe(inputValue, setErrorsState, _id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe/page/" + _id)
      .then(({ data }) => {
        setInputValue(newData(data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id]);

  const ingredients = inputValue.Ingredients;
  const steps = inputValue.steps;

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  let errorMassage = "השדה חייב להיות מלא";

  const optionsC = [
    "עוגות ועוגיות",
    "מאפים מטורפים",
    "סלטים",
    "מנות אירוח / פתיחה",
    "מתכונים של חג",
  ];

  const optionsL = ["קל", "בינוני", "מורכב", "לילדים"];

  return (
    <Box>
      <Avatar sx={{ bgcolor: "pink", width: 50, height: 50 }}>
        <CreateIcon />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {`עריכת מתכון: ${inputValue.name}`}
      </Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Grid container flexDirection={"column"}>
        <Typography sx={{ mr: 1, mt: 2 }}>שם המתכון</Typography>
        <TextField
          id="name"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.name}
          autoComplete="on"
        />
        {errorsState && errorsState.name && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>תיאור</Typography>
        <TextField
          id="description"
          variant="outlined"
          onChange={handleInputChange}
          value={inputValue.description}
          autoComplete="on"
        />
        {errorsState && errorsState.description && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>קטגוריה</Typography>
        <Autocomplete
          disablePortal
          id="category"
          options={optionsC}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label={inputValue.category} />
          )}
        />
        <Typography sx={{ mr: 1, mt: 2 }}>דרגת קושי</Typography>
        <Autocomplete
          disablePortal
          id="level"
          options={optionsL}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label={inputValue.level} />
          )}
        />
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
        <Typography sx={{ mr: 1, mt: 2 }}>alt</Typography>
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
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography sx={{ mr: 1, mt: 2 }}>מצרכים</Typography>
        {ingredients.map((value, index) => (
          <TextField
            key={index}
            type="text"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleInputChange}
            value={value}
            autoComplete="on"
          />
        ))}
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography sx={{ mr: 1 }}>אופן ההכנה</Typography>
        {steps.map((value, index) => (
          <TextField
            key={index}
            type="text"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleInputChange}
            value={value}
            autoComplete="on"
          />
        ))}
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: "100%",
            ml: "0%",
            color: "myblue.main",
            mb: 2,
          }}
          onClick={updateChange}
        >
          עריכת המתכון
        </Button>
      </Grid>
    </Box>
  );
};

export default EditRecipeForm;
