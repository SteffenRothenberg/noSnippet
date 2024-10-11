import './App.css';
import useUser from "./customHooks/UseUser";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import React, { useEffect } from "react";
import useCollection from "./customHooks/UseCollection";
import { SignUpPage } from "./routesAndLoginData/SignUpPage";
import { LoginPage } from "./routesAndLoginData/LoginPage";
import HomePage from "./HomePage";
import ProtectedRoutes from "./routesAndLoginData/ProtectedRoutes";
import Collection from "./collection.gallery/Collection";
import AddClothing from "./addProduct/AddClothing";
import ClothingDetailCard from "./clothingDetail/ClothingDetailCard";
import WalletManager from "./components/WalletManager";

function App() {
    const { collection, addClothing, deleteClothing, loadCollection } = useCollection();
    const { user, login, logout, isLoading, createUser } = useUser();

    useEffect(() => {
        if (user) {
            loadCollection();
        }
        //eslint-disable-next-line
    }, [user]);

    function handleLogout() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }

    function handleLogin(username: string, password: string) {
        return login(username, password).catch((error) => {
            console.error('An error occurred during login:', error);
        });
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Header onLogout={handleLogout} />
                <div className="main-content">
                    <Routes>
                        <Route path="/signup" element={<SignUpPage createUser={createUser} />} />
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                        <Route path="/" element={<HomePage />} />
                        <Route element={<ProtectedRoutes user={user} isLoading={isLoading} />}>
                            <Route element={<Navigate to="/collection" />} />
                            <Route path="/collection" element={<Collection collection={collection} />} />
                            <Route path="/collection/add" element={<AddClothing addClothing={addClothing} />} />
                            <Route path="/collection/:id" element={<ClothingDetailCard deleteClothing={deleteClothing} />} />
                            <Route path="/wallet" element={<WalletManager clothingItems={collection} />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
