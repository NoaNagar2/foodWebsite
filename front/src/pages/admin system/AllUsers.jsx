import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Box, Typography } from "@mui/material";
import { getToken } from "../../service/storageService";
import PersonIcon from "@mui/icons-material/Person";
import "./css.css";

const AllUsers = () => {
  const [usersFromServer, setUserFromServer] = useState();
  const [open, setOpen] = React.useState(false);
  const token = getToken();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUserFromServer(data);
      })
      .catch((e) => {});
  }, []);

  return (
    <Box>
      <Typography variant="h6">משתמשים רשומים באתר:</Typography>
      <Divider />
      {usersFromServer?.map((user, index) => (
        <Box key={index}>
          <Box
            sx={{ display: "flex", direction: "rtl", mb: 1, mt: 2 }}
            className="box"
          >
            <PersonIcon sx={{ ml: 2 }} />
            <Typography
              sx={{ width: "20vw", mb: 1 }}
              className="text"
            >{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography sx={{ width: "20vw", mb: 1 }} className="text">
              {user.email}
            </Typography>
            <Typography sx={{ width: "20vw", mb: 1 }} className="text">
              {user.phone}
            </Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default AllUsers;
