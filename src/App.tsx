import logo from "./logo.svg";
import {MainContent} from "./components/Layout";

function App() {
  return (
    <MainContent>
      <img src={logo} className="App-logo" alt="logo" />
    </MainContent>
  );
}

export default App;
