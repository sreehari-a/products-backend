const express = require("express");

const Task = require("../models/task");

const authMiddleware = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET /tasks?completed=true
//GET /tasks?limit=20&skip=30
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    // res.status(200).send(tasks);
    const match = {};
    const sort = {};

    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
      const [key, direction] = req.query.sortBy.split(":");
      sort[key] = direction === "desc" ? -1 : 1;
    }

    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.status(200).send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
router.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ["description", "completed"];
  const isInvalidOperation = !updates.every((key) => allowedKeys.includes(key));

  if (isInvalidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, owner: req.user._id });

    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
