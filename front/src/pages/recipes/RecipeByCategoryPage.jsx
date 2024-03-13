import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import RecipeComponent from "../../components/RecipeComponent";
import { useLocation } from "react-router-dom";

const RecipeByCategoryPage = () => {
  const location = useLocation();
  const searchData = new URLSearchParams(location.search);
  const category = searchData.get("data");

  const [recipeFromServer, setRecipeFromServer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe/" + category)
      .then(({ data }) => {
        setRecipeFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [category]);

  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {recipeFromServer.map((recipe) => (
        <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
          <RecipeComponent _id={recipe._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeByCategoryPage;
