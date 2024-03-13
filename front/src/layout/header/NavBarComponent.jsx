import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Typography, MenuItem, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from "@mui/icons-material/Instagram";
import RightDrawerComponent from "./RightDrawerComponent";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./navBar.css";
import { useNavigate } from "react-router-dom";
import { categoryArr } from "./categoryArr";
import { getToken } from "../../service/storageService";

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [txt, setTxt] = React.useState("");
  const navigate = useNavigate();
  const token = getToken();

  const handleInputChange = (e) => {
    setTxt(e.target.value);
    navigate(`/allrecipe?filter=${e.target.value}`);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
      },
    },
  }));

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleOpenRecipe = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "rgba(255,233,244,0.7)" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>

          <Box className="recipeLink">
            <MenuItem
              sx={{ p: 1, pr: 4, pl: 5, flexGrow: 1, color: "black", mr: 3 }}
              onClick={handleOpenRecipe}
            >
              <Typography textAlign="center">
                מתכונים
                {open ? (
                  <ExpandLess sx={{ mb: -0.9, mr: 0.5 }} />
                ) : (
                  <ExpandMore sx={{ mb: -0.9, mr: 0.5 }} />
                )}
              </Typography>
            </MenuItem>
            {open && (
              <Box
                sx={{
                  position: "absolute",
                  mt: 1.6,
                  backgroundColor: "rgba(255, 233, 244, 0.7)",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/allrecipe");
                    setOpen(false);
                  }}
                  sx={{
                    pr: 4,
                    pl: 4,
                    flexGrow: 1,
                    color: "black",
                    mr: 3,
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    לכל המתכונים
                  </Typography>
                </MenuItem>
                {categoryArr.map((category) => (
                  <MenuItem
                    onClick={() => {
                      navigate(`/recipebycategory?data=${category}`);
                      setOpen(false);
                    }}
                    key={category}
                    sx={{
                      pr: 4,
                      pl: 4,
                      flexGrow: 1,
                      color: "black",
                      mr: 3,
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {category}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>

          <Box className="workshopLink">
            <MenuItem
              onClick={() => {
                navigate("/allworkshop");
              }}
              sx={{ p: 1, pr: 4, pl: 5, flexGrow: 1, color: "black", mr: 3 }}
            >
              <Typography textAlign="center">סדנאות</Typography>
            </MenuItem>
          </Box>

          {token && (
            <Box className="likesLink">
              <MenuItem
                onClick={() => {
                  navigate("/likesrecipe");
                }}
                sx={{ p: 1, pr: 4, pl: 5, flexGrow: 1, color: "black", mr: 3 }}
              >
                <Typography textAlign="center">המועדפים שלי</Typography>
              </MenuItem>
            </Box>
          )}

          <Box sx={{ m: "0 auto", mt: 0.4 }}>
            <img
              src="http://localhost:8080/logo.jpg"
              alt="logo"
              width={60}
              height={60}
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>

          <Search sx={{ mr: 2 }} className="search">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חיפוש..."
              id="search"
              sx={{ mr: 5 }}
              inputProps={{ "aria-label": "search" }}
              value={txt}
              onChange={handleInputChange}
              autoFocus
            />
          </Search>
          <Box className="instegramIcon">
            <IconButton href="https://www.instagram.com/invites/contact/?i=1pwua9sdpaev1&utm_content=3kfxmi">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <RightDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};

export default NavBarComponent;
