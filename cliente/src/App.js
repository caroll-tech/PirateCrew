import "./App.css";
//import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import { PirateDetail } from "./View/PirateDetail";
import { PirateForm } from "./components/PirateForm";
import { PirateList } from "./components/PirateList";
import FormPropsTextFields from "./components/FormPropsTextFields";

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<PirateList />} />
        <Route path="/pirates" element={<PirateList />} />
        <Route path="/pirate/new" element={<PirateForm />} />
        <Route path="/pirate/:id" element={<PirateDetail />} />
        <Route path="/pirate/form" element={<FormPropsTextFields />} />
      </Routes>
    </div>
  );
}

export default App;
