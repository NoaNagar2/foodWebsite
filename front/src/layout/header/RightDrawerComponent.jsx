import {
  Box,
  List,
  Drawer,
  Divider,
  Typography,
  MenuItem,
  IconButton,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { categoryArr } from "./categoryArr";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../service/storageService";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PopUpComponent from "../../pages/register_login/PopUpComponent";

const RightDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const navigate = useNavigate();
  const token = getToken();

  const handleLogOutIcon = () => {
    localStorage.removeItem("token");
    document.location = "/";
  };

  const handleClose = () => {
    setOpenLog(false);
  };

  const handleOpenRecipe = () => {
    setOpen(!open);
  };
  const list = () => (
    <Box
      sx={{
        width: { auto: 250 },
        height: "100vw",
      }}
      role="presentation"
      onKeyDown={onCloseDrawer}
    >
      <List>
        <Divider />
        <Box>
          <MenuItem
            sx={{
              p: 1,
              pr: 7,
              pl: 7,
              flexGrow: 1,
              color: "black",
            }}
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
            <Box>
              <MenuItem
                onClick={() => {
                  navigate("/allrecipe");
                  onCloseDrawer();
                  setOpen(false);
                }}
                sx={{
                  pr: 4,
                  pl: 4,
                  flexGrow: 1,
                  color: "black",
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
                    onCloseDrawer();
                    setOpen(false);
                  }}
                  key={category}
                  sx={{
                    pr: 4,
                    pl: 4,
                    flexGrow: 1,
                    color: "black",
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

        <Divider />

        <Box>
          <MenuItem
            sx={{ p: 1, pr: 7, pl: 7, flexGrow: 1, color: "black" }}
            onClick={() => {
              navigate("/allworkshop");
              onCloseDrawer();
            }}
          >
            <Typography textAlign="center">סדנאות</Typography>
          </MenuItem>
        </Box>

        <Divider />

        {token && (
          <Box>
            <MenuItem
              sx={{ p: 1, pr: 7, pl: 7, flexGrow: 1, color: "black" }}
              onClick={() => {
                navigate("/likesrecipe");
                onCloseDrawer();
              }}
            >
              <Typography textAlign="center">המועדפים שלי</Typography>
            </MenuItem>
          </Box>
        )}

        <Divider />

        {token ? (
          <IconButton
            sx={{ p: 1, mr: 7, ml: 7, flexGrow: 1, color: "black" }}
            onClick={handleLogOutIcon}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{ p: 1, mr: 7, ml: 7, flexGrow: 1, color: "black" }}
            onClick={() => {
              setOpenLog(true);
            }}
          >
            <LoginIcon />
          </IconButton>
        )}

        <Divider />
      </List>
    </Box>
  );
  return (
    <Box>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onCloseDrawer}
        sx={{
          backgroundImage:
            "https://img.freepik.com/free-photo/kneading-dough-kitchen_1112-122.jpg?w=1380&t=st=1708440992~exp=1708441592~hmac=addeb6586ec28bf71c5870c8012444a57da0e40cf3525353fdca133125d8ddf2",
        }}
      >
        {list()}
      </Drawer>
      {openLog && (
        <Dialog open={openLog} onClose={handleClose}>
          <PopUpComponent />
        </Dialog>
      )}
    </Box>
  );
};

export default RightDrawerComponent;
