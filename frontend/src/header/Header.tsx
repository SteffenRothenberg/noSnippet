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
        <AppBar position="static" sx={{ bgcolor: "#f1f1f1" }}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: "#ff9900",
                        marginLeft: "16px",
                        cursor: "pointer",
                    }}
                    onClick={handleLogoClick}
                >
                    noSnippet
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{
                        flexGrow: 1,
                        marginCenter: "16px",
                        color: "#ff9900",
                    }}
                >
                    manage your Wardrobe
                </Typography>
                <div className="navbar">
                    <Button
                        component={Link}
                        to="/collection"
                        color="inherit"
                        sx={{ "&:hover": { backgroundColor: "#ff9900" } }}
                    >
                        Click here for your Collection
                    </Button>
                    <Button
                        component={NavLink}
                        to="/collection/add"
                        color="inherit"
                        sx={{ "&:hover": { backgroundColor: "#ff9900" } }}
                    >
                        create Clothing
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ "&:hover": { backgroundColor: "#ff9900" } }}
                    >
                        LogOut
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
