const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");





// router.post("/sign-out", userController.signOut);
router.get("/sign-in", userController.getSignIn);
router.post("/sign-in", userController.postSignIn);
router.get("/sign-up", userController.getSignUp);
router.post("/sign-up", userController.postSignUp);

module.exports = router;