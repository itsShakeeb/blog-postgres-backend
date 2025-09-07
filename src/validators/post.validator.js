const { body, validationResult } = require('express-validator')

const publishedStatuses = ['draft', 'published']

const validatePost = [
    body('title').isLength({ min: 5, max: 20 }).withMessage('Title is required'),
    body('body').isLength({ min: 100, max: 2000 }).withMessage('Body is required'),
    body('author_id').notEmpty().withMessage('Author Id is required'),
    body('is_published')
        .notEmpty().withMessage('Publish status is required')
        .isIn(publishedStatuses).withMessage('Invalid role provided'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },

]

module.exports = {
    validatePost,
}