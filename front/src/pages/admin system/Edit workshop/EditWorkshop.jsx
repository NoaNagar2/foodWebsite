import React from "react";
import { workshopValidate } from "../../../validation/workshopValidate";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../../service/storageService";

const EditWorkshop = async (inputValue, setErrorState, _id) => {
  const token = getToken();

  try {
    const joiResponse = workshopValidate(inputValue);
    setErrorState(joiResponse);
    if (joiResponse) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      "http://localhost:8080/api/v1/workshop/" + _id,
      inputValue,
      config
    );
    toast.success("Your card has been edit succssefully", {
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
    toast.error("request failed...Please try again later", {
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

export { EditWorkshop };
