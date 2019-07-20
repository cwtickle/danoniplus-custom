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
    g_localVersion2 = "sp-4";
}

/**
 * オプション画面(初期表示) [Scene: Option / Lime]
 */
function customOptionInit2() {

}

/**
 * 表示変更(初期表示) [Scene: Settings-Display / Lemon]
 */
function customSettingsDisplayInit2() {

}

/**
 * キーコンフィグ画面(初期表示) [Scene: KeyConfig / Orange]
 */
function customKeyConfigInit2() {

}

/**
 * 譜面読込画面 [Scene: Loading / Strawberry]
 * - この画面のみ、画面表示がありません。
 * - 処理が完了すると、自動的にメイン画面へ遷移します。
 */
function customLoadingInit2() {

}

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
function customMainInit2() {
    var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

    var frameNum = g_scoreObj.frameNum;
    var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    var actualFrame = frameNum - preblankFrame;

    if (actualFrame < 864) {
        displayStartStep(g_workObj.replaceNums[0]);
        displayStartStep(g_workObj.replaceNums[1]);
        displayStartStep(g_workObj.replaceNums[5]);
        displayStartStep(g_workObj.replaceNums[6]);
    }
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {

    var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

    var frameNum = g_scoreObj.frameNum;
    var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    var actualFrame = frameNum - preblankFrame;

    if (actualFrame < 864) {
    } else if (actualFrame < 934) {
        fadeInStep(g_workObj.replaceNums[0]);
        fadeInStep(g_workObj.replaceNums[1]);
        fadeInStep(g_workObj.replaceNums[5]);
        fadeInStep(g_workObj.replaceNums[6]);
    } else if (actualFrame === 934) {
        displayDefaultStep(g_workObj.replaceNums[0]);
        displayDefaultStep(g_workObj.replaceNums[1]);
        displayDefaultStep(g_workObj.replaceNums[5]);
        displayDefaultStep(g_workObj.replaceNums[6]);
    } else if (actualFrame === 12106) {
        for (var j = 0; j < keyNum; j++) {
            displayStartStep(j);
        }
        document.getElementById("charaJ").innerHTML = "";
        document.getElementById("comboJ").innerHTML = "";
        document.getElementById("charaFJ").innerHTML = "";
        document.getElementById("comboFJ").innerHTML = "";
    }
}

function fadeOutStep(_pos) {
    var step = document.getElementById("step" + _pos);
    var nextAlpha = parseFloat(step.style.opacity) - 0.01;
    step.style.opacity = nextAlpha;
}

function displayOutStep(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 1;
    step.style.display = "none";
}

function fadeInStep(_pos) {
    var step = document.getElementById("step" + _pos);
    var nextAlpha = parseFloat(step.style.opacity) + 0.01;
    step.style.opacity = nextAlpha;
}

function displayInStep(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 0;
    if (g_stateObj.d_stepzone != C_FLG_OFF) {
        step.style.display = "inherit";
    }
}

function displayDefaultStep(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 1;
}

function displayStartStep(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 0.3;
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
/*
function customResultInit2() {

}
*/