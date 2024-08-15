import React from "react";
import { Button, Typography, Container } from "@mui/material";
import useWallet from "../customHooks/UseWallet";
import { Clothing } from "../model/Cloathing";

type WalletManagerProps = {
    clothingItems: Clothing[];
};

export default function WalletManager({ clothingItems }: WalletManagerProps) {
    const { wallet, addToWallet, removeFromWallet, clearWallet } = useWallet();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Wallet
            </Typography>
            <Typography variant="h6">Items in Wallet:</Typography>
            {wallet.length > 0 ? (
                <ul>
                    {wallet.map(item => (
                        <li key={item.id}>
                            <Typography variant="body1">{item.name}</Typography>
                            <Button
                                onClick={() => removeFromWallet(item.id)}
                                variant="outlined"
                                color="error"
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography>No items in wallet</Typography>
            )}
            <Button
                onClick={() => clearWallet()}
                variant="contained"
                color="secondary"
            >
                Clear Wallet
            </Button>
            <Typography variant="h6" mt={2}>
                Add Items to Wallet:
            </Typography>
            {clothingItems.map(item => (
                <Button
                    key={item.id}
                    onClick={() => addToWallet(item)}
                    variant="contained"
                    color="primary"
                >
                    Add {item.name}
                </Button>
            ))}
        </Container>
    );
}
