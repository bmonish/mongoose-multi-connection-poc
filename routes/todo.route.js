const express = require("express");
const controller = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", controller.getAllTodos);
router.post("/", controller.createTodo);
router.patch("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
