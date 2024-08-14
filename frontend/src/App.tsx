
import './App.css';
import useUser from "./customHooks/UseUser";
import {BrowserRouter} from "react-router-dom";
import Header from "./header/Header";
import {useEffect} from "react";
import useCollection from "./customHooks/UseCollection";

function App() {
    const {collection, addClothing, deleteClothing, loadCollection} = useCollection()
  const {user, login, logout, isLoading, createUser} = useUser();

    useEffect(() => {
        if (user) {
            loadCollection();
        }
        //eslint-disable-next-line
    }, []);
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
          <Header onLogout={handleLogout}/>
        </div>
      </BrowserRouter>
  );
}
export default App;
