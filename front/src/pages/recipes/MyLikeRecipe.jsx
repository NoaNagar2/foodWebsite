import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import RecipeComponent from "../../components/RecipeComponent";
import { getToken } from "../../service/storageService";
import { getEmail } from "../../components/getEmail";

let myLikes = [];

const MyLikeRecipe = () => {
  const [recipeFromServer, setRecipeFromServer] = useState([]);
  const [user, setUser] = useState();
  const token = getToken();
  const email = getEmail();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/email/" + email)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const id = user?.user?._doc?._id;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe")
      .then(({ data }) => {
        setRecipeFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (token) {
      for (let i of recipeFromServer) {
        for (let like of i.likes) {
          if (like === id) {
            myLikes.push(i);
          }
        }
      }
    }
  }, [user]);

  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {myLikes.map((recipe) => (
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

export default MyLikeRecipe;
