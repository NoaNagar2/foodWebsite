import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import RecipeComponent from "../../components/RecipeComponent";
import useQueryParams from "./queryParams.hook";

let initialDataFromServer = [];

const AllRecipePage = () => {
  const [recipeFromServer, setRecipeFromServer] = useState([]);
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe")
      .then(({ data }) => {
        initialDataFromServer = data;
        setRecipeFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    const filteredData = initialDataFromServer.filter((recipe) =>
      recipe.name.toLowerCase().includes(filter.toLowerCase())
    );
    setRecipeFromServer(filteredData);
  }, [query]);

  const recipesArr = recipeFromServer.slice().reverse();

  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {recipesArr.map((recipe) => (
        <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
          <RecipeComponent
            style={{ transformOrigin: "0 0 0" }}
            _id={recipe._id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { AllRecipePage };
