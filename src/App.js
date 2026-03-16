import logo from "./TrimLogo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Oh I Know A Guy Website in the works! <br />
          For detail quote feel free to contact us at: <br />
          (737)259-5124 or{" "}
          <a href="mailto:Javier@iknowaguy.com">Javier@iknowaguy.com</a>
        </p>
      </header>
    </div>
  );
}

export default App;
