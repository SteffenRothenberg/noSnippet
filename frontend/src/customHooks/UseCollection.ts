import {useEffect, useState} from "react";
import {Clothing, NewClothing} from "../model/Cloathing";
import axios from "axios";
import {toast} from "react-toastify";

export default function useCollection() {
    const [collection, setCollection] = useState<Clothing[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadCollection()
    }, []);

    function loadCollection() {
        axios.get("/api/collection")
            .then((getCollection) => {
                setCollection(getCollection.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function addClothing(newClothing: NewClothing) {
        axios.post("/api/collection", newClothing)
            .then(() => loadCollection())
            .catch(() => console.error("post on /api/Request was not successful"))
    }
    function deleteClothing(id: string) {
        axios.delete('/api/collection/' + id)
            .then(() => {
                setCollection(collection.filter((clothing) => clothing.id !== id))
                toast.success("Clothing deleted successfully");
            })
            .catch(console.error)
    }
    return {collection, loadCollection, addClothing, deleteClothing, searchTerm, setSearchTerm}
}