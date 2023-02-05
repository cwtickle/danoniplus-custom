`use strict`;
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [No.273 Defeat‚I Doll]
 * 
 * ・キー変化に対応した処理、キーコンフィグカスタム
 * ・キー変化情報（譜面データ）によるキーの切り替えに対応
 */

g_customJsObj.preTitle.push(_ => {
    // 部分キー選択する際のモード
    g_stateObj.keySwitch = 1;

    // キーコンフィグ画面で設定中のカスタムリスナー
    g_stateObj.currentListenerKey = ``;
});

/**
 * R-FlatをFlatと認識させるための処理
 */
const convertRevFlat = _ => {
    if (g_stateObj.scroll === `R-Flat`) {
        g_stateObj.scroll = `Flat`;
        g_stateObj.reverse = C_FLG_ON;
    }
};
const setRevFlat = _ => {
    if (g_stateObj.scroll === `Flat` && g_stateObj.reverse === C_FLG_ON) {
        g_stateObj.scroll = `R-Flat`;
        g_stateObj.reverse = C_FLG_OFF;
    }
};

/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
    // バージョン表記
    g_localVersion2 = `sp-3`;
    // R-Flatを戻す処理
    setRevFlat();
}

/**
 * キーコンフィグ画面(初期表示) [Scene: KeyConfig / Orange]
 * - この処理はキー変化譜面以外は不要（それ以外の項目は残しても支障なし）
 */
