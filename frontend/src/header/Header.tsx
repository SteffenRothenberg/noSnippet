import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar } from "@mui/material";
import { useState } from "react";

type Props = {
    onLogout: () => Promise<void>;
};

export default function Header(props: Props) {
    const [, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        setIsLoading(true);
        props
            .onLogout()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    }

    function handleLogoClick() {
        navigate("/");
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "#0d0a63" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        flexGrow: 1,
                        color: "#ffffff",
                    }}
                >
                    Manage your Wardrobe
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: "#ffffff",
                        marginLeft: "16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={handleLogoClick}
                >
                    noSnippet
                </Typography>
                <div className="navbar">
                    <Button
                        component={Link}
                        to="/collection"
                        color="inherit"
                        sx={{
                            color: "#ffffff",
                            marginRight: "8px",
                            "&:hover": {
                                backgroundColor: "#4b0082",
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Your Collection
                    </Button>
                    <Button
                        component={NavLink}
                        to="/collection/add"
                        color="inherit"
                        sx={{
                            color: "#ffffff",
                            marginRight: "8px",
                            "&:hover": {
                                backgroundColor: "#4b0082",
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Create Clothing
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{
                            color: "#ffffff",
                            marginRight: "8px",
                            "&:hover": {
                                backgroundColor: "#4b0082",
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
