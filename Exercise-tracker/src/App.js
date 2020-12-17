import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar.component'
import ExercisesList from './components/ExercisesList.component'
import EditExercise from './components/EditExercises.component'
import CreateExercise from './components/CreateExercise.component'
import CreateUser from './components/CreateUser.component'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
