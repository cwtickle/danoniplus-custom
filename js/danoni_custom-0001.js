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
    if ((`5k-Easy` in g_localStorage.highscores && g_stateObj.d_special === C_FLG_OFF) ||
        g_stateObj.scoreId !== 0) {
        g_posObj.stepY = 70;
        g_posObj.stepDiffY = g_posObj.stepY - C_STEP_Y;
        g_posObj.distY = g_sHeight - C_STEP_Y + g_posObj.stepYR;
        g_posObj.reverseStepY = g_posObj.distY - g_posObj.stepY - g_posObj.stepDiffY - C_ARW_WIDTH;
        g_posObj.arrowHeight = g_sHeight + g_posObj.stepYR - g_posObj.stepDiffY * 2;

        g_lblNameObj.j_ii = "(・∀・)ｲｲ!!";
        g_lblNameObj.j_shakin = "(`・ω・)ｼｬｷﾝ";
        g_lblNameObj.j_matari = "( ´∀`)ﾏﾀｰﾘ";
        g_lblNameObj.j_shobon = "(´・ω・`)ｼｮﾎﾞｰﾝ";
        g_lblNameObj.j_uwan = "( `Д´)ｳﾜｧﾝ!!";
    } else {
        g_posObj.stepY = 120;
        g_posObj.stepDiffY = g_posObj.stepY - C_STEP_Y;
        g_posObj.distY = g_sHeight - C_STEP_Y + g_posObj.stepYR;
        g_posObj.reverseStepY = g_posObj.distY - g_posObj.stepY - g_posObj.stepDiffY - C_ARW_WIDTH;
        g_posObj.arrowHeight = g_sHeight + g_posObj.stepYR - g_posObj.stepDiffY * 2;

        g_lblNameObj.j_ii = "(・∀・)ｲｲ!!";
        g_lblNameObj.j_shakin = "(・∀・)ｲｲ!!";
        g_lblNameObj.j_matari = "( ´∀`)ﾏﾀｰﾘ";
        g_lblNameObj.j_shobon = "( `Д´)ｳﾜｧﾝ!!";
        g_lblNameObj.j_uwan = "( `Д´)ｳﾜｧﾝ!!";
    }
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

    if ((`5k-Easy` in g_localStorage.highscores && g_stateObj.d_special === C_FLG_OFF) ||
        g_stateObj.scoreId !== 0) {

    } else {

        if (g_scoreObj.baseFrame == 6902) {
            $id(`lifeBar`).filter = `grayscale(80%)`;
            $id(`charaJ`).filter = `grayscale(80%)`;
            $id(`comboJ`).filter = `grayscale(80%)`;
        } else if (g_scoreObj.baseFrame == 6989) {
            $id(`lifeBar`).filter = `grayscale(60%)`;
            $id(`charaJ`).filter = `grayscale(60%)`;
            $id(`comboJ`).filter = `grayscale(60%)`;
        } else if (g_scoreObj.baseFrame == 7164) {
            $id(`lifeBar`).filter = `grayscale(30%)`;
            $id(`charaJ`).filter = `grayscale(30%)`;
            $id(`comboJ`).filter = `grayscale(30%)`;
        } else if (g_scoreObj.baseFrame == 7251) {
            $id(`lifeBar`).filter = `grayscale(0%)`;
            $id(`charaJ`).filter = `grayscale(0%)`;
            $id(`comboJ`).filter = `grayscale(0%)`;
        }

    }
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {

}