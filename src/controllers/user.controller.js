const userService = require('../services/user.service');
const { COOKIE_MAX_AGE } = require('../utils/constant');

const createUserController = async (req, res) => {
    const { email, password, username, role, name } = req.body
    const body = { email, password, username, role, name }
    try {
        const user = await userService.createUser(body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginUserController = async (req, res) => {
    const { email, password } = req.body
    try {
        const { refresh_token, ...rest } = await userService.loginUser({ email, password })
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            // path: '/auth/refresh', // optional, limit cookie scope
            maxAge: COOKIE_MAX_AGE,
        });
        res.status(200).json(rest)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = {
    createUserController,
    loginUserController
}