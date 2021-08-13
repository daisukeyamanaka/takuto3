// 初期画面起動時
// 初期変数定義
//

var turn = 0; // ターン 1:黒、-1:白
// 盤面の状況を二次元配列で定義
var ban_ar = new Array(8);
for (var x = 0; x < ban_ar.length; x++) {
  ban_ar[x] = new Array(8);
}

// HTMLで定義したテーブルを取得
var ban = document.getElementById("field");

// 取得したテーブルに盤面生成
ban_new();

// 盤面を初期化する
ban_init();

// クリックした時に実行されるイベント
for (var x = 0; x < 8; x++) {
  for (var y = 0; y < 8; y++) {
    var select_cell = ban.rows[x].cells[y];
    select_cell.onclick = function () {
      // クリックされた場所に石をおく
      ban_set1(this.parentNode.rowIndex, this.cellIndex);
      cheng_turn();
    };
  }
}
// テーブルで盤面を作成する処理
function ban_new() {
  for (var x = 0; x < 8; x++) {
    var tr = document.createElement("tr");
    ban.appendChild(tr);
    for (var y = 0; y < 8; y++) {
      var td = document.createElement("td");
      tr.appendChild(td);
    }
  }
}

// 盤面を初期化する処理
function ban_init() {
  // 全てをクリア
  const min = 0;
  const max = 8;
  const randomNumber = Math.floor(Math.random() * (max - min )) + min;
  const randomNumber1 = Math.floor(Math.random() * (max - min )) + min;
console.log(randomNumber);
console.log(randomNumber1);
  var Beam = "Beam";
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      ban_ar[x][y] = 0;
    }
  }
  ban_ar[randomNumber][randomNumber1] = Beam;
  // ターンも初期化
  turn = 0;
  cheng_turn();
  ban_set()
}
// 盤面状況(配列)を実際の盤面へ反映させる処理(初期化用)
function ban_set() {
  var stone = "";
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      switch (ban_ar[x][y]) {
        case 0:
          stone = "";
          break;
        case -1:
          stone = "○";
          break;
        case 1:
          stone = "●";
          break;
      }
      ban.rows[x].cells[y].innerText = stone;
    }
  }
  return true;
}
// 盤面状況(配列)を実際の盤面へ反映させる処理
function ban_set1(posion_x, posion_y) {
  var stone = "";
  //縦一列をクリック者の色に変更
  if (ban_ar[posion_x][posion_y] == "Beam"){
    startTimer()
    for (var x = 0; x < 8; x++) {
      ban_ar[x][posion_y] = turn;
    }
  }else {
    ban_ar[posion_x][posion_y] = turn;
  }

  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      switch (ban_ar[x][y]) {
        case 0:
          stone = "";
          break;
        case -1:
          stone = "○";
          break;
        case 1:
          stone = "●";
          break;
      }
      ban.rows[x].cells[y].innerText = stone;
    }
  }
  return true;
}

// ターンを変更する処理
function cheng_turn() {
  var tarn_msg = document.getElementById("view_tarn");
  if (turn == 0) {
    // 0は最初として、メッセージのみで処理終了
    turn = 1;
    tarn_msg.textContent = "黒の番です。";
    return;
  }
  // ターンを変更
  turn = turn * -1;
  // ターンを交代して、置けるところがあるか確認する
  // 現状の配置をバックアップ
  var ban_bak = new Array(8);
  for (var i = 0; i < ban_ar.length; i++) {
    ban_bak[i] = new Array(8);
  }
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      ban_bak[x][y] = ban_ar[x][y];
    }
  }
  var white_cnt = 0;
  var black_cnt = 0;
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      // 空白マスのみおけるのでチェック
      // それ以外は石の数を加算
      switch (ban_ar[x][y]) {
        case 0:
          // バックアップから元に戻す
          for (var i = 0; i < 8; i++) {
            for (var ii = 0; ii < 8; ii++) {
              ban_ar[i][ii] = ban_bak[i][ii];
            }
          }
          break;
        case -1:
          white_cnt++;
          break;
        case 1:
          black_cnt++;
          break;
      }
    }
  }

  // 白と黒の合計が8*8=64の場合は処理終了
  if (white_cnt + black_cnt == 64 ) {
    if (white_cnt == black_cnt) {
      alert("勝負は引分です。");
    } else if (white_cnt > black_cnt) {
      alert(
        "勝負は、黒：" +
          black_cnt +
          "対、白：" +
          white_cnt +
          "で、白の勝ちです。"
      );
    } else {
      alert(
        "勝負は、黒：" +
          black_cnt +
          "対、白：" +
          white_cnt +
          "で、黒の勝ちです。"
      );
    }
  }

  // ターンを表示する
  switch (turn) {
    case -1:
      tarn_msg.textContent = "白の番です。";
      break;
    case 1:
      tarn_msg.textContent = "黒の番です。";
      break;
  }
}
// タイマーの開始(タイムアウト後の処理も併せて記述)https://www.nishishi.com/javascript-tips/temp-box-settimeout.html
function startTimer() {
  //https://www.javadrive.jp/javascript/webpage/index4.html
  document.getElementById("video").style.display = "block";
  v.load();
  v.play();
  timerId = setTimeout (closeBox , 120000 );//二分
}
var v = document.getElementById("video");
function closeBox() {
  // 動画
  console.log("death");
  document.getElementById("video").style.display = "none";
  v.pause();
}