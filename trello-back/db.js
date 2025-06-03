const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = {
    async getCards() {
        const [cards] = await pool.query('SELECT * FROM cards');
        for (let card of cards) {
            const [tables] = await pool.query('SELECT * FROM tables WHERE card_id = ?', [card.id]);
            for (let table of tables) {
                const [tableCards] = await pool.query('SELECT * FROM table_cards WHERE table_id = ?', [table.id]);
                table.cards = tableCards;
            }
            card.tables = tables;
        }
        return cards;
    },

    async getCard(id) {
        const [cards] = await pool.query('SELECT * FROM cards WHERE id = ?', [id]);
        if (!cards[0]) return null;
        const card = cards[0];
        const [tables] = await pool.query('SELECT * FROM tables WHERE card_id = ?', [id]);
        for (let table of tables) {
            const [tableCards] = await pool.query('SELECT * FROM table_cards WHERE table_id = ?', [table.id]);
            table.cards = tableCards;
        }
        card.tables = tables;
        return card;
    },

    async createCard(card) {
        const { id, title, text, background, tables } = card;
        await pool.query('INSERT INTO cards (id, title, text, background) VALUES (?, ?, ?, ?)', [id, title, text, background]);
        if (tables && tables.length) {
            for (let table of tables) {
                await pool.query('INSERT INTO tables (id, card_id, title) VALUES (?, ?, ?)', [table.id, id, table.title]);
                if (table.cards && table.cards.length) {
                    for (let card of table.cards) {
                        await pool.query('INSERT INTO table_cards (id, table_id, text) VALUES (?, ?, ?)', [card.id, table.id, card.text]);
                    }
                }
            }
        }
        return await db.getCard(id);
    },

    async updateCard(id, card) {
        const { title, text, background, tables } = card;
        await pool.query('UPDATE cards SET title = ?, text = ?, background = ? WHERE id = ?', [title, text, background, id]);
        await pool.query('DELETE FROM tables WHERE card_id = ?', [id]);
        if (tables && tables.length) {
            for (let table of tables) {
                await pool.query('INSERT INTO tables (id, card_id, title) VALUES (?, ?, ?)', [table.id, id, table.title]);
                if (table.cards && table.cards.length) {
                    for (let card of table.cards) {
                        await pool.query('INSERT INTO table_cards (id, table_id, text) VALUES (?, ?, ?)', [card.id, table.id, card.text]);
                    }
                }
            }
        }
        return await db.getCard(id);
    },

    async deleteCard(id) {
        await pool.query('DELETE FROM cards WHERE id = ?', [id]);
    }
};

module.exports = db;