import { useNavigate } from "react-router-dom";
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
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type ClothingDetailCardProps = {
    deleteClothing: (id: string) => void;
};

const StyledCard = styled(Card)({
    backgroundColor: '#003366', // Dark blue background
    color: '#ffffff', // White text color
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '50px',
    padding: '16px',
});

const StyledButton = styled(Button)({
    backgroundColor: '#7f00ff', // Initial button color
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#6a0dad', // Darker purple on hover
    },
    margin: '8px',
});

export default function ClothingDetailCard(props: ClothingDetailCardProps) {
    const {
        editedClothing,
        clothing,
        editing,
        handleFormSubmit,
        editOnClick,
        clothingInputChange,
    } = useDetail();
    const navigate = useNavigate();

    function onDeleteClick() {
        if (clothing) {
            props.deleteClothing(clothing.id);
        }
        navigate("/collection");
    }

    return (
        <StyledCard>
            {clothing ? (
                editing ? (
                    <form onSubmit={handleFormSubmit}>
                        <CardHeader title="Edit Clothing" />
                        <CardContent className="enterTextField">
                            <TextField
                                label="Name"
                                name="name"
                                value={editedClothing.name}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Type"
                                name="type"
                                value={editedClothing.type}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Size"
                                name="size"
                                value={editedClothing.size}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Color"
                                name="color"
                                value={editedClothing.color}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={editedClothing.price}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Brand"
                                name="brand"
                                value={editedClothing.brand}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Material"
                                name="material"
                                value={editedClothing.material}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={editedClothing.description}
                                onChange={clothingInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: '#ffffff' } }}
                            />
                        </CardContent>
                        <CardActions>
                            <StyledButton type="submit" variant="contained">
                                Save
                            </StyledButton>
                        </CardActions>
                    </form>
                ) : (
                    <div>
                        <Container maxWidth="sm">
                            <CardHeader title="Clothing Details" />
                            <CardContent>
                                <Typography variant="body1">Name: {clothing.name}</Typography>
                                <Typography variant="body1">Type: {clothing.type}</Typography>
                                <Typography variant="body1">Size: {clothing.size}</Typography>
                                <Typography variant="body1">Color: {clothing.color}</Typography>
                                <Typography variant="body1">Price: ${clothing.price}</Typography>
                                <Typography variant="body1">Brand: {clothing.brand}</Typography>
                                <Typography variant="body1">Material: {clothing.material}</Typography>
                                <Typography variant="body1">Description: {clothing.description}</Typography>
                            </CardContent>
                            <Grid container spacing={2} justifyContent="space-evenly" mt={2}>
                                <CardActions>
                                    <StyledButton onClick={editOnClick} variant="contained">
                                        Edit
                                    </StyledButton>
                                    <StyledButton onClick={onDeleteClick} variant="contained" color="error">
                                        Delete
                                    </StyledButton>
                                </CardActions>
                            </Grid>
                        </Container>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </StyledCard>
    );
}
