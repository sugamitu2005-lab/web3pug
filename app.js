const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// POSTデータを受け取るための設定
app.use(express.urlencoded({ extended: true }));

// Pug をテンプレートエンジンとして設定
app.set('view engine', 'pug');
app.set('views', './views');

// GET: フォーム表示
app.get('/', (req, res) => {
  res.render('index', { title: 'アンケートフォーム' });
});

// POST: フォーム送信を受け取る
app.post('/submit', (req, res) => {
  const { name, food } = req.body;
  res.render('result', { name, food });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
