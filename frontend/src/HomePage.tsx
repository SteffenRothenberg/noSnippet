import { Typography } from "@mui/material";

export default function HomePage() {
    return (
        <div>
            <Typography variant="h2" align="center" sx={{ marginTop: "40px" }}>
                Willkommen auf noSnippet!
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginTop: "16px" }}>
                Hier kannst du deine Garderobe anlegen und verwalten.
                Nie wieder nervige Schnipsel, all digital!
            </Typography>
        </div>
    );
}
