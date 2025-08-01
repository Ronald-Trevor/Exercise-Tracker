import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> |
            <button type="button"
                style={{
                    background: "none", border: "none", color: "blue",
                    textDecoration: "underline", cursor: "pointer", padding: 0
                }}
                onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</button>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exercisesList = this.exercisesList.bind(this);

        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises/")
            .then((res) => {
                this.setState({ exercises: res.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete(`http://localhost:5000/exercises/delete/${id}`)
            .then((res) => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Exercises List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration(minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.exercisesList()}</tbody>
                </table>
            </div>
        );
    }
}