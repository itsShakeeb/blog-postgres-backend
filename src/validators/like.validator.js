const { body, validationResult } = require("express-validator");

const validateAddLike = [
    body('post_id').notEmpty().withMessage('Post id is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() })
        }
        next()
    }
]


module.exports = {
    validateAddLike
}