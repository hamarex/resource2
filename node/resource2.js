//WebSocket Serverモジュールを読み込む
var WsServer = require('ws').Server;
//port: 3001でリッスンするサーバーを作成する
var ws = new WsServer({ port: 3002 });
//タイマーID
var tid;
var os =require('os') ;
var exec = require('child_process').exec, cmd;

broadCast();//データ配信開始

function broadCast(){
  //0.1秒ごとにデータを送信する
  tid = setInterval (function(){
    //データを作る
    var dataAry = mkData();
    //すべてのクライアントへ送信する
    ws.clients.forEach(function(client) { 
      client.send(JSON.stringify(dataAry));
    });
  }, 500);
}

// 送信用ランダムデータを作成する(実際には必要なデータを与える)
function mkData(){
  //送信データ形式の雛形
  var data = [
      ["時間"],
      ["load1"],
      ["load5"],
      ["load15"],
    ];

   var a = [
      ["l1"],
      ["l5"],
      ["l15"],
     ];

  //時間の文字列を作成する
  var now = new Date();
  var H = now.getHours();
  var M = now.getMinutes();
  var S = now.getSeconds();
  H = (H < 10)?'0'+H:H;
  M = (M < 10)?'0'+M:M;
  S = (S < 10)?'0'+S:S;
  
  //送信データを作成する
  data[0]=H +':' + M +':' + S;
  a = os.loadavg();
  data[1]=a[0].toFixed(1);
  data[2]=a[1].toFixed(1);
  data[3]=a[2].toFixed(1);
  return data;
} 
