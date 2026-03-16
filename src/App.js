import logo from "./TrimLogo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <span className="App-company">Oh..I KNOW A GUY! LLC</span> <br />{" "}
          Website in the works! <br />
          For a free estimate contact us at: <br />
          (737)259-5124 or{" "}
          <a href="mailto:I.knowaguy.lawn1@gmail.com">
            I.knowaguy.lawn1@gmail.com
          </a>{" "}
        </p>
      </header>
    </div>
  );
}

export default App;
