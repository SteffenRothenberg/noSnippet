import { Clothing } from "../model/Cloathing";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import './ClothingCard.css';

type ClothingProps = {
    clothing: Clothing;
};

export default function ClothingCard(props: ClothingProps) {
    const navigate = useNavigate();

    return (
        <Card className="clothing-card" sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {props.clothing.name}
                </Typography>
                <Box sx={{ marginY: 1 }}>
                    <Typography variant="body1">
                        <strong>Color:</strong> {props.clothing.color}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Brand:</strong> {props.clothing.brand}
                    </Typography>
                </Box>
                <Button
                    onClick={() => navigate("/collection/" + props.clothing.id)}
                    variant="contained"
                    sx={{
                        color: 'white',
                        borderColor: 'darkblue',
                        backgroundColor: 'darkblue',
                        '&:hover': {
                            backgroundColor: 'navy',
                        },
                        marginTop: 2
                    }}
                    className="clothing-card__button"
                >
                    Clothing Details
                </Button>
            </CardContent>
        </Card>
    );
}
