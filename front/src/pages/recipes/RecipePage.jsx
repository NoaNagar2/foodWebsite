import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Divider, Grid, Link } from "@mui/material";
import RecipeComponent from "../../components/RecipeComponent";
import { useLocation } from "react-router-dom";
import "./recipePage.css";

const RecipePage = () => {
  const location = useLocation();
  const searchData = new URLSearchParams(location.search);
  const _id = searchData.get("data");
  const [recipeFromServer, setRecipeFromServer] = useState([]);
  const [moreRecipe, setMoreRecipe] = useState([]);
  const moreR = [];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe/page/" + _id)
      .then(({ data }) => {
        setRecipeFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id]);

  const ingredients = recipeFromServer.Ingredients;
  const steps = recipeFromServer?.steps?.slice(0, -1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe/")
      .then(({ data }) => {
        setMoreRecipe(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  for (let r of moreRecipe) {
    if (r.category === recipeFromServer.category) {
      moreR.push(r);
    }
  }

  const newR = moreR.slice(-3);

  return (
    <Box>
      <img
        className="recipeImg"
        src={recipeFromServer.url}
        alt={recipeFromServer.alt}
        loading="lazy"
      />
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {recipeFromServer.name}
      </Typography>
      <Typography variant="body1">{recipeFromServer.description}</Typography>
      <Divider sx={{ mt: 2, mb: 2, width: "50%" }} />
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ ml: 2 }}>
          {` דרגת קושי: ${recipeFromServer.level}`}
        </Typography>
        <Typography variant="h6" sx={{ ml: 2 }}>
          /
        </Typography>
        <Link
          href={`/recipebycategory?data=${recipeFromServer.category}`}
          variant="h6"
          underline="hover"
          sx={{ ml: 2, color: "black" }}
        >
          {recipeFromServer.category}
        </Link>
      </Box>

      <Divider className="divider" sx={{ mt: 2, width: "50%" }} />

      <Box
        sx={{
          overflow: "auto",
          transition: "all 2s",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
          מצרכים
        </Typography>
        {ingredients?.map((item) => (
          <Typography variant="body1" key={item}>
            {item}
          </Typography>
        ))}

        <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
          אופן ההכנה
        </Typography>

        {steps?.map((step) => (
          <Typography variant="body1" key={step}>
            {`- ${step}`}
          </Typography>
        ))}
      </Box>

      <Typography
        variant="h6"
        sx={{ mb: 1, mt: 2, fontWeight: 600, fontStyle: "italic" }}
      >
        בתיאבון!!!!{" "}
      </Typography>

      <Divider className="divider" sx={{ mb: 2, mt: 2 }} />

      <Typography
        variant="h5"
        sx={{ mb: 1, mt: 2, fontWeight: 600, fontStyle: "italic" }}
      >
        אולי יעניין אותך גם...
      </Typography>

      <Grid container spacing={2}>
        {newR.map((recipe) => (
          <Grid
            item
            key={recipe._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ mb: 2 }}
          >
            <RecipeComponent
              style={{ transformOrigin: "0 0 0" }}
              _id={recipe._id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipePage;
