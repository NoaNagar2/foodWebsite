import React from "react";
import axios from "axios";
import { recipeValidation } from "../../../validation/recipeValidation";
import { toast } from "react-toastify";
import { getToken } from "../../../service/storageService";

const EditRecipe = async (inputValue, setErrorState, _id) => {
  const token = getToken();
  try {
    const joiResponse = recipeValidation(inputValue);
    setErrorState(joiResponse);
    if (joiResponse) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      "http://localhost:8080/api/v1/recipe/" + _id,
      inputValue,
      config
    );

    toast.success("המתכון עודכן בהצלחה", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
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

export { EditRecipe };
