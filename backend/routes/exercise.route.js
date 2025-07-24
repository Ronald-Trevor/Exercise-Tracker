import { Router } from "express";
import  Exercise  from "../models/exercise.model.js";

const exerciseRoute = Router();
exerciseRoute.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.status(400).json("Error:" + err);
    });
});

//Add a new exercise
exerciseRoute.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise
    .save()
    .then(() => {
      res.json("Exercise created!");
    })
    .catch((err) => {
      res.status(400).json("Error:" + err);
    });
});

//Return a single exercise
exerciseRoute.route("/:id").get((req,res) => {
  Exercise.findById(req.params.id)
  .then((exercise)=>{
    res.json(exercise)
  })
  .catch((error)=>{
    res.status(400).json("Error:" + error);
  })
})

//Update a single exercise
exerciseRoute.route("/update/:id").put((req,res)=>{
  Exercise.findByIdAndUpdate(req.params.id)
  .then((exercise) => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = req.body.duration;
    exercise.date = req.body.date;

    exercise.save()
    .then(() => {
      res.json("Exercise updated successfully")
    })
    .catch((error) => {
      res.status(400).json("Error:" + error);
    })
  })
  .catch((error) =>{
    res.status(400).json("Error:" + error);
  })
})

//Delete an exercise
exerciseRoute.route("/delete/:id").delete((req,res) => {
  Exercise.findByIdAndDelete(req.params.id)
  .then(() => {
    res.json("Deleted exercise successfully");
  })
  .catch((error) => {
    res.status(400).json("Error:" + error);
  })
})

export default exerciseRoute;
