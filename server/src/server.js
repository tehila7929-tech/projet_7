const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ייבוא החיבור למסד הנתונים כדי לוודא שהוא עובד (למרות שעוד לא השתמשנו בו בנתיבים)
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // מאפשר קבלת בקשות מדומיינים אחרים (כמו ה-React שלך)
app.use(express.json()); // מאפשר לשרת להבין בקשות עם תוכן מסוג JSON

// נתיב בדיקה בסיסי כדי לוודא שהשרת עובד
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// כאן נוסיף בהמשך את הנתיבים שלנו, למשל:
// const userRoutes = require('./routes/users.routes');
// app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});