const express = require("express");

const zod = require("zod");
const { User } = require("../db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

//signup logic
router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create(body);

    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token
    })
})


//signin logic

router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne(body);

    if (user) {
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);

        res.json({
            token
        })
        return;
    }

    res.status(411).json({
        message: "error while logging in"
    })
})

module.exports = router;