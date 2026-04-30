const mysql = require('mysql2');
require('dotenv').config();

// יצירת חיבור מסוג Pool - מומלץ כדי לנהל חיבורים מרובים ביעילות
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// שימוש בהבטחות (Promises) כדי שנוכל להשתמש ב- async/await
const promisePool = pool.promise();

// בדיקת התחברות ראשונית
promisePool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database smoothly!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });

module.exports = promisePool;