import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link className="btn btn-secondary" to={"/edit/" + props.exercise._id}>
        edit
      </Link>{" "}
      |{" "}
      <a
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

class ExercisesList extends Component {
  state = {
    exercises: [],
  };

  componentDidMount() {
    axios
      .get("https://mern-erxercise-tracker.herokuapp.com/exercises/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          exercises: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise = (id) => {
    axios
      .delete("https://mern-erxercise-tracker.herokuapp.com/exercises/" + id)
      .then((res) => console.log(res.data))
      .then(
        this.setState({
          exercises: this.state.exercises.filter((el) => el._id !== id),
        })
      );
  };

  exerciseList = () => {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
 
export default ExercisesList;