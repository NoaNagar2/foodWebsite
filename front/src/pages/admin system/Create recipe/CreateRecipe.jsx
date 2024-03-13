import React from "react";
import { recipeValidation } from "../../../validation/recipeValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../../service/storageService";
// import { useNavigate } from "react-router-dom";

const CreateRecipe = async (inputValue, setErrorsState) => {
  const token = getToken();
  // const navigate = useNavigate();

  try {
    const joiResponse = recipeValidation(inputValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/recipe",
      inputValue,
      config
    );

    toast.success("המתכון נוסף בהצלחה", {
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

export { CreateRecipe };
