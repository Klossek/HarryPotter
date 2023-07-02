import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});
export default UserContext;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            axiosPrivate
                .post("/auth/refresh", {})
                .then((response) => {
                    if (!response.data) {
                        setLoading(false);
                        navigate("/login");
                    } else {
                        setUser(response.data);
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        check();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]} >
            {!loading && children}
        </UserContext.Provider >
    );
};


