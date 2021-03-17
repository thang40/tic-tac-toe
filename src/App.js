import { useEffect, useState } from "react";
import * as styles from "./App.module.css";
import { Board } from "./components";
import * as authService from "./services/auth.service";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("asdasd");
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const info = await authService.getUserInfo();
      setUserInfo(info);
    } catch (error) {
      if (error.message !== "Login required") {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (e) => {
    authService.logout();
    setUserInfo(null);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const loginInfo = {
        username: e.target.elements["username"].value,
        password: e.target.elements["password"].value,
      };
      const userInfo = await authService.login(loginInfo);
      setUserInfo(userInfo);
      setError(null);
    } catch (error) {
      if (error.message === "Wrong Username or Password") {
        setError(error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && "...Fetching User Info"}
      {isLoading === false && userInfo === null && (
        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="username"
            defaultValue="test@example.com"
            type="text"
          ></input>
          <input
            name="password"
            placeholder="password"
            defaultValue="123456"
            type="password"
          ></input>
          <button type="submit">Login</button>
          {error && <h5>{error}</h5>}
        </form>
      )}
      {isLoading === false && userInfo !== null && (
        <>
          <button onClick={handleLogout}>Log out</button>
          <p>Username: {userInfo.username}</p>
          <p>Name: {userInfo.name}</p>
          <header className="App-header">
            <p>Tic Tac Toe</p>
          </header>
          <Board />
        </>
      )}
    </div>
  );
}

export default App;
