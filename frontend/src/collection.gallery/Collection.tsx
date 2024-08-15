import { Clothing } from "../model/Cloathing";
import { useState } from "react";
import useCollection from "../customHooks/UseCollection";
import { MenuItem, TextField } from "@mui/material";
import ClothingCard from "../card/ClothingCard";
import "./Collection.css";

type CollectionProps = {
    collection: Clothing[];
}

enum SearchOption {
    Name = "name",
    Type = "type",
    Color = "color",
    Brand = "brand"
}

export default function Collection(props: CollectionProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState(SearchOption.Name);
    const { collection } = useCollection();

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOption(event.target.value as SearchOption);
    };

    const filteredCollection = collection.filter((clothing) =>
        clothing[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="collection">
            <div className="action-bar">
                <TextField
                    type="text"
                    placeholder="Search for"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <TextField
                    select
                    value={searchOption}
                    onChange={handleSearchOptionChange}
                >
                    <MenuItem value={SearchOption.Name}>Name</MenuItem>
                    <MenuItem value={SearchOption.Type}>Type</MenuItem>
                    <MenuItem value={SearchOption.Color}>Color</MenuItem>
                    <MenuItem value={SearchOption.Brand}>Brand</MenuItem>
                </TextField>
            </div>
            <div className="style">
                {filteredCollection.map((card: Clothing) => (
                    <ClothingCard
                        key={card.id}  // Hier wird der `key`-Prop hinzugefügt
                        clothing={card}
                    />
                ))}
            </div>
        </div>
    );
}
