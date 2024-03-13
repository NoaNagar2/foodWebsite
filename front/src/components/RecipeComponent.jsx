import * as React from "react";
import { Card, Box, Dialog } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  IconButton,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./recipeComponent.css";
import { getToken } from "../service/storageService";
import PopUpComponent from "../pages/register_login/PopUpComponent";
import { isAdmin } from "./isAdmin";
import { toast } from "react-toastify";
import { getEmail } from "./getEmail";
import { createTheme } from "@mui/material/styles";

const RecipeComponent = ({ _id }) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [isLike, setIsLike] = React.useState(false);
  const [recipe, setRecipe] = React.useState();
  const [user, setUser] = React.useState([]);
  const token = getToken();
  const navigate = useNavigate();
  const admin = isAdmin();
  const email = getEmail();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recipe/page/" + _id)
      .then(({ data }) => {
        setRecipe(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id]);

  React.useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/v1/users/email/" + email)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const id = user?.user?._doc?._id;

  React.useEffect(() => {
    if (recipe) {
      for (let i of recipe?.likes) {
        if (id === i) {
          setIsLike(true);
        }
      }
    }
  }, [recipe?.likes]);

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    const okUrl = `http://localhost:3000/recipepage?data=${_id}`;
    navigator.clipboard
      .writeText(okUrl)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy URL to clipboard:", err);
        alert("Failed to copy URL to clipboard!");
      });
  };

  const handleLikeRecipe = async () => {
    try {
      if (token) {
        setIsLike((prevLiked) => !prevLiked);
        const response = await axios.patch(
          `http://localhost:8080/api/v1/recipe/${_id}`,
          {
            likes: !recipe.likes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setOpen(true);
      }
    } catch (e) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseCopied = () => {
    setCopied(false);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDeleteRecipe = async () => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/recipe/" + _id,
        config
      );
      window.location.reload();
      toast.success("המתכון נמחק בהצלחה", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      toast.error("שגיאה.. נסי שנית", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <PopUpComponent />
      </Dialog>
      <Card sx={{ maxWidth: 345 }} className="card" elevation={12}>
        <div className="grid">
          <figure className="effect-bubba">
            <img
              className="imgR"
              height="220px"
              width="100%"
              src={recipe?.url}
              alt={recipe?.alt}
              onClick={() => {
                navigate(`/recipepage?data=${_id}`);
              }}
            />
            <figcaption>
              <h3>
                &nbsp;<span>{recipe?.name}</span>
              </h3>
            </figcaption>
          </figure>
        </div>

        <CardActions disableSpacing>
          <IconButton
            aria-label="הוסף למועדפים"
            onClick={handleLikeRecipe}
            className="favIcon"
          >
            <FavoriteIcon color={isLike ? "error" : ""} className="like" />
          </IconButton>
          <IconButton aria-label="share" onClick={copyToClipboard}>
            <ShareIcon className="share" />
          </IconButton>
          <Snackbar
            autoHideDuration={3000}
            open={copied}
            onClose={handleCloseCopied}
            message="הקישור הועתק ללוח"
          />
          {admin && (
            <IconButton
              aria-label="edit"
              onClick={() => {
                navigate(`/editrecipe?data=${_id}`);
              }}
            >
              <EditIcon className="edit" />
            </IconButton>
          )}
          {admin && (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon className="delete" />
            </IconButton>
          )}

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              בטוח בטוח את רוצה למחוק את המתכון?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDialog}>ביטול</Button>
              <Button onClick={handleDeleteRecipe} autoFocus>
                מחק בכל זאת
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RecipeComponent;
