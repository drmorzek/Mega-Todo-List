const { Router } = require("express")
const router = Router()

const todoController = requireRoot("controllers/todos")


router.get("/", todoController.getTodos)
router.get("/:id",  todoController.getTodoById)
router.post("/",  todoController.addTodo)
router.patch("/:id", todoController.updateTodo)
router.delete("/:id", todoController.deleteTodoById)


module.exports = router