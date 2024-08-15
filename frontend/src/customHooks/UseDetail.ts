import React, {useEffect, useState} from "react";
import {Clothing} from "../model/Cloathing";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function UseDetail(){
    const [clothing, setClothing] = useState<Clothing>();
    const [editing, setEditing] = useState(false);
    const [editedClothing, setEditedClothing] = useState<Clothing>({
        id:"",
        name: "",
        type: "",
        size: "",
        color: "",
        price: 0,
        brand: "",
        material: "",
        description: ""
    })
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadClothingById(id);
        }
        //eslint-disable-next-line
    }, []);

    function loadClothingById(id: string){
        axios.get("/api/collection" + id)
            .then((response) => {
                setClothing(response.data);
                setEditedClothing(response.data);
            })
    }
    function editOnClick() {
        setEditing(true);
    }
    function clothingInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setEditedClothing((prevClothing) => ({
            ...prevClothing,
            [name]: value,
        }));
    }
    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        axios
            .put("/api/collection/" + id, editedClothing)
            .then((response) => {
            setClothing(response.data);
            setEditing(false);
            toast.success("Clothing updated successfully");
        })
    }

    return {editedClothing, clothing, editing, handleFormSubmit, editOnClick, clothingInputChange, setEditedClothing}
}