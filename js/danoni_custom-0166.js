'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル (No.166 EXODUS on vocal ver.)
 * ver 0.71.0 以降向け
 * 
 * このファイルは、作品個別に設定できる項目となっています。
 * 譜面データ側で下記のように作品別の外部jsファイルを指定することで、
 * danoni_main.js の中身を変えることなく設定が可能です。
 * 
 * 設定例：
 * |customjs=danoni_custom-003.js|
 * 
 * ・グローバル変数、div要素、関数は danoni_main.js のものがそのまま利用できます。
 * ・danoni_main.jsの変数を直接書き換えると、動かなくなることがあります。
 * 　こまめのバックアップをおススメします。
 * ・ラベルなどのdiv要素を作る場合、「divRoot」の下にappendChild（div要素を追加）することで
 * 　画面遷移したときにきれいに消してくれます。
 */

let g_tmpCnt1 = 0;
let g_tmpCnt2 = 0;

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
/*
function customOptionInit2() {

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

    // ここにカスタム処理を記述する
    const keyCtrlPtn = `${g_keyObj.currentKey}_${g_keyObj.currentPtn}`;
    const keyNum = g_keyObj[`chara${keyCtrlPtn}`].length;

    const frameNum = g_scoreObj.frameNum;
    const preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    const actualFrame = frameNum - preblankFrame;

    g_tmpCnt1 = 0;
    g_tmpCnt2 = 0;

    if (actualFrame < 7523) {
        // 5key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                // 7keyを隠す
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }

    } else if (actualFrame < 13372) {
        // 7key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                // 5keyを隠す
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }

    } else if (actualFrame < 14811) {
        // 5key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                // 7keyを隠す
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }

    } else if (actualFrame < 16251) {
        // 7key左
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (j <= 4 || j >= 8) {
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }
    } else if (actualFrame < 17061) {
        // 4key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }
    } else if (actualFrame < 17690) {
        // 7key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                step.style.display = `none`;
                stepHit.style.display = `none`;
            } else if (g_stateObj.d_stepzone != C_FLG_OFF) {
                step.style.display = `inherit`;
                stepHit.style.display = `inherit`;
            }
        }

    } else {
        // 11key
        for (var j = 0; j < keyNum; j++) {

            const step = document.querySelector(`#step${j}`);
            const stepHit = document.querySelector(`#stepHit${j}`);

            if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
                step.style.display = `none`;
                stepHit.style.display = `none`;
            }
        }
    }
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {
    const keyCtrlPtn = `${g_keyObj.currentKey}_${g_keyObj.currentPtn}`;
    const keyNum = g_keyObj[`chara${keyCtrlPtn}`].length;

    const frameNum = g_scoreObj.frameNum;
    const preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
    const actualFrame = frameNum - preblankFrame;

    if (actualFrame <= 13383) {
        if (actualFrame < 7520) {
        } else if (actualFrame === 7520) {

            // 5key部消去＆7key表示
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                    displayInStep(j);
                }
            }
        } else if (actualFrame < 7529) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                    fadeInStep(j);
                } else if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                    fadeOutStep(j);
                }
            }
        } else if (actualFrame === 7529) {

            // 7key
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                    displayDefaultStep(j);
                } else if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                    displayOutStep(j);
                }
            }
        } else if (actualFrame < 13375) {
        } else if (actualFrame === 13375) {

            // 7key部消去＆5key表示
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                    displayInStep(j);
                }
            }
        } else if (actualFrame < 13383) {
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                    fadeOutStep(j);
                } else if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                    fadeInStep(j);
                }
            }
        } else if (actualFrame === 13383) {

            // 5key
            for (var j = 0; j < keyNum; j++) {
                if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                    displayOutStep(j);
                } else if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                    displayDefaultStep(j);
                }
            }
        }
    } else if (actualFrame < 14813) {
    } else if (actualFrame === 14813) {

        // 5key部消去＆7key左表示
        for (var j = 0; j < keyNum; j++) {
            if (j >= 5 && j <= 7) {
                displayInStep(j);
            }
        }

    } else if (actualFrame < 14822) {

        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
                fadeOutStep(j);
            } else if (j >= 5 && j <= 7) {
                fadeInStep(j);
            }
        }

    } else if (actualFrame === 14822) {

        // 7key左
        for (var j = 0; j < keyNum; j++) {
            if (j >= 5 && j <= 7) {
                displayDefaultStep(j);
            }
        }

    } else if (actualFrame < 16251) {
    } else if (actualFrame < 16259) {

        for (var j = 0; j < keyNum; j++) {
            if (j >= 5 && j <= 7) {
                fadeOutStep(j);
            }
        }
    } else if (actualFrame === 16259) {
        for (var j = 0; j < keyNum; j++) {
            if (j >= 5 && j <= 7) {
                displayOutStep(j);
            }
        }
    } else if (actualFrame < 16340) {
    } else if (actualFrame === 16340) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
                displayInStep(j);
            }
        }
    } else if (actualFrame < 16349) {

        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
                fadeInStep(j);
            }
        }
    } else if (actualFrame === 16349) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
                displayDefaultStep(j);
            }
        }
    } else if (actualFrame < 17061) {
    } else if (actualFrame === 17061) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                displayInStep(j);
            }
        }
    } else if (actualFrame < 17069) {

        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                fadeInStep(j);
            }
        }
    } else if (actualFrame === 17069) {
        for (var j = 0; j < keyNum; j++) {
            if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
                displayDefaultStep(j);
            }
        }
    }
}

function fadeOutStep(_pos) {
    const step = document.querySelector(`#step${_pos}`);
    const nextAlpha = parseFloat(step.style.opacity) - 0.125;
    step.style.opacity = nextAlpha;
}

function displayOutStep(_pos) {
    const step = document.querySelector(`#step${_pos}`);
    const stepHit = document.querySelector(`#stepHit${_pos}`);
    step.style.opacity = 1;
    step.style.display = "none";
    stepHit.style.display = "none";
}

function fadeInStep(_pos) {
    const step = document.querySelector(`#step${_pos}`);
    const nextAlpha = parseFloat(step.style.opacity) + 0.125;
    step.style.opacity = nextAlpha;
}

function displayInStep(_pos) {
    const step = document.querySelector(`#step${_pos}`);
    const stepHit = document.querySelector(`#stepHit${_pos}`);
    step.style.opacity = 0;
    if (g_stateObj.d_stepzone != C_FLG_OFF) {
        step.style.display = "inherit";
        stepHit.style.display = "inherit";
    }
}

function displayDefaultStep(_pos) {
    const step = document.querySelector(`#step${_pos}`);
    step.style.opacity = 1;
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
/*
function customResultInit2() {

}
*/