import React from "react";
import { getToken } from "../service/storageService";
import { jwtDecode } from "jwt-decode";

const getEmail = () => {
  const token = getToken();
  if (!token) return;
  let dataFromToken = jwtDecode(token);
  let email = dataFromToken.email;
  return email;
};

export { getEmail };
