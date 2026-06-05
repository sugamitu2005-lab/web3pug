const express = require('express');
const app = express();

// Render が指定する PORT を必ず使う
const PORT = process.env.PORT || 10000;

// 静的ファイル（CSS）を読み込む
app.use(express.static('public'));

// POSTデータ受け取り
app.use(express.urlencoded({ extended: true }));

// Pug設定
app.set('view engine', 'pug');
app.set('views', './views');

// メモリ上に回答を保存（DBなし版）
const answers = [];

// GET: フォーム
app.get('/', (req, res) => {
  res.render('index', { title: 'アンケートフォーム', error: null });
});

// POST: 保存 + バリデーション
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

// GET: 一覧表示
app.get('/list', (req, res) => {
  res.render('list', { answers });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
