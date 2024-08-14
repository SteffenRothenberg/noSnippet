import {Button, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
});

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export const LoginPage = (props: Props) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const  navigate = useNavigate()

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.onLogin(username, password).then(() => {
            navigate("/albums");
        })
            .catch((error) => {
                console.error("Error occurred:", error)
            });
    }

    return (
        <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
            <TextField id="input-with-sx"
                       label="Username (enter test as dummy user)"
                       variant="filled"
                       value={username}
                       InputProps={{sx: {color: "white", fontWeight: "bold"}}}
                       InputLabelProps={{sx: {color: "orange"}}}
                       onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
                label="Password (enter test as dummy password)"
                variant="filled"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{sx: {color: "white", fontWeight: "bold"}, type: "password"}}
                InputLabelProps={{sx: {color: "orange"}}}
            />

            <Button
                variant="contained"
                type="submit"
                sx={{
                    bgcolor: "white",
                    color: "orange",
                    fontWeight: "bold",
                    minWidth: "100px",
                    maxWidth: "200px",
                    mx: "auto",
                    "&:hover": {
                        color: "black",
                        bgcolor: "orange"
                    },
                }}
            >
                Login
            </Button>
            <Button
                sx={{
                    bgcolor: "white",
                    color: "orange",
                    fontWeight: "bold",
                    minWidth: "100px",
                    maxWidth: "200px",
                    mx: "auto",
                    "&:hover": {
                        color: "black",
                        bgcolor: "orange"
                    },
                }}
                size="small"
                onClick={() => navigate(`/signup`)}
            >
                Anmelden
            </Button>
        </FormContainer>

    )
}