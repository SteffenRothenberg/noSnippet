import {Clothing} from "../model/Cloathing";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent,Typography} from "@mui/material";
import './ClothingCard.css';

type ClothingProps = {
    clothing: Clothing;
};

export default function ClothingCard(props: ClothingProps) {
    const navigate = useNavigate();

    return (
        <Card className="clothing-card">
            <CardContent sx={{display: "flex", alignItems: "center", maxWidth: "sm", maxHeight: "sm"}}>
                    <Typography variant="body1" component="p">
                        Name:
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.clothing.name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Color:
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.clothing.color}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Brand:
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.clothing.brand}
                    </Typography>
                <Button
                    onClick={() => navigate("/collection/" + props.clothing.id)}
                    variant="contained"
                    color="warning"
                    className="clothing-card__button"
                >
                    Clothing-Details
                </Button>
            </CardContent>
        </Card>
    );
}