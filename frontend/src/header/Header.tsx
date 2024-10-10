import { useNavigate } from "react-router-dom";
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

    function navigateToCollection() {
        navigate("/collection");
    }

    function navigateToAdd() {
        navigate("/collection/add");
    }

    function navigateToWallet() {
        navigate("/wallet");
    }

    return (
        <AppBar position="static" className="header">
            <Toolbar className="toolbar">
                <Typography variant="subtitle1" className="logo-text" onClick={handleLogoClick}>
                    Manage your Wardrobe
                </Typography>
                <Typography variant="h5" component="div" className="title" onClick={handleLogoClick}>
                    noSnippet
                </Typography>
                <div className="navbar">
                    <Button
                        className="navbar-button"
                        onClick={navigateToCollection}
                        sx={{
                            backgroundColor: "#3498db", /* Sichtbare Hintergrundfarbe */
                            color: "#ffffff",
                            marginRight: "8px",
                            "&:hover": {
                                backgroundColor: "#4b0082", /* Hover-Effekt */
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Your Collection
                    </Button>
                    <Button
                        className="navbar-button"
                        onClick={navigateToAdd}
                        sx={{
                            backgroundColor: "#3498db",
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
                        className="navbar-button"
                        onClick={navigateToWallet}
                        sx={{
                            backgroundColor: "#3498db",
                            color: "#ffffff",
                            marginRight: "8px",
                            "&:hover": {
                                backgroundColor: "#4b0082",
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Wallet
                    </Button>
                    <Button
                        className="navbar-button"
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: "#3498db",
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
