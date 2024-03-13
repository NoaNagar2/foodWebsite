import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Box, Avatar } from "@mui/material";
import axios from "axios";
import RecipeComponent from "../../components/RecipeComponent";
import Typography from "@mui/material/Typography";
import WorkshopComponent from "../../components/WorkshopComponent";
import { useDispatch, useSelector } from "react-redux";
import normalization from "./normalization";
import PopUpComponent from "../register_login/PopUpComponent";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { isAdmin } from "../../components/isAdmin";
import "./home.css";
import AoutMe from "./AoutMe";

const HomePage = () => {
  const [recipeFromServer, setRecipeFromServer] = useState([]);
  const [workshopFromServer, setWorkshopFromServer] = useState([]);
  const [logo, setLogo] = useState(null);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  let noAuth = false;
  const admin = isAdmin();

  // get recipe
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe")
      .then(({ data }) => {
        if (userData) data = normalization(data, userData._id);
        setRecipeFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // new recipe
  const newRecipe = recipeFromServer.slice(-4);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/workshop")
      .then(({ data }) => {
        setWorkshopFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // new workshop
  const newWorkshop = workshopFromServer.slice(-2);

  return (
    <Container sx={{ mb: 2 }}>
      <Box sx={{}}>
        <Avatar
          sx={{ m: 2, width: 90, height: 90, mr: 0 }}
          src="http://localhost:8080/avatar.jpg"
        ></Avatar>
        <AoutMe />
      </Box>

      {admin && (
        <Grid container spacing={1} className="buttonBox" sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              href="/createrecipe"
              startIcon={<AddIcon sx={{ ml: 2 }} />}
            >
              הוספת מתכון חדש
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              href="/createworkshop"
              startIcon={<AddIcon sx={{ ml: 2 }} />}
            >
              יצירת סדנא חדשה
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              href="/allusers"
              startIcon={<PeopleAltIcon sx={{ ml: 2 }} />}
            >
              צפייה במשתמשים הרשומים
            </Button>
          </Grid>
        </Grid>
      )}

      <Typography
        variant="h4"
        sx={{
          mt: 4,
          mb: 4,
          fontWeight: 600,
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        מתכונים חדשים באתר:
      </Typography>
      <Grid container spacing={4} sx={{ mb: 2 }}>
        {newRecipe.map((recipe) => (
          <Grid item key={recipe._id} xs={12} sm={6} md={4} lg={3}>
            <RecipeComponent
              style={{ transformOrigin: "0 0 0" }}
              _id={recipe._id}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        href="/allrecipe"
        sx={{ mb: 4 }}
        className="moreButtons"
      >
        לכל המתכונים...
      </Button>

      {noAuth && <PopUpComponent />}

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        סדנאות קרובות:
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {newWorkshop.map((workshop) => (
          <Grid item key={workshop._id} xs={12} sm={12} md={6} lg={6}>
            <WorkshopComponent
              _id={workshop._id}
              title={workshop.title}
              url={workshop.url}
              alt={workshop.alt}
              date={workshop.date}
              participant={workshop.participant}
              time={workshop.time}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" href="/allworkshop">
        לסדנאות נוספות...
      </Button>
    </Container>
  );
};

export default HomePage;
