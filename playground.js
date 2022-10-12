const readlineSync = require('readline-sync'); //こっちに変更で動くはず


//ターミナル文字制御用
var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';

var reset   = '\u001b[0m';


//一時的にターミナルから読み込むのに必要
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//まずはアドレスの一覧がセットされる
let adresses = [
    ['0xF60fB76e6AD89364Af3ffE72C447882bFe390331', "none"],
    ['0x285b7EEa81a5B66B62e7276a24c1e0F83F7409c1', "none"],
    ['0x65150B5Fa861481651225Ef4412136DCBf696232', "none"],
    ['0x5A384227B65FA093DEC03Ec34e111Db80A040615', "none"],
    ['0x199012076Ea09f92D8C30C494E94738CFF449f57', "none"]
];

let count = 0;//現状回った回数を把握するのに必要

// とりあえず表示させてみようかな
console.log("あなたが分析してもらう対象は以下になります。\n")
console.table(adresses);

//addressの数が条件に達するまで、以下のプロセスを実行する
while (count < adresses.length) {
    console.log("次のうち、表示されたウォレットアドレスはどれに該当しそうですか？\n\次のa~dで回答してください\n\na: NFT\nb: DeFi\nc: Game\nd: Public Goods\n");

    // その後、各アドレスを順番に確認して選択するモードに入る
    console.log("https://etherscan.io/address/" + adresses[count][0] + "\n");

    //選択肢の中から選んで、仮に要素を書き換える
    let target = adresses[count]
    choicefromtags(target);
    count++;
}

function choicefromtags(target) {
    let tag = ['NFT', 'DeFi', 'Game', 'Public Goods'];
    let answer = readlineSync.keyInSelect(tag, 'どれに該当しますか \n');
    console.log(red + `${tag[answer]}ですね！\n` + reset);
    console.log(green + "--------------------------\n" + reset);
    adresses[count] = tag[answer];//ここで代入
}


// 結果を表示
console.log("分析した結果を表示します\n")
console.log(adresses);