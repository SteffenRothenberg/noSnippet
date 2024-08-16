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

    function navigateToWallet() { // Hinzugefügt: Funktion zum Navigieren zur Wallet-Seite
        navigate("/wallet");
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
                        onClick={navigateToCollection}
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
                        onClick={navigateToAdd}
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
                        onClick={navigateToWallet} // Hinzugefügt: Button für Wallet
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
                        Wallet
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
