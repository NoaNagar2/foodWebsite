import React from "react";
import { workshopValidate } from "../../../validation/workshopValidate";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../../service/storageService";

const CreateWorkshop = async (inputValue, setErrorState) => {
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

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/workshop",
      inputValue,
      config
    );
    toast.success("הסדנא נוספה בהצלחה", {
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
    toast.error("משהו השתבש... ודא שכל השדות מלאים ", {
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

export { CreateWorkshop };
