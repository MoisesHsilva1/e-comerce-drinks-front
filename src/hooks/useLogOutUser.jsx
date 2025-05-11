import { useNavigate } from "react-router";
import authFireBase from "../config/firebase";

const useLogOutUser = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authFireBase.signOut(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error in logOut:", error); 
    }
  };

  return { logout };
};
export default useLogOutUser;
