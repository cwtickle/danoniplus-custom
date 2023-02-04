'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [0350_FeelsHappiness]
 * 
 */


/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
    // バージョン表記
    g_localVersion2 = "sp-1";
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
    
    let keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    let keyNum = g_keyObj["chara" + keyCtrlPtn].length;
    if(g_scoreObj.baseFrame < 1526) {
    	for (var j = 0; j < keyNum; j++) {
    		const step = document.getElementById("step" + j);
    		step.style.opacity = 0.3;
        }
    }
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
//function customMainEnterFrame2() {
g_customJsObj.mainEnterFrame[1] = _ => {

    let keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
    let keyNum = g_keyObj["chara" + keyCtrlPtn].length;
    
    // ステップゾーン表示
    if (g_scoreObj.baseFrame < 1526) {

    } else if (g_scoreObj.baseFrame < 1626) {
    	for (var j = 0; j < keyNum; j++) {
    		const step = document.getElementById("step" + j);
    		step.style.opacity = parseFloat(step.style.opacity) + 0.007;
        }
    } else if (g_scoreObj.baseFrame === 1626) {
    	for (var j = 0; j < keyNum; j++) {
    		const step = document.getElementById("step" + j);
    		step.style.opacity = 1;
    	}
    }
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {

}