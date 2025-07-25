import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes,BrowserRouter as Router} from "react-router-dom";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar /> <br />
      <Routes>
        <Route path="/" element={<ExercisesList />}/>
        <Route path="/edit/:id" element={<EditExercise />}/>
        <Route path="/create" element={<CreateExercise />}/>
        <Route path="/user" element={<CreateUser />}/>
      </Routes>
    </Router>
  );
}

export default App;
