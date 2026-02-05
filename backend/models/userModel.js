const db = require('../config/db');

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(user) {
        const { name, email, password, phone, address } = user;
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, phone || '', address || '']
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT id, name, email, phone, address, role, avatar, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;
