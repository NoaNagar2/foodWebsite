import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Divider } from "@mui/material";

const Participant = (id) => {
  const [workshopFromServer, setWorkshopFromServer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/workshop" + id)
      .then(({ data }) => {
        setWorkshopFromServer(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const participant = workshopFromServer.participant;

  return (
    <Box>
      {/* {participants.map((p) => (
        <Box>
          <Typography>{p.firstName}</Typography>
          <Typography>{p.lastName}</Typography>
          <Typography>{p.email}</Typography>
          <Typography>{p.phone}</Typography>
          <Divider />
        </Box>
      ))} */}
    </Box>
  );
};

export default Participant;
