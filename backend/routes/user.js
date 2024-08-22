const express = require("express");

const { authMiddleware } = require("../middleware");
const zod = require("zod");
const { User } = require("../db")
const { Account } = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
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

    const { success } = signupSchema.safeParse(req.body);
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

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    // ----- create new account and add initial balance
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

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

    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });


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


//update query

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "error while updating"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    });

    res.json({
        message: "user updated"
    })
})


//finding query

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports = router;