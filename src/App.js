import { Splash } from "./components/Splash/Splash";
import { Header } from "./components/Header/Header";
import { Services } from "./components/Service/Services";
import { Form } from "./components/Form/Form";
import "./App.css";

function App() {
  return (
    <div>
      <Splash />
      <Header />
      <Services />
      <Form />
    </div>
  );
}

export default App;
