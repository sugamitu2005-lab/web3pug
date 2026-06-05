const express = require('express');
const app = express();

// Render が指定する PORT を必ず使う
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

const answers = [];

app.get('/', (req, res) => {
  res.render('index', { title: 'アンケートフォーム', error: null });
});

app.post('/submit', (req, res) => {
  const { name, food } = req.body;

  if (!name || !food) {
    return res.render('index', {
      title: 'アンケートフォーム',
      error: '名前と好きな食べ物を入力してください。'
    });
  }

  answers.push({ name, food });

  res.render('result', { name, food });
});

app.get('/list', (req, res) => {
  res.render('list', { answers });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
