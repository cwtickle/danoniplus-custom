﻿`use strict`;
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * ver 2.9.0 以降向け (custom:Type2)
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
 * ローディング中処理
 * @param {event} _event ローディングプロパティ
 * 	_event.loaded 読込済バイト数
 * 	_event.total  読込総バイト数 
 */
function customLoadingProgress2(_event) {
    const divRoot = document.querySelector(`#divRoot`);
    const lblLoadingView = getTitleDivLabel(`lblLoadingTitle`,
        `<span style=font-size:30px>Last 
        <span style=color:#ff6666;font-size:50px>1</span>hour!</span>`
            .replace(/[\t\n]/g, ``), 5, g_sHeight / 2 - 50);
    divRoot.appendChild(lblLoadingView);
}

/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
    // バージョン表記
    g_localVersion2 = `sp-1`;
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

}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {

}

/**
 * 判定カスタム処理 (引数は共通で1つ保持)
 * @param {number} difFrame タイミング誤差(フレーム数)
 */
/*
// イイ
function customJudgeIi2(difFrame){

}

// シャキン
function customJudgeShakin2(difFrame){

}

// マターリ
function customJudgeMatari2(difFrame){

}

// ショボーン
function customJudgeShobon2(difFrame){

}

// ウワァン
function customJudgeUwan2(difFrame){

}

// キター
function customJudgeKita2(difFrame){

}

// イクナイ
function customJudgeIknai2(difFrame){

}
*/