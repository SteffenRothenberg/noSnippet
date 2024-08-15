import {useNavigate} from "react-router-dom";
import useDetail from "../customHooks/UseDetail";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";

type ClothingDetailCardProps = {
    deleteClothing: (id: string) => void;
};

export default function ClothingDetailCard(props: ClothingDetailCardProps){
    const {editedClothing, clothing, editing, handleFormSubmit, editOnClick, clothingInputChange} = useDetail();
    const navigate = useNavigate();

    function onDeleteClick(){
        if(clothing) {
            props.deleteClothing(clothing.id);
        }
        navigate("/clothing");
    }
    return(
        <Card className="clothing-detail">
            {clothing ?(
                editing ? (
                    <form onSubmit={handleFormSubmit}>
                        <CardHeader title="Kleidung bearbeiten"/>
                        <CardContent className="enterTextfield">
                            <TextField
                                label="Name"
                                name="name"
                                value={editedClothing.name}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Type"
                                name="type"
                                value={editedClothing.type}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Size"
                                name="size"
                                value={editedClothing.size}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Color"
                                name="color"
                                value={editedClothing.color}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={editedClothing.price}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Brand"
                                name="brand"
                                value={editedClothing.brand}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Material"
                                name="material"
                                value={editedClothing.material}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={editedClothing.description}
                                onChange={clothingInputChange}
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" color="warning">
                                Speichern
                            </Button>
                        </CardActions>
                    </form>
                ):(
                    <div>
                        <Container maxWidth="sm">
                            <CardHeader title="Details:"/>
                            <CardContent>
                                <Typography variant="body1">Name: {clothing.name}</Typography>
                                <Typography variant="body1">Name: {clothing.type}</Typography>
                                <Typography variant="body1">Name: {clothing.size}</Typography>
                                <Typography variant="body1">Name: {clothing.color}</Typography>
                                <Typography variant="body1">Name: {clothing.price}</Typography>
                                <Typography variant="body1">Name: {clothing.brand}</Typography>
                                <Typography variant="body1">Name: {clothing.material}</Typography>
                                <Typography variant="body1">Name: {clothing.description}</Typography>
                            </CardContent>
                            <Grid container spacing={2} justifyContent="space-evenly" mt={2}>
                                <CardActions>
                                    <Button onClick={editOnClick} variant="contained" color="warning">
                                    </Button>
                                    <Button onClick={onDeleteClick} variant="contained" color="error">
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Container>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </Card>
    )

}