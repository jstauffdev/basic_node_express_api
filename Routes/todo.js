const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const db = require("../Config/db");

const Fiber = require("../Models/Todo");

router.get("/", (req, res) => {
  Fiber.find(function (err, todos) {
    if (err) return console.log(err);
    res.json(todos);
  });
});

//Get Single post
router.get('/:todoId', (req, res) => {
  const _id = req.params.spoolId;
  Fiber.find({_id: req.params.todoId}, (err, results) => {
      if(err){
          res.status(500).send("Invalid todo ID")
          console.log("Invalid todo ID")
      } else {
          if(results != null){
              res.status(200).json(results)
              // res.status(200).send(req.params.spoolId)
          } else {
              res.status(400).send('Unknown request')
              console.log('Todo not found, TodoID: ' + _id)
          }
      }
  })
})

router.post("/", async (req, res) => {
  const newFiber = new Fiber({
    _id: new mongoose.Types.ObjectId(),
    todo_item: req.body.todo_item,
    complete: req.body.complete
  });
  try {
    const fiber = await newFiber.save();
    if (!fiber) throw Error("Something went wrong saving the item");

    res.status(200).json(fiber);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await todo.findById(req.params.id);
    if (!todo) throw Error("No item found");

    const removed = await todo.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the fiber");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
