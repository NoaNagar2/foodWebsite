import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import normalization from "../home/normalization";
import { Box, Grid } from "@mui/material";
import RecipeComponent from "../../components/RecipeComponent";

const MyLikeRecipe = () => {
  const [dataFromServer, setDataFromServer] = useState();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe")
      .then(({ data }) => {
        if (userData) data = normalization(data, userData._id);
        setDataFromServer(data.filter((recipe) => recipe.likes === true));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userData]);

  return (
    <Box>
      <Grid container spacing={2}>
        {dataFromServer.map((recipe) => {
          <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
            <RecipeComponent _id={recipe._id} />
          </Grid>;
        })}
      </Grid>
    </Box>
  );
};

export default MyLikeRecipe;
