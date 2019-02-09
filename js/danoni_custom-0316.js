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
    g_localVersion2 = "sp-1";
    document.body.style.backgroundColor = "#111100";
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
    // ここにカスタム処理を記述する
    var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

    var frameNum = g_scoreObj.frameNum;
    var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    var actualFrame = frameNum - preblankFrame;

    document.body.style.backgroundColor = "#111100";

    // ステップゾーン表示を変更
    if (actualFrame < 12017) {
        for (var j = 0; j < keyNum; j++) {
            initialAlpha(j);
            if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
                displayOutStep(j);
            }
        }
    }
    if (actualFrame >= 11399 && actualFrame < 14943) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
                displayOutStep(j);
            }
        }
    } else if (actualFrame >= 14943) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj["color" + keyCtrlPtn][j] == 2) {
                displayOutStep(j);
            }
        }
    }
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {
    var frameNum = g_scoreObj.frameNum;
    var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    var actualFrame = frameNum - preblankFrame;
    var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

    // ステップゾーン表示
    if (actualFrame < 11399) {

    } else if (actualFrame < 12017) {
        // 下段非表示化
        if (actualFrame < 11399 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
                    fadeOutStep(j);
                }
            }
        } else if (actualFrame == 11399 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
                    displayOutStep(j);
                }
            }
        }
    } else if (actualFrame < 14943) {
        // 上段AA表示
        if (actualFrame == 12017) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
                    displayInStep(j);
                }
            }
        }
        if (actualFrame <= 12017 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
                    fadeInStep(j);
                }
            }
        }
        if (actualFrame == 12719) {
            document.body.style.backgroundColor = "#222200";
        } else if (actualFrame == 13905) {
            document.body.style.backgroundColor = "#220011";
        }
    } else {
        // 下段表示（おにぎり除く）
        if (actualFrame == 14943) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
                    displayInStep(j);
                }
            }
            document.body.style.backgroundColor = "#000011";
        } else if (actualFrame <= 14943 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
                    fadeInStep(j);
                }
            }
        } else if (actualFrame < 16277) {

        } else if (actualFrame < 16277 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
                    fadeOutStep(j);
                }
            }
        } else if (actualFrame == 16277 + 80) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
                    displayOutStep(j);
                }
            }
        }
    }
}

function initialAlpha(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 1;
}

function fadeOutStep(_pos) {
    var step = document.getElementById("step" + _pos);
    var nextAlpha = parseFloat(step.style.opacity) - 0.0125;
    step.style.opacity = nextAlpha;
}

function displayOutStep(_pos) {
    var step = document.getElementById("step" + _pos);
    step.style.opacity = 1;
    step.style.display = "none";
}

function fadeInStep(_pos) {
    var step = document.getElementById("step" + _pos);
    var nextAlpha = parseFloat(step.style.opacity) + 0.0125;
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

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {

}