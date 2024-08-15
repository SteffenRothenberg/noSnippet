import { useState } from "react";
import { Clothing } from "../model/Cloathing";

export default function useWallet() {
    const [wallet, setWallet] = useState<Clothing[]>([]);

    const addToWallet = (item: Clothing) => {
        setWallet(prevWallet => [...prevWallet, item]);
    };

    const removeFromWallet = (itemId: string) => {
        setWallet(prevWallet => prevWallet.filter(item => item.id !== itemId));
    };

    const clearWallet = () => {
        setWallet([]);
    };

    return {
        wallet,
        addToWallet,
        removeFromWallet,
        clearWallet,
    };
}
