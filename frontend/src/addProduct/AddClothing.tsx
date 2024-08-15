import {NewClothing} from "../model/Cloathing";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import './AddClothing.css'

type AddClothingProps = {
    addClothing: (newClothing: NewClothing) => void
}

export default function AddClothing(props: AddClothingProps) {
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [size, setSize] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [brand, setBrand] = useState<string>("")
    const [material, setMaterial] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const navigate = useNavigate()

    function onSaveClothing(event: FormEvent<HTMLFormElement>){
     event.preventDefault()
        const newClothing: NewClothing = {
            name: name,
            type: type,
            size: size,
            color: color,
            price: price,
            brand: brand,
            material: material,
            description: description
    }
        props.addClothing(newClothing)
        navigate("/collection")
    }

    return (
        <div>
            <form onSubmit={onSaveClothing}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) =>{
                        setName(event.target.value);
                    }}
                    />
                <TextField
                    label="Type"
                    value={type}
                    onChange={(event) =>{
                        setType(event.target.value);
                    }}
                />
                <TextField
                    label="Size"
                    value={size}
                    onChange={(event) =>{
                        setSize(event.target.value);
                    }}
                />
                <TextField
                    label="Color"
                    value={color}
                    onChange={(event) =>{
                        setColor(event.target.value);
                    }}
                />
                <TextField
                    label="Price"
                    value={price.toString()} // Konvertiert die Zahl zu einem String
                    onChange={(event) => {
                        setPrice(parseFloat(event.target.value)); // Konvertiert den String zurück zu einer Zahl
                    }}
                />
                <TextField
                    label="Brand"
                    value={brand}
                    onChange={(event) =>{
                        setBrand(event.target.value);
                    }}
                />
                <TextField
                    label="Material"
                    value={material}
                    onChange={(event) =>{
                        setMaterial(event.target.value);
                    }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) =>{
                        setDescription(event.target.value);
                    }}
                />
                <Button type="submit" variant="outlined" sx={{ color: 'white', borderColor: 'darkblue', backgroundColor: 'darkblue', '&:hover': { backgroundColor: 'navy' } }}>
                    Speichern
                </Button>

            </form>
        </div>
    )
}