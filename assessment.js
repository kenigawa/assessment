"use strict";

const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/*
指定した要素の子供を全て削除する
@param {HTMLElement} element HTML要素
*/
function removeAllChildren(element){
    while(element.firstChild){  //子要素がある限り削除する
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = function(){  //診断ボタンを押した際の処理
// assessmentButton.onclick = () => {  アロー関数でも記述可

    const userName = userNameInput.value;   //入力された名前を取得

    if(userName.length === 0){  //名前が空の時
        return; //処理を終了させる
    }

    //診断結果表示エリア
    removeAllChildren(resultDivided);
    const header = document.createElement("h3");    //h3タグを作成
    header.innerText = "診断結果";  //文字を埋め込む
    resultDivided.appendChild(header);  //result-areaに追加する

    const paragraph = document.createElement("p");  //pタグを作成
    const result = assessment(userName);    //結果を取得
    paragraph.innerText = result;       //結果をpタグに埋め込む
    resultDivided.appendChild(paragraph);   //result-areaに追加する
            
    //ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement("a");
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたの良いところ') + '&ref_src=twsrc%5Etfw';
            
    anchor.setAttribute('href', hrefValue);     //hrefとしてhrefValueを代入
    anchor.className = 'twitter-hashtag-button;';   //class名をつける
    anchor.setAttribute('data-text', result);     //data-textとしてresult(診断結果)を代入
    anchor.innerText = 'Tweet #あなたの良いところ';     //文章を埋め込む
            
    tweetDivided.appendChild(anchor);   //tweetDividedにanchor(aタグ内)を代入
            
    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
            
            
};
            
userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/*
名前の文字列を渡すと診断結果を返す関数
@param {string} userName    ユーザー名
@return {string} 診断結果  
*/
function assessment(userName){

    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);    //charCodeAt 文字列の中から指定の位置にある文字の文字コードを返します
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を決める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];  //回答が決まる

    result = result.replace(/\{userName\}/g, userName);     //正規表現
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
