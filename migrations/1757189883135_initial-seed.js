/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
require('dotenv').config();
const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
    pgm.createExtension('pgcrypto', { ifNotExists: true });

    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        role: { type: 'text', notNull: true, default: 'viewer' },
        name: { type: 'varchar(120)', notNull: true, },
        email: { type: 'varchar(255)', notNull: true, unique: true },
        username: { type: 'varchar(50)', notNull: true, unique: true },
        password: { type: 'varchar(255)', notNull: true },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()')
        }
    });

    pgm.createTable('posts', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        title: {
            type: 'varchar(100)',
            notNull: true,
        },
        body: {
            type: 'text',
            notNull: true,
        },
        is_published: {
            type: 'boolean',
            notNull: true,
            default: false,
        },
        author_id: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()')
        }
    });
    pgm.createIndex('posts', 'author_id', { name: 'idx_posts_author' })

    pgm.createTable('comments', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'),
        },
        content: {
            type: 'text',
            notNull: true
        },
        user_id: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        },
        post_id: {
            type: 'uuid',
            notNull: true,
            references: 'posts',
            onDelete: 'CASCADE'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()'),
        },
        updated_at: {
            type: 'timestamptz',
        },

    })

    pgm.addConstraint('comments', 'unique_comment_per_user_per_post', {
        unique: ['post_id', 'user_id']
    })

    pgm.createIndex('comments', 'post_id', { name: 'idx_comments_post' });

    pgm.createTable('likes', {
        user_id: {
            type: 'uuid',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE',
        },
        post_id: {
            type: 'uuid',
            notNull: true,
            references: 'posts',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()'),
        },
    }, {
        constraints: {
            primaryKey: ['user_id', 'post_id']
        }
    })

    pgm.createIndex('likes', 'post_id', { name: 'idx_likes_post' })

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
    pgm.dropTable('likes');
    pgm.dropTable('comments');
    pgm.dropTable('posts');
    pgm.dropTable('users');
    pgm.dropExtension('pgcrypto');

};


module.exports = {
    down,
    up,
    shorthands,
}