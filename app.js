const express = require('express');
const app = express();

// ★ ローカルでは 8000 番で動かす
const PORT = process.env.PORT || 8000;

// 静的ファイル（CSS）
app.use(express.static('public'));

// POSTデータ受け取り
app.use(express.urlencoded({ extended: true }));

// Pug設定
app.set('view engine', 'pug');
app.set('views', './views');

// メモリ上に回答を保存
const answers = [];

// GET: フォーム
app.get('/', (req, res) => {
  res.render('index', { title: 'アンケートフォーム', error: null });
});

// POST: 保存
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

// GET: 一覧
app.get('/list', (req, res) => {
  res.render('list', { answers });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
