import exprees from "express";
import {
  createUsers,
  deleteUsers,
  getUsers,
  getUsersById,
  updateUsers,
} from "../controllers/UserController.js";

const router = exprees.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.post("/users", createUsers);
router.patch("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

export default router;