g_customJsObj.keyconfig.push(_ => {

    const charas = g_keyObj[`chara${g_headerObj.keyLabels[g_stateObj.scoreId]}_${g_keyObj.currentPtn}`];

    // 各種初期値取得（メインソースから複製）
    const tkObj = getKeyInfo();
    const [keyCtrlPtn, keyNum, posMax, divideCnt] =
        [tkObj.keyCtrlPtn, tkObj.keyNum, tkObj.posMax, tkObj.divideCnt];

    const keyconSprite = document.getElementById(`keyconSprite`);
    keyconSprite.style.transform = `scale(${g_keyObj.scale})`;
    const kWidth = parseInt(keyconSprite.style.width);

    const maxLeftPos = Math.max(divideCnt, posMax - divideCnt - 2) / 2;
    const maxLeftX = Math.min(0, (kWidth - C_ARW_WIDTH) / 2 - maxLeftPos * g_keyObj.blank);

    /**
     * keyconSpriteのスクロール位置調整（メインソースから複製、呼び出し用）
     * @param {number} _targetX 
     */
    const adjustScrollPoint = _targetX => {
        if (maxLeftX !== 0) {
            keyconSprite.scrollLeft = Math.max(0, _targetX - g_sWidth / 2);
        }
    };

    /**
     * カーソル位置の設定（メインソースから複製、呼び出し用）
     */
    const setKeyConfigCursor = _ => {
        let cursor = document.getElementById(`cursor`);

        const posj = g_keyObj[`pos${keyCtrlPtn}`][g_currentj];
        const stdPos = posj - ((posj > divideCnt ? posMax : 0) + divideCnt) / 2;

        const nextLeft = (kWidth - C_ARW_WIDTH) / 2 + g_keyObj.blank * stdPos - maxLeftX - 10;
        cursor.style.left = `${nextLeft}px`;
        const baseY = C_KYC_HEIGHT * Number(posj > divideCnt) + 57;
        cursor.style.top = `${baseY + C_KYC_REPHEIGHT * g_currentk}px`;
        if (g_currentk === 0 && g_kcType === `Replaced`) {
            g_kcType = C_FLG_ALL;
            lnkKcType.textContent = getStgDetailName(g_kcType);
        }

        // 次の位置が見えなくなったらkeyconSpriteの位置を調整する
        adjustScrollPoint(nextLeft);
    };

    /**
     * キーコンフィグ画面のカーソル制御
     * @param {array} _cursorNums 
     */
    const customKeyconfigCursor = _ => {

        /**
         * 表示した部分キーの中でカーソルが動くように制御
         */
        const changeConfigCursor = _ => {
            const cursorNums = g_stateObj.cursorNums;
            const num = cursorNums.findIndex(val => val === g_currentj);
            if (num === -1) {
                const prevNum = cursorNums.findIndex(val => val === g_currentj - 1);
                resetConfigCursor(cursorNums[(prevNum + 1) % cursorNums.length]);
            }
        };
        changeConfigCursor();

        // 多重にリスナーが起動されないよう既存のリスナーを削除
        if (g_stateObj.currentListenerKey !== ``) {
            g_handler.removeListener(g_stateObj.currentListenerKey);
        }
        g_stateObj.currentListenerKey = g_handler.addListener(window, `keydown`, _ => changeConfigCursor());

    };

    /**
     * カーソル位置のリセット
     * @param {number} _nextj 
     */
    const resetConfigCursor = _nextj => {
        g_currentj = _nextj;
        g_currentk = 0;
        if (g_kcType === `Replaced` && (g_keyObj[`keyCtrl${keyCtrlPtn}`][g_currentj][1] !== undefined)) {
            g_currentk = 1;
        }
        setKeyConfigCursor();
        keyconSprite.scrollLeft = - maxLeftX;
    };

    /**
     * 一部のキーコンフィグを表示する
     * （部分キー毎に接頭辞を決め、フィルターされたもののみを表示する）
     * @param {function} _func 
     */
    const appearConfigSteps = (_num, _func) => {

        g_stateObj.keySwitch = _num;
        const tmpCursorNums = [];
        charas.forEach((val, j) => {
            document.getElementById(`arrow${j}`).style.display = C_DIS_NONE;
            document.getElementById(`arrowShadow${j}`).style.display = C_DIS_NONE;
            document.getElementById(`sArrow${j}`).style.display = C_DIS_NONE;
            document.getElementById(`color${j}`).style.display = C_DIS_NONE;
            const ctrlPtn = g_keyObj[`keyCtrl${g_headerObj.keyLabels[g_stateObj.scoreId]}_${g_keyObj.currentPtn}`][j];
            for (let k = 0; k < ctrlPtn.length; k++) {
                document.getElementById(`keycon${j}_${k}`).style.display = C_DIS_NONE;
            }
        });
        charas.forEach((val, j) => {
            if (_func(val)) {
                tmpCursorNums.push(j);
                document.getElementById(`arrow${j}`).style.display = C_DIS_INHERIT;
                document.getElementById(`arrowShadow${j}`).style.display = C_DIS_INHERIT;
                document.getElementById(`sArrow${j}`).style.display = C_DIS_INHERIT;
                document.getElementById(`color${j}`).style.display = C_DIS_INHERIT;
                const ctrlPtn = g_keyObj[`keyCtrl${g_headerObj.keyLabels[g_stateObj.scoreId]}_${g_keyObj.currentPtn}`][j];
                for (let k = 0; k < ctrlPtn.length; k++) {
                    document.getElementById(`keycon${j}_${k}`).style.display = C_DIS_INHERIT;
                }
            }
        });
        g_stateObj.cursorNums = tmpCursorNums;
        customKeyconfigCursor();

        // keySwitchボタンを一旦非選択にして、選択中のものを再度色付け
        for (let j = 1; j <= Object.keys(viewKeys).length; j++) {
            document.getElementById(`key${j}`).classList.replace(g_cssObj.button_Next, g_cssObj.button_Mini);
        }
        document.getElementById(`key${_num}`).classList.replace(g_cssObj.button_Mini, g_cssObj.button_Next);
    };

    // キー数別表示切替ボタン（必要数だけ作る）
    // ・appearConfigStepsの第二引数には譜面本体の名称からキーを識別できる条件を指定
    //   この作品では`aleft, adown, ...` のように a始まりが5key、
    //   `bleft, bdown, ...` のように a始まりが7ikey としているため主に頭文字で判別
    multiAppend(divRoot,
        createDivCss2Label(`lblkey`, `KeySwitch`, { x: g_sWidth - 80, y: 90, w: 60, h: 20, siz: 14 }),
        createCss2Button(`key1`, `1`, _ => {
            appearConfigSteps(1, val => val.startsWith(`a`));
        }, { x: g_sWidth - 60, y: 110, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),

        createCss2Button(`key2`, `2`, _ => {
            appearConfigSteps(2, val => val.startsWith(`b`));
        }, { x: g_sWidth - 60, y: 130, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),

        createCss2Button(`key3`, `3`, _ => {
            appearConfigSteps(3, val => val.startsWith(`c`) || val.startsWith(`g`));
        }, { x: g_sWidth - 60, y: 150, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),

        createCss2Button(`key4`, `4`, _ => {
            appearConfigSteps(4, val => val.startsWith(`d`) || val.startsWith(`g`));
        }, { x: g_sWidth - 60, y: 170, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),

        createCss2Button(`key5`, `5`, _ => {
            appearConfigSteps(5, val => val.startsWith(`e`) || val.startsWith(`g`));
        }, { x: g_sWidth - 60, y: 190, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),

        createCss2Button(`key6`, `6`, _ => {
            appearConfigSteps(6, val => val.startsWith(`f`) || val.startsWith(`h`) || val === `oni`);
        }, { x: g_sWidth - 60, y: 210, w: 50, h: 20, siz: 14 }, g_cssObj.button_Mini),
    )

    // 初期表示
    document.getElementById(`key${g_stateObj.keySwitch}`).click();

    // 個別のResetボタン（部分キー毎にリセット）
    multiAppend(divRoot,
        createCss2Button(`btnReset2`, g_lblNameObj.b_reset, _ => {
            if (window.confirm(g_msgObj.keyResetConfirm)) {
                const keyCtrlPtn = `${g_keyObj.currentKey}_${g_keyObj.currentPtn}`;

                for (let m = 0; m < g_stateObj.cursorNums.length; m++) {
                    const j = g_stateObj.cursorNums[m];
                    for (let k = 0; k < g_keyObj[`keyCtrl${keyCtrlPtn}`][j].length; k++) {
                        g_keyObj[`keyCtrl${keyCtrlPtn}`][j][k] = setIntVal(g_keyObj[`keyCtrl${keyCtrlPtn}d`][j][k]);
                        document.querySelector(`#keycon${j}_${k}`).textContent = g_kCd[g_keyObj[`keyCtrl${keyCtrlPtn}`][j][k]];
                        changeConfigColor(document.querySelector(`#keycon${j}_${k}`), g_keyObj.currentPtn === -1 ? g_cssObj.keyconfig_Defaultkey : g_cssObj.title_base);
                    }
                }
                resetConfigCursor(g_stateObj.cursorNums[0]);
            }
        }, { x: g_sWidth - 60, y: 240, w: 50, h: 20, siz: 14 }, g_cssObj.button_Reset),
    );

});

/**
 * 譜面読込画面 [Scene: Loading / Strawberry]
 * - この画面のみ、画面表示がありません。
 * - 処理が完了すると、自動的にメイン画面へ遷移します。
 */
function customLoadingInit2() {

    // キー変化情報を取得、配列格納
    const keyChdata = g_rootObj[`keych${setScoreIdHeader(g_stateObj.scoreId, g_stateObj.scoreLockFlg)}_data`]?.split(`,`);
    g_scoreObj.keyChFrames = keyChdata.filter((val, j) => j % 2 === 0);
    g_scoreObj.keyChTarget = keyChdata.filter((val, j) => j % 2 === 1);

    g_scoreObj.keyChCnt = 0;

    // R-Flatの場合、Flatと認識させるため一時的に設定を変える
    convertRevFlat();
}

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
function customMainInit2() {
    const charas = g_keyObj[`chara${g_headerObj.keyLabels[g_stateObj.scoreId]}_${g_keyObj.currentPtn}`];
    charas.forEach((val, j) => hideStep(j));
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {
    while (g_scoreObj.baseFrame >= g_scoreObj.keyChFrames[g_scoreObj.keyChCnt]) {
        viewKeys[g_scoreObj.keyChTarget[g_scoreObj.keyChCnt]]();
        g_scoreObj.keyChCnt++;
    }
}

/**
 * 本体表示部分のステップゾーン表示制御
 * （ステップゾーンのみ表示・非表示）
 * @param {function} _func 
 */
const viewKeysCore = _func => {
    const charas = g_keyObj[`chara${g_headerObj.keyLabels[g_stateObj.scoreId]}_${g_keyObj.currentPtn}`];
    charas.forEach((val, j) => hideStep(j));
    charas.forEach((val, j) => {
        if (_func(val)) {
            appearStep(j);
        }
    });
};

/**
 * 各キー種のステップゾーン表示制御
 * ・引数には譜面本体の名称からキーを識別できる条件を指定
 *   この作品では `aleft, adown, ...` のように a始まりが5key、
 *   `bleft, bdown, ...` のように a始まりが7ikey としているため主に頭文字で判別
 */
const viewKeys = {
    '5': _ => viewKeysCore(val => val.startsWith(`a`)),
    '7i': _ => viewKeysCore(val => val.startsWith(`b`)),
    '11': _ => viewKeysCore(val => val.startsWith(`c`) || val.startsWith(`g`)),
    '11L': _ => viewKeysCore(val => val.startsWith(`d`) || val.startsWith(`g`)),
    '11W': _ => viewKeysCore(val => val.startsWith(`e`) || val.startsWith(`g`)),
    '12': _ => viewKeysCore(val => val.startsWith(`f`) || val.startsWith(`h`) || val === `oni`),
};

const hideStep = _j => {
    document.getElementById(`stepRoot${_j}`).style.display = C_DIS_NONE;
};

const appearStep = _j => {
    document.getElementById(`stepRoot${_j}`).style.display = C_DIS_INHERIT;
};
