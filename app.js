const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', //delete 
    database: 'DeCartography'
});

//error handle
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM addresses;',
    (error, results) => {
      res.render('index.ejs', {content: results});
    }
  );
});


app.get('/work', (req, res) => {
  connection.query(
    'SELECT * FROM addresses;',
    (error, results) => {
      res.render('work.ejs', {content: results});
    }
  );
});


function joinTarget(target) {
  return Array.isArray(target) ? target.join(',') : target;
}

//タグづけの更新作業のコードを以下に記述
app.post('/update/:id', (req, res) => {
  // 選択されたメモを更新する処理を書いてください
  connection.query(
    'UPDATE adresses SET tag = ? WHERE id = ?',
      [req.body.itemTag, req.params.id],
    (error, results) => {
      res.redirect('/work');
    }
    );
});


app.listen(3001);
