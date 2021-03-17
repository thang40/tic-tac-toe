import { createStore } from "redux";
import "./App.css";
import { Board } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tic Tac Toe</p>
      </header>
      <Board />
    </div>
  );
}

export default App;
