import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {UserModel} from "../model/User";

export default function useUser() {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch(() => {
                    toast.error("Kein User gefunden");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        //eslint-disable-next-line
        checkLoggedInUser();
    }, []);

    function login(username: string, password: string): Promise<void> {
        return axios.post("/api/users/login", undefined, {
            auth: { username, password },
        })
            .then(response => {
                setUser(response.data);
                toast.success("Login erfolgreich!");
            })
            .catch(() => {
                toast.error("Login fehlgeschlagen: Bitte Benutzernamen und/oder Passwort überprüfen.");
            });
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
            })
            .catch(() => {
                console.log("error")
            });
    }

    const createUser = async (newUser: UserModel) => {
        return await axios.post("/api/users/signup", newUser, {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }

    return { user, login, logout, isLoading, createUser};

}