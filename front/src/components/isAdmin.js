import React from "react";
import { getToken } from "../service/storageService";
import { jwtDecode } from "jwt-decode";

const isAdmin = () => {
  const token = getToken();
  if (!token) return;
  let dataFromToken = jwtDecode(token);
  let isAdmin = dataFromToken.isAdmin;
  return isAdmin;
};

export { isAdmin };
