import React from "react";
import { workshopValidate } from "../../../validation/workshopValidate";
import axios from "axios";
import { getToken } from "../../../service/storageService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    toast.success("הסדנא נערכה בהצלחה", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (e) {
    toast.error("משהו השתבש... ודא שכל השדות מלאים", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export { EditWorkshop };
