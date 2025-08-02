import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        let navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate}/>;
    }
    return ComponentWithRouterProp;
}

class EditExercise extends Component {
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.userInputRef = React.createRef();

        this.state = {
            username : "",
            description : "",
            duration : 0,
            date : new Date(),

            users : []
        }
    }

    componentDidMount(){
        const { id } = this.props.params;

        axios.get(`http://localhost:5000/exercises/${id}`)
            .then((res) => {
                this.setState({
                    username:res.data.username,
                    description:res.data.description,
                    duration:res.data.duration,
                    date:new Date (res.data.date)
                })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get("http://localhost:5000/users/")
        .then((res) => {
            if(res.data.length > 0) {
                this.setState({
                users:res.data.map(user => user.username),
            })
            console.log(res.data)
            }
        })
    }

    onChangeUsername(e) {
        this.setState({
            username : e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description : e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration : e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date : date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const { id } = this.props.params;

        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }

        axios.put(`http://localhost:5000/exercises/update/${id}`,exercise)
        .then((res) => {
            console.log(res);
            this.props.navigate("/");
        })
    }

    render () {
        return (
            <div>
                <h2>Edit New Exercise Log</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select
                        ref={this.userInputRef}
                        required
                        className="form-control"
                        value = {this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>
                                        {user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value = {this.state.description}
                        onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes) :</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value = {this.state.duration}
                        onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group" >
                        <label>Date</label>
                        <div>
                            <DatePicker 
                            selected = {this.state.date}
                            onChange = {this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditExercise);