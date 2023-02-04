'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [No.39 Genic Trip]
 * 
 */

/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
    // バージョン表記
    g_localVersion2 = "sp-3";

    g_headerObj.customReadyUse = `true`;
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

}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {

    var frameNum = g_scoreObj.frameNum;
    var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    var actualFrame = frameNum - preblankFrame;

    if (actualFrame == 685) {
        var lblReady2 = createDivLabel("lblReady2", g_sWidth / 2 - 100, g_sHeight / 2 - 75,
            200, 50, 40, "#cccccc",
            "<span style='color:" + g_headerObj["setColor"][0] + ";font-size:60px;'>R</span>EADY<span style='font-size:50px;'>?</span>");
        divRoot.appendChild(lblReady2);
        lblReady2.style.animationDuration = "2.5s";
        lblReady2.style.animationName = "leftToRightFade";
        lblReady2.style.opacity = 0;
    }
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {

}