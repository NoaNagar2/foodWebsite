import React, { useState } from "react";
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
import EditNoteIcon from "@mui/icons-material/EditNote";
import { CreateRecipe } from "./CreateRecipe";
import { inputValueObj } from "./inputValueObj";

const CreateRecipeForm = () => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputValue, setInputValue] = useState(inputValueObj());
  const [addIngredient, setAddIngredient] = useState([""]);
  const [addStep, setAddStep] = useState([""]);

  const handleIngredientsAdd = (index, value) => {
    const newTextBoxes = [...addIngredient];
    newTextBoxes[index] = value;
    setAddIngredient(newTextBoxes);
    if (index === newTextBoxes.length - 1 && value !== "") {
      setAddIngredient([...newTextBoxes, ""]);
    }
  };

  const handleStepsAdd = (index, value) => {
    const newTextBoxes = [...addStep];
    newTextBoxes[index] = value;
    setAddStep(newTextBoxes);
    if (index === newTextBoxes.length - 1 && value !== "") {
      setAddStep([...newTextBoxes, ""]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  inputValue.Ingredients = addIngredient;
  inputValue.steps = addStep;

  const handleCreateRecipe = () => {
    CreateRecipe(inputValue, setErrorsState);
  };

  let errorMassage = "השדה חייב להיות מלא (לפחות 2 תוים)";

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
        <EditNoteIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        יצירת מתכון:
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
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => {
            inputValue.category = e.target.textContent;
          }}
        />
        {errorsState && errorsState.category && (
          <Alert severity="warning">{errorMassage}</Alert>
        )}
        <Typography sx={{ mr: 1, mt: 2 }}>דרגת קושי</Typography>
        <Autocomplete
          disablePortal
          id="level"
          options={optionsL}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => {
            inputValue.level = e.target.textContent;
          }}
        />
        {errorsState && errorsState.level && (
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
        {addIngredient.map((value, index) => (
          <TextField
            key={index}
            type="text"
            value={value}
            sx={{ mb: 2 }}
            onChange={(e) => handleIngredientsAdd(index, e.target.value)}
            autoComplete="on"
          />
        ))}
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography sx={{ mr: 1, mt: 2 }}>אופן ההכנה</Typography>
        {addStep.map((value, index) => (
          <TextField
            key={index}
            type="text"
            value={value}
            sx={{ mb: 2 }}
            onChange={(e) => handleStepsAdd(index, e.target.value)}
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
          onClick={handleCreateRecipe}
        >
          יצירת המתכון{" "}
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateRecipeForm;
