import React from "react";
import { recipeValidation } from "../../../validation/recipeValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../../service/storageService";

const CreateRecipe = async (inputValue, setErrorsState) => {
  const token = getToken();
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
    toast.error("משהו השתבש... ודא שכל השדות מלאים", {
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

export { CreateRecipe };
