import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
  CardContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import JoinComponent from "../pages/workshop/JoinComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "./isAdmin";
import { getToken } from "../service/storageService";
import { toast } from "react-toastify";
import "./wComponent.css";

const WorkshopComponent = ({ _id, title, url, alt, date, participant }) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [noJoin, setNoJoin] = React.useState(false);
  const [lastJoin, setLastJoin] = React.useState(false);
  const navigate = useNavigate();
  const admin = isAdmin();
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onDeleteWorkshop = async () => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/workshop/" + _id,
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
      toast.error("שגיאה.. נסה שנית", {
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

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (participant.length - 1 >= 11) {
      setNoJoin(true);
    }
  }, []);

  React.useEffect(() => {
    if (participant.length - 1 === 10) {
      setLastJoin(true);
    }
  }, []);

  return (
    <Box>
      <Dialog open={open}>
        <IconButton
          onClick={handleClose}
          sx={{ width: 60, alignItems: "center" }}
        >
          <CloseIcon sx={{ m: 1 }} />
        </IconButton>
        <JoinComponent id={_id} />
      </Dialog>

      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundImage: url,
        }}
        elevation={14}
        className="workshopCard"
      >
        <Box sx={{ justifyContent: "space-between" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {date}
            </Typography>
          </CardContent>

          <Box sx={{ display: "flex", flexDirection: "column", mr: 2, ml: 0 }}>
            {admin && (
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate(`/editworkshop?data=${_id}`);
                }}
              >
                <EditIcon />
              </IconButton>
            )}
            {admin && (
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              בטוח בטוח את רוצה למחוק את הסדנא?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDialog}>ביטול</Button>
              <Button onClick={onDeleteWorkshop} autoFocus>
                מחק בכל זאת
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="text"
            disabled={participant.length - 1 >= 11}
            onClick={handleOpenForm}
            sx={{ mr: 1.5, color: "pink", textAlign: "center", pl: 2 }}
            startIcon={<AddShoppingCartIcon sx={{ pl: 2 }} />}
          >
            להצטרפות
          </Button>
          {noJoin && (
            <Alert severity="info" icon={false} sx={{ width: "100%" }}>
              הסדנא מלאה
            </Alert>
          )}
          {lastJoin && <Alert severity="warning">נשאר רק מקום אחד בסדנא</Alert>}
          <CardActions disableSpacing></CardActions>
        </Box>

        <Box sx={{ display: "flex" }}>
          <CardMedia component="img" height="200" image={url} alt={alt} />
        </Box>
      </Card>
    </Box>
  );
};

export default WorkshopComponent;
