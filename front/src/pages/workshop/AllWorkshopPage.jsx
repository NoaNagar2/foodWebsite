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

  const handleDeleteWorkshop = async (_id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/workshop/" + _id
      );
      setWorkshopFromServer((workshopFromServerCopy) =>
        workshopFromServerCopy.filter((workshop) => workshop._id !== _id)
      );
      toast.success("הסדנא נמחקה בהצלחה", {
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

  const workshopsArr = workshopFromServer.slice().reverse();

  const handleJoinClick = async (_id) => {
    try {
      const { data } = axios.patch(
        "http://localhost:8080/api/v1/workshop/" + _id,
        {
          headers: {
            bearer: `${token}`,
          },
        }
      );
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
            onDelete={handleDeleteWorkshop}
            onJoin={handleJoinClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllWorkshopPage;
