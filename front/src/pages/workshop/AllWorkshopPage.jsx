import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import WorkshopComponent from "../../components/WorkshopComponent";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getToken } from "../../service/storageService";

const AllWorkshopPage = () => {
  const [workshopFromServer, setWorkshopFromServer] = useState([]);
  const token = getToken();

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

  const workshopsArr = workshopFromServer.slice().reverse();

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {workshopsArr.map((workshop) => (
        <Grid item key={workshop._id} xs={12} sm={12} md={12} lg={12}>
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
  );
};

export default AllWorkshopPage;
