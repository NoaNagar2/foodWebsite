import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getToken } from "../../service/storageService";

const useLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const token = getToken();
      if (!token) return;
      const dataFromToken = jwtDecode(token);
      if (skipTokenTest)
        await axios.get(
          `http://localhost:8080/api/v1/users/${dataFromToken._id}`
        );
      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      localStorage.clear();
    }
  };
};

export default useLogin;
