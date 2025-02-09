import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();



  const loginAction = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:5003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
  
      if (res.data && res.data.user) {
        // Store  companyName
        const companyName = res.data.user.companyName || "Unknown Company";
        localStorage.setItem("companyName", companyName);
        console.log("Company Name stored:", companyName);
  
        // Navigate based on role
        if (res.data.user.role === "investor") {
          navigate("/dashboard");
        } else {
          navigate("/entrepreneur");
        }
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
