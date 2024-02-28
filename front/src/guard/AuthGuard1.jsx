import React from "react";
import { getToken } from "../service/storageService";

const AuthGuard1 = (children) => {
  const token = getToken();
  if (token) {
    return children;
  } else {
    return;
  }
};

export default AuthGuard1;
