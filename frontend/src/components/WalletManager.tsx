import React, { useState } from "react";
import {
    Button,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import QRCode from "qrcode.react";
import useWallet from "../customHooks/UseWallet";
import { Clothing } from "../model/Cloathing";

type WalletManagerProps = {
    clothingItems: Clothing[];
};

export default function WalletManager({ clothingItems }: WalletManagerProps) {
    const { wallet, addToWallet, removeFromWallet, clearWallet } = useWallet();
    const [qrDialogOpen, setQrDialogOpen] = useState(false);

    const handleGenerateQRCode = () => {
        setQrDialogOpen(true);
    };

    const handleCloseQRCodeDialog = () => {
        setQrDialogOpen(false);
    };

    const serializedWallet = JSON.stringify(wallet);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Wallet
            </Typography>
            <Box mb={4}>
                <Typography variant="h6">Items in Wallet:</Typography>
                {wallet.length > 0 ? (
                    <Grid container spacing={2}>
                        {wallet.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                    sx={{
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        textAlign: "center",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description || "No description available"}
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        sx={{
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            onClick={() => removeFromWallet(item.id)}
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                        >
                                            Remove
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography mt={2}>No items in wallet</Typography>
                )}
                {wallet.length > 0 && (
                    <Box mt={4} textAlign="center">
                        <Button
                            onClick={() => clearWallet()}
                            variant="contained"
                            color="secondary"
                            sx={{ marginRight: "8px" }}
                        >
                            Clear Wallet
                        </Button>
                        <Button
                            onClick={handleGenerateQRCode}
                            variant="contained"
                            color="primary"
                        >
                            Generate QR Code
                        </Button>
                    </Box>
                )}
            </Box>

            <Typography variant="h5" gutterBottom>
                Add Items to Wallet:
            </Typography>
            <Grid container spacing={2}>
                {clothingItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            sx={{
                                backgroundColor: "#e0f7fa",
                                borderRadius: "8px",
                                padding: "16px",
                                textAlign: "center",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description || "No description available"}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    onClick={() => addToWallet(item)}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Add to Wallet
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={qrDialogOpen} onClose={handleCloseQRCodeDialog}>
                <DialogTitle>Your Wallet QR Code</DialogTitle>
                <DialogContent
                    sx={{ textAlign: "center", paddingTop: "16px" }}
                >
                    <QRCode value={serializedWallet} />
                    <Typography variant="body2" sx={{ marginTop: "8px" }}>
                        Scan this QR code to retrieve your wallet items.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQRCodeDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
