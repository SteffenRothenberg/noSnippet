import React, { useEffect, useState } from "react";
import { Clothing } from "../model/Cloathing";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function useDetail() {
    const [clothing, setClothing] = useState<Clothing>();
    const [editing, setEditing] = useState(false);
    const [editedClothing, setEditedClothing] = useState<Clothing>({
        id: "",
        name: "",
        type: "",
        size: "",
        color: "",
        price: 0,
        brand: "",
        material: "",
        description: ""
    });
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadClothingById(id);
        }
        //eslint-disable-next-line
    }, [id]);

    function loadClothingById(id: string) {
        axios.get(`/api/collection/${id}`)
            .then((response) => {
                setClothing(response.data);
                setEditedClothing(response.data);
            })
            .catch((error) => {
                console.error("Error loading clothing by ID:", error);
                toast.error("Failed to load clothing details.");
            });
    }

    function editOnClick() {
        setEditing(true);
    }

    function clothingInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEditedClothing((prevClothing) => ({
            ...prevClothing,
            [name]: value,
        }));
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.put(`/api/collection/${id}`, editedClothing)
            .then((response) => {
                setClothing(response.data);
                setEditing(false);
                toast.success("Clothing updated successfully");
            })
            .catch((error) => {
                console.error("Error updating clothing:", error);
                toast.error("Failed to update clothing.");
            });
    }

    return {
        editedClothing,
        clothing,
        editing,
        handleFormSubmit,
        editOnClick,
        clothingInputChange,
        setEditedClothing
    };
}
