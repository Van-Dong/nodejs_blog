const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ROUNDS = 10;
const JWT_SECRET = "jwt-secret";

class UserController {
    // [GET] /auth/sign-in
    getSignIn(req, res) {
        res.render('sign-in');
    }

    // POST /auth/sign-in
    async postSignIn(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, password)

            const user = await User.findOne({ email });
            if (!user) {
                return res.json({ error: "User not existed" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({ error: "Invalid password" });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            res.cookie("jwt", token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.json({ error });
        }
    }

    // GET /auth/sign-up
    getSignUp(req, res) {
        res.render('sign-up');
    }

    // POST /auth/sign-up
    async postSignUp(req, res, next) {
        try {
            const { name, email, password } = req.body;
            console.log({ name, email, password });

            const user = await User.findOne({ email });
            if (user) {
                return res.json({ user: null, error: new Error("User already existed") });
            }

            const hashedPassword = await bcrypt.hash(password, ROUNDS);
            console.log(hashedPassword);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
            res.cookie("jwt", token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.json({ error });
        }
    }

}

module.exports = new UserController();





