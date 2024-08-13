
import './App.css';
import useUser from "./customHooks/useUser";
import {BrowserRouter} from "react-router-dom";
import Header from "./header/Header";

function App() {
  const {user, login, logout, isLoading, createUser} = useUser();

  function handleLogout() {
    return new Promise<void>((resolve) => {
      logout();
      resolve();
    });
  }

  // function handleLogin(username: string, password: string) {
  //   return login(username, password).catch((error) => {
  //     console.error('An error occurred during login:', error);
  //   });
  // }
  return (
      <BrowserRouter>
        <div className="App">
          <Header onLogout={handleLogout}/>
        </div>
      </BrowserRouter>
  );
}
export default App;
