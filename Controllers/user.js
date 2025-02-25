const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

// Register a user
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        let result = user.toObject();
        delete result.password;

        jwt.sign(
            { result },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error signing token", err });
                }
                // Set the JWT as a cookie
                res.cookie("auth", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                res.json({ result, auth: token });
            }
        );
    } catch (error) {
        res.status(400).send(error);
    }
};

// Login a user
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Invalid password");

        const { password: _, ...userWithoutPassword } = user.toObject();

        jwt.sign(
            { data: userWithoutPassword },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error signing token", err });
                }
                // Set the JWT as a cookie
                res.cookie("auth", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                res.status(200).json({ userWithoutPassword, auth: token });
            }
        );
    } catch (error) {
        res.status(500).send(error);
    }
};

// Log out a user
const LoggedOut = (req, res) => {
    res.clearCookie("auth");
    res.status(200).send("User logged out successfully");
};

module.exports = { Register, Login, LoggedOut };
