import { isAdmin } from "../components/isAdmin";

const AdminGuard = ({ children }) => {
  const admin = isAdmin();

  if (admin) {
    return children;
  } else {
    return;
  }
};

export default AdminGuard;
