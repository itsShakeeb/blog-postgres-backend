const { body, validationResult } = require("express-validator");

const validateAddComment = [
    body('content').isLength({ min: 1, max: 100 }).withMessage('Comment cannot empty or more than 100 character'),
    body('post_id').notEmpty().withMessage('Post id is required'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() })
        }
        next()
    }
]

const validateEditComment = [
    body('content').isLength({ min: 1, max: 100 }).withMessage('Comment cannot empty or more than 100 character'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() })
        }
        next()
    }
]

module.exports = {
    validateAddComment,
    validateEditComment
}