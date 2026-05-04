const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors()); // זה יאפשר לכל כתובת לגשת לשרת

// ייבוא הראוטים מהתיקייה src/routes
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const todosRoutes = require('./routes/todosRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

// מידלוור לקריאת JSON - הכרחי כדי שתוכל לקבל נתונים ב-body של הבקשה
app.use(express.json());

// הגדרת נתיבי הבסיס לכל משאב
// לפי מה שדיברנו, נשתמש בתחילית /api כדי לשמור על סדר
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);
app.use('/comments', commentsRoutes);

// נתיב בדיקה כללי כדי לוודא שהשרת רץ
app.get('/health', (req, res) => {
    res.send("השרת פועל בהצלחה!");
});

// טיפול בשגיאת 404 (נתיב לא נמצא)
app.use((req, res) => {
    res.status(404).json({ message: "הנתיב המבוקש לא נמצא בשרת" });
});

// הגדרת הפורט והרצת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
