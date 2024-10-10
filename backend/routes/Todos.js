const todoController = require("../controllers/todoController");
const router = require("express").Router();

router.post("/create", todoController.create);
router.get("/get", todoController.get);
router.put("/update/:id", todoController.update);
router.put("/mark-complete/:id", todoController.markComplete);
router.delete("/delete/:id", todoController.delete);

module.exports = router;