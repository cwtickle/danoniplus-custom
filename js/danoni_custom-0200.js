'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * ver 0.71.0 以降向け (custom:Type2)
 * 
 * このファイルは、作品個別に設定できる項目となっています。
 * 譜面データ側で下記のように作品別の外部jsファイルを指定することで、
 * danoni_main.js の中身を変えることなく設定が可能です。
 * 
 * 設定例：
 * |customjs=danoni_custom-003.js,danoni_custom2.js|
 * 
 * ・グローバル変数、div要素、関数は danoni_main.js のものがそのまま利用できます。
 * ・danoni_main.jsの変数を直接書き換えると、動かなくなることがあります。
 * 　こまめのバックアップをおススメします。
 * ・ラベルなどのdiv要素を作る場合、「divRoot」の下にappendChild（div要素を追加）することで
 * 　画面遷移したときにきれいに消してくれます。
 * ・1つ目のcustom.jsとの違いは、関数名の末尾に"2"がついていることが異なります。
 * 
 */


/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
    // バージョン表記
    g_localVersion2 = "sp-2";
    
    g_headerObj.customTitleUse = `true`;

    var layer0 = document.getElementById("layer0");
    var l0ctx = layer0.getContext("2d");

    var grd = l0ctx.createLinearGradient(0, 0, g_sHeight, 0);
    if (g_headerObj["setColor"][0] != undefined) {
        grd.addColorStop(0, g_headerObj["setColor"][0]);
    } else {
        grd.addColorStop(0, "#ffffff");
    }
    if (g_headerObj["setColor"][2] != undefined) {
        grd.addColorStop(1, g_headerObj["setColor"][2]);
    } else {
        grd.addColorStop(1, "#66ffff");
    }

    createLabel(l0ctx, "Careless Prince Came Back", g_sWidth / 2, g_sHeight / 2 - 22,
        36, "メイリオ", grd, "center");
    createLabel(l0ctx, "from the Adventure - Web Style -", g_sWidth / 2, g_sHeight / 2 + 22,
        36, "メイリオ", grd, "center");
}

/**
 * オプション画面(初期表示) [Scene: Option / Lime]
 */
/*
function customOptionInit2() {

}
*/

/**
 * 表示変更(初期表示) [Scene: Settings-Display / Lemon]
 */
/*
function customSettingsDisplayInit2() {

}
*/

/**
 * キーコンフィグ画面(初期表示) [Scene: KeyConfig / Orange]
 */
/*
function customKeyConfigInit2() {

}
*/

/**
 * 譜面読込画面 [Scene: Loading / Strawberry]
 * - この画面のみ、画面表示がありません。
 * - 処理が完了すると、自動的にメイン画面へ遷移します。
 */
/*
function customLoadingInit2() {

}
*/

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
function customMainInit2() {

}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {

}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */

function customResultInit2() {
    const lblMusicData2 = document.getElementById("lblMusicData");
    lblMusicData2.innerHTML = "Careless Prince Came Back<br>from the Adventure - Web Style -";
}
