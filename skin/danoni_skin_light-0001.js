`use strict`;
/**
 * Dancing☆Onigiri スキンjsファイル
 */

/**
 * タイトル画面 [Scene: Title / Melon]
 */
function skinTitleInit() {

    // 背景矢印
    // $id(`lblArrow`).left = `0px`;

    g_headerObj.setColorType1 = [`#6666ff`, `#66cccc`, `#000000`, `#999966`, `#cc6600`];
    g_headerObj.setColorType2 = [`#000000`, `#6666ff`, `#cc0000`, `#cc99cc`, `#cc3366`];
    g_headerObj.frzColorType1 = [[`#66ffff`, `#6600ff`, `#cccc33`, `#999933`],
    [`#00ffcc`, `#339999`, `#cccc33`, `#999933`],
    [`#66ffff`, `#6600ff`, `#cccc33`, `#999933`],
    [`#cc99ff`, `#9966ff`, `#cccc33`, `#999933`],
    [`#ff99cc`, `#ff6699`, `#cccc33`, `#999933`]];
    g_headerObj.frzColorType2 = [[`#cccccc`, `#999999`, `#cccc33`, `#999933`],
    [`#66ffff`, `#6600ff`, `#cccc33`, `#999933`],
    [`#66ffff`, `#6600ff`, `#cccc33`, `#999933`],
    [`#cc99cc`, `#ff99ff`, `#cccc33`, `#999933`],
    [`#ff6666`, `#ff9999`, `#cccc33`, `#999933`]];

    if (`5k-Easy` in g_localStorage.highscores) {

        if (g_rootObj.comment !== undefined) {
            let tmpComment = g_rootObj.comment.split(`\r\n`).join(`\n`);
            tmpComment = escapeHtmlForEnabledTag(tmpComment.split(`\n`).join(`<br>`));

            const lblComment = createDivCssLabel(`lblComment`, 0, 70, 600, 300, 14, tmpComment);
            lblComment.style.textAlign = C_ALIGN_LEFT;
            lblComment.style.overflow = `auto`;
            lblComment.style.background = `#333333`;
            lblComment.style.color = `#cccccc`;
            lblComment.style.display = C_DIS_NONE;
            divRoot.appendChild(lblComment);

            const btnMake = createCssButton({
                id: `btnComment`,
                name: `Comment`,
                x: g_sWidth - 180,
                y: (g_sHeight / 2) + 150,
                width: 150,
                height: 50,
                fontsize: 20,
                align: C_ALIGN_CENTER,
                class: `button_Default`,
            }, _ => {
                const lblCommentDef = document.querySelector(`#lblComment`);
                if (lblCommentDef.style.display !== C_DIS_NONE) {
                    lblCommentDef.style.display = C_DIS_NONE;
                } else {
                    lblCommentDef.style.display = C_DIS_INHERIT;
                }
            });
            btnMake.style.color = `#333333`;
            btnMake.style.border = `solid 1px #999999`;
            divRoot.appendChild(btnMake);
        }

    } else {

        $id(`lblTitle`).display = C_DIS_NONE;
        $id(`lblArrow`).display = C_DIS_NONE;
        $id(`lblmusicTitle`).display = C_DIS_NONE;
        $id(`btnReload`).display = C_DIS_NONE;
        $id(`btnReset`).display = C_DIS_NONE;
        $id(`lnkMaker`).display = C_DIS_NONE;
        $id(`lnkArtist`).display = C_DIS_NONE;
        $id(`lnkVersion`).display = C_DIS_NONE;
        $id(`lnkComparison`).display = C_DIS_NONE;

        $id(`divBack`).background = `#000000`;
        $id(`btnStart`).top = `${(g_sHeight - 350) / 2}px`;
        $id(`btnStart`).left = `${(g_sWidth - 350) / 2}px`;
        $id(`btnStart`).width = `350px`;
        $id(`btnStart`).height = `350px`;

        if (g_loadObj.coverOpenFlg === undefined) {
            const btnStartpre = createCssButton({
                id: `btnStartpre`,
                name: `<span style="font-size:25px">／■＼<br></span><span style="font-size:30px">( \´∀\` )<br></span>クリックして Dancing Onigiri を有効にします`,
                x: (g_sWidth - 350) / 2,
                y: (g_sHeight - 350) / 2,
                width: 350,
                height: 350,
                fontsize: 14,
                align: C_ALIGN_CENTER,
                class: `button_Default2`,
            }, _ => {
                if (window.confirm(`この作品の起動を許可`)) {
                    btnStartpre.style.display = C_DIS_NONE;
                }

                document.onkeydown = evt => {
                    const setKey = transCode(evt.code);
                    if (setKey === `Enter`) {
                        clearTimeout(g_timeoutEvtTitleId);
                        clearWindow();
                        optionInit();
                    }
                    return blockCode(setKey);
                }
            });
            btnStartpre.style.color = `#999999`;
            divRoot.appendChild(btnStartpre);

            document.onkeydown = evt => { };
        }

    }

}

/**
 * オプション画面(初期表示) [Scene: Option / Lime]
 */
function skinOptionInit() {

    if (`5k-Easy` in g_localStorage.highscores || g_stateObj.scoreId !== 0) {

        const lblm = createDivCssLabel(`lblm`, 0, g_sHeight - 45, g_sWidth, 45, 16,
            `1譜面目は Special: OFFで通常画面でのプレイが可能です。`);
        divRoot.appendChild(lblm);

    } else {

        const lblTitle2 = getTitleDivLabel(`lblTitle2`,
            `<div class="settings_Title">DANCING</div>
		<div class="settings_TitleStar">☆</div>
		<div class="settings_Title2">ONIGIRI</div>`
                .replace(/[\t\n]/g, ``), 0, 95);
        lblTitle2.classList.add(g_cssObj.flex_centering);
        divRoot.appendChild(lblTitle2);

        const lblTitle3 = getTitleDivLabel(`lblTitle3`,
            `positive 3rd [Short Edit] / Cranky`.replace(/[\t\n]/g, ``), 0, 160);
        lblTitle3.style.fontSize = `18px`;
        lblTitle3.classList.add(g_cssObj.flex_centering);
        divRoot.appendChild(lblTitle3);

        $id(`divBack`).background = `#000000`;
        const tmpBack = createDivCssLabel(`tmpBack`, (g_sWidth - 350) / 2, (g_sHeight - 350) / 2, 350, 350, 20, ``);
        tmpBack.style.background = ` #ffffff`;
        document.querySelector(`#divBack`).appendChild(tmpBack);

        $id(`lblTitle`).display = C_DIS_NONE;
        $id(`btnBack`).display = C_DIS_NONE;
        $id(`btnSave`).display = C_DIS_NONE;
        $id(`btnKeyConfig`).display = C_DIS_NONE;
        $id(`difficultySprite`).display = C_DIS_NONE;
        $id(`speedSprite`).display = C_DIS_NONE;
        $id(`motionSprite`).display = C_DIS_NONE;
        $id(`scrollSprite`).display = C_DIS_NONE;
        $id(`reverseSprite`).display = C_DIS_NONE;
        $id(`shuffleSprite`).display = C_DIS_NONE;
        $id(`autoPlaySprite`).display = C_DIS_NONE;
        $id(`gaugeSprite`).display = C_DIS_NONE;
        $id(`fadeinSprite`).display = C_DIS_NONE;
        $id(`btnDisplay`).display = C_DIS_NONE;

        $id(`adjustmentSprite`).top = `175px`;
        $id(`volumeSprite`).top = `200px`;

        $id(`lblAdjustment`).left = `30px`;
        $id(`lblVolume`).left = `30px`;

        $id(`lnkAdjustmentL`).width = `30px`;
        $id(`lnkAdjustmentL`).left = `160px`;
        $id(`lnkAdjustmentLL`).width = `30px`;
        $id(`lnkAdjustmentLL`).left = `190px`;

        $id(`lnkAdjustment`).width = `100px`;
        $id(`lnkAdjustment`).left = `210px`;
        $id(`lnkAdjustmentRR`).width = `30px`;
        $id(`lnkAdjustmentRR`).left = `300px`;
        $id(`lnkAdjustmentR`).width = `30px`;
        $id(`lnkAdjustmentR`).left = `330px`;

        $id(`lnkVolumeL`).width = `30px`;
        $id(`lnkVolumeL`).left = `160px`;

        $id(`lnkVolume`).width = `150px`;
        $id(`lnkVolume`).left = `185px`;
        $id(`lnkVolumeR`).width = `30px`;
        $id(`lnkVolumeR`).left = `330px`;

        $id(`btnPlay`).left = `${(g_sWidth - 350) / 2}px`;
        $id(`btnPlay`).top = `320px`;
        $id(`btnPlay`).width = `350px`;

        $id(`adjustmentSprite`).filter = `grayscale(100%)`;
        $id(`volumeSprite`).filter = `grayscale(100%)`;
        $id(`btnPlay`).filter = `grayscale(100%)`;
    }

}

/**
 * 表示変更(初期表示) [Scene: Settings-Display / Lemon]
 */
function skinSettingsDisplayInit() {

}

/**
 * 
 */
function customLoadingProgress2(_event) {
    if ((`5k-Easy` in g_localStorage.highscores && g_stateObj.d_special === C_FLG_OFF) ||
        g_stateObj.scoreId !== 0) {

    } else {
        if (document.querySelector(`#tmpBack`) === undefined) {
            $id(`divBack`).background = `#000000`;
            const tmpBack = createDivCssLabel(`tmpBack`, (g_sWidth - 350) / 2, (g_sHeight - 350) / 2, 350, 350, 20, ``);
            tmpBack.style.background = ` #ffffff`;
            document.querySelector(`#divBack`).appendChild(tmpBack);
        }
    }
}

/**
 * キーコンフィグ画面(初期表示) [Scene: KeyConfig / Orange]
 */
function skinKeyConfigInit() {

}

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
function skinMainInit() {

    if ((`5k-Easy` in g_localStorage.highscores && g_stateObj.d_special === C_FLG_OFF) ||
        g_stateObj.scoreId !== 0) {

    } else {
        g_loadObj.coverOpenFlg = true;
        $id(`divBack`).background = `#000000`;
        const tmpBack = createDivCssLabel(`tmpBack`, (g_sWidth - 350) / 2, (g_sHeight - 350) / 2, 350, 350, 20, ``);
        tmpBack.style.background = ` #ffffff`;
        document.querySelector(`#divBack`).appendChild(tmpBack);

        $id(`infoSprite`).transform = `rotate(90deg) scale(0.75, 0.6)`;
        $id(`infoSprite`).left = `-40px`;
        $id(`infoSprite`).top = `85px`;
        $id(`lblLife`).display = C_DIS_NONE;
        $id(`lifeBackObj`).display = C_DIS_NONE;
        $id(`lblCredit`).display = C_DIS_NONE;
        $id(`lblTime1`).display = C_DIS_NONE;
        $id(`lblTime2`).display = C_DIS_NONE;
        $id(`lifeBar`).filter = `grayscale(100%)`;
        $id(`lifeBar`).width = `25px`;

        $id(`lblReady`).top = `200px`;
        $id(`charaJ`).left = `225px`;
        $id(`charaJ`).top = `220px`;
        $id(`charaJ`).fontSize = `20px`;
        $id(`charaJ`).filter = `grayscale(100%)`;
        $id(`comboJ`).left = `225px`;
        $id(`comboJ`).top = `260px`;
        $id(`comboJ`).fontSize = `30px`;
        $id(`comboJ`).filter = `grayscale(100%)`;

        for (let j = 0; j < 5; j++) {
            $id(`stepDiv${j}`).filter = `grayscale(100%)`;
            $id(`stepHit${j}`).filter = `grayscale(100%)`;

            // ステップゾーンもどき
            const step = createColorObject(`stepD${j}`, `#cccccc`,
                g_workObj.stepX[j], g_posObj.stepY + C_STEP_Y + g_posObj.reverseStepY + 25,
                C_ARW_WIDTH, C_ARW_WIDTH, g_workObj.stepRtn[j], `Step`);
            step.classList.add(g_cssObj.main_stepDefault);
            divRoot.appendChild(step);
        }

        const btnMake = createCssButton({
            id: `btnMake`,
            name: `MAKE矢印`,
            x: g_sWidth - 110,
            y: (g_sHeight / 2) + 50,
            width: 150,
            height: 50,
            fontsize: 20,
            align: C_ALIGN_CENTER,
            class: `button_Default3`,
        }, _ => {
            const lblCodeDef = document.querySelector(`#lblCode`);
            if (lblCodeDef.style.display !== C_DIS_NONE) {
                lblCodeDef.style.display = C_DIS_NONE;
            } else {
                lblCodeDef.style.display = C_DIS_INHERIT;
            }
        });
        btnMake.style.color = `#999999`;
        btnMake.style.border = `solid 1px #999999`;
        divRoot.appendChild(btnMake);

        const lblCode = createDivCssLabel(`lblCode`, 0, 270, 300, 150, 8,
            `onClipEvent (load) {
//========カッコの中にタイムラインの数字を入れる。数字と数字の間はカンマ「,」で区切る。==================
	
     left_timeline = [162,333,450];   //左矢印の出現タイムライン(左の数字は例なので消していいです。)
	 right_timeline = [];                 //右矢印の出現タイムライン
	 up_timeline = [];                    //上矢印の出現タイムライン
	 down_timeline = [];                 //下矢印の出現タイムライン
	 space_timeline =[];            //スペース(顔)ボタンの出現タイムライン
	 
//==========記入するのはここまで。======================================================
	
   Cnt = 1;
   v=0;w=0;x=0;y=0;z=0;    
   _global.all = 15 * ( left_timeline.length + right_timeline.length + up_timeline.length + down_timeline.length  +  space_timeline.length );            
 
function make_left() {
	Cnt++;
	if(Cnt >= 500){
	Cnt = 1;
	}
	var newArrowName = "leftMC" + Cnt;
	_parent.leftMC.duplicateMovieClip(newArrowName, Cnt);
	_parent[newArrowName].onEnterFrame = this.move1;
	_parent[newArrowName]._x = 40;
	_parent[newArrowName]._y = 370;
}

function make_right() {
	Cnt++;
	if(Cnt >= 500){
	Cnt = 1;
	}
	var newArrowName = "rightMC" + Cnt;
	_parent.rightMC.duplicateMovieClip(newArrowName, Cnt);
	_parent[newArrowName].onEnterFrame = this.move1;
	_parent[newArrowName]._x = 220;
	_parent[newArrowName]._y = 370;
}

function make_up() {
	Cnt++;
	if(Cnt >= 500){
	Cnt = 1;
	}
	var newArrowName = "upMC" + Cnt;
	_parent.upMC.duplicateMovieClip(newArrowName, Cnt);
	_parent[newArrowName].onEnterFrame = this.move1;
	_parent[newArrowName]._x = 100;
	_parent[newArrowName]._y = 370;
}

function make_down() {
	Cnt++;
	if(Cnt >= 500){
	Cnt = 1;
	}
	var newArrowName = "downMC" + Cnt;
	_parent.downMC.duplicateMovieClip(newArrowName, Cnt);
	_parent[newArrowName].onEnterFrame = this.move1;
	_parent[newArrowName]._x = 160;
	_parent[newArrowName]._y = 370;
}

function make_space() {    
	Cnt++;
	if(Cnt >= 500){
	Cnt = 1;
	}
	var newArrowName = "spaceMC" + Cnt;
	_parent.spaceMC.duplicateMovieClip(newArrowName, Cnt);
	_parent[newArrowName].onEnterFrame = this.move1;
	_parent[newArrowName]._x = 260;
	_parent[newArrowName]._y = 370;
}

function move1() {
	this._y -= 2 ;
	if(this._y < - 10){
	   _parent.effect.gotoAndPlay(230);   
	   _global.uwan++;
	   _global.life--;
	   if(_global.life < 0){
		   _root.gotoAndStop("gameover",1);
	   }
	   _global.combo = 0;
		this.removeMovieClip();
	} 
}}

onClipEvent (enterFrame) {
		if(_parent._currentframe == left_timeline[v] - 150){
		this.make_left();
		v++;
		}
		if(_parent._currentframe == right_timeline[w] - 150){
		this.make_right();
		w++;
		}
		if(_parent._currentframe == up_timeline[x] - 150){
		this.make_up();
		x++;
		}
		if(_parent._currentframe == down_timeline[y] - 150){
		this.make_down();
		y++;
		}
		if(_parent._currentframe == space_timeline[z] - 150){
		this.make_space();
		z++;
		}
}`.split(`\n`).join(`<br>`));
        lblCode.style.color = `#ffffff`;
        lblCode.style.background = `#333333`;
        lblCode.style.overflow = `auto`;
        lblCode.style.textAlign = C_ALIGN_LEFT;
        lblCode.style.display = C_DIS_NONE;
        divRoot.appendChild(lblCode);

        const lbl0 = createDivCssLabel(`lbl0`, g_sWidth / 2 + 180, g_sHeight / 2 - 195, 40, 20, 16, `-10`);
        lbl0.style.color = `#cccccc`;
        divRoot.appendChild(lbl0);

        const lbl70 = createDivCssLabel(`lbl70`, g_sWidth / 2 + 180, g_sHeight / 2 - 115, 40, 20, 16, `70`);
        lbl70.style.color = `#cccccc`;
        divRoot.appendChild(lbl70);

        const lbl350 = createDivCssLabel(`lbl350`, g_sWidth / 2 + 180, g_sHeight / 2 + 165, 40, 20, 16, `350`);
        lbl350.style.color = `#cccccc`;
        divRoot.appendChild(lbl350);

        const lbl370 = createDivCssLabel(`lbl370`, g_sWidth / 2 + 180, g_sHeight / 2 + 190, 40, 20, 16, `370`);
        lbl370.style.color = `#cccccc`;
        divRoot.appendChild(lbl370);
    }
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function skinResultInit() {
    if ((`5k-Easy` in g_localStorage.highscores && g_stateObj.d_special === C_FLG_OFF) ||
        g_stateObj.scoreId !== 0) {

    } else {
        $id(`divBack`).background = `#000000`;
        const tmpBack = createDivCssLabel(`tmpBack`, (g_sWidth - 350) / 2, (g_sHeight - 350) / 2, 350, 350, 20, ``);
        tmpBack.style.background = ` #ffffff`;
        document.querySelector(`#divBack`).appendChild(tmpBack);

        $id(`lblTitle`).display = C_DIS_NONE;
        $id(`lblResultPre`).display = C_DIS_NONE;
        $id(`lblResultPre2`).display = C_DIS_NONE;
        $id(`resultWindow`).display = C_DIS_NONE;
        $id(`playDataWindow`).display = C_DIS_NONE;
        $id(`btnRetry`).display = C_DIS_NONE;

        if (g_gameOverFlg) {

            const btnStartpre = createCssButton({
                id: `btnStartpre2`,
                name: `FAILED...`,
                x: (g_sWidth - 350) / 2,
                y: (g_sHeight - 350) / 2,
                width: 350,
                height: 350,
                fontsize: 50,
                align: C_ALIGN_CENTER,
                class: `button_Default3`,
            }, _ => {
                // タイトル画面へ戻る
                if (g_finishFlg) {
                    g_audio.pause();
                }
                clearTimeout(g_timeoutEvtId);
                clearTimeout(g_timeoutEvtResultId);
                clearWindow();
                titleInit();
            });
            btnStartpre.style.color = `#999999`;
            divRoot.appendChild(btnStartpre);

            const lbl = createDivCssLabel(`lblorz`, 370, 280, 50, 50, 30, `orz`);
            divRoot.appendChild(lbl);

            $id(`btnBack`).display = C_DIS_NONE;
            $id(`btnCopy`).display = C_DIS_NONE;
            $id(`btnTweet`).display = C_DIS_NONE;
            $id(`btnGitter`).display = C_DIS_NONE;

        } else {
            $id(`btnBack`).left = `162.5px`;
            $id(`btnBack`).width = `175px`;
            $id(`btnBack`).height = `80px`;
            $id(`btnBack`).top = `375px`;
            $id(`btnCopy`).left = `337.5px`;
            $id(`btnCopy`).width = `175px`;
            $id(`btnCopy`).top = `375px`;
            $id(`btnTweet`).left = `337.5px`;
            $id(`btnTweet`).width = `175px`;
            $id(`btnTweet`).top = `406.25px`;
            $id(`btnGitter`).width = `175px`;
            $id(`btnRetry`).display = C_DIS_NONE;

            let rankMark = ``;
            const scoreTmp = Object.keys(g_pointAllocation).reduce(
                (score, name) => score + g_resultObj[name] * g_pointAllocation[name]
                , 0)
            const allScore = (g_allArrow + g_allFrz / 2) * 10;
            const resultScore = Math.round(scoreTmp / allScore * g_maxScore) || 0;

            let rankPos = g_rankObj.rankRate.length;
            for (let j = 0, len = g_rankObj.rankRate.length; j < len; j++) {
                rankPos = len;
                if (resultScore * 100 / g_maxScore >= g_rankObj.rankRate[j]) {
                    rankMark = g_rankObj.rankMarks[j];
                    rankColor = g_rankObj.rankColor[j];
                    break;
                }
            }
            if (resultScore * 100 / g_maxScore < g_rankObj.rankRate[rankPos - 1]) {
                rankMark = g_rankObj.rankMarkC;
                rankColor = g_rankObj.rankColorC;
            }

            const lblTitle2 = getTitleDivLabel(`lblTitle2`,
                `<div class="settings_Title3">RESULT</div>`
                    .replace(/[\t\n]/g, ``), -80, 75);
            lblTitle2.classList.add(g_cssObj.flex_centering);
            lblTitle2.style.fontSize = `40px`;
            divRoot.appendChild(lblTitle2);

            const lbl = createDivCssLabel(`resultLbl`, 175, 200, 200, 200, 20, `${g_lblNameObj.j_ii}<br>${g_lblNameObj.j_matari}<br>${g_lblNameObj.j_uwan}<br>MAX COMBO<br><br>SCORE`);
            lbl.style.textAlign = C_ALIGN_LEFT;
            lbl.style.pointerEvents = C_DIS_NONE;
            divRoot.appendChild(lbl);
            const cnt = createDivCssLabel(`resultCnt`, 275, 200, 150, 200, 20, `${g_resultObj.ii + g_resultObj.shakin}<br>${g_resultObj.matari}<br>${g_resultObj.shobon + g_resultObj.uwan}<br>${g_resultObj.maxCombo}<br><br>${Math.round(g_resultObj.score / 100)}`);
            cnt.style.textAlign = C_ALIGN_RIGHT;
            cnt.style.pointerEvents = C_DIS_NONE;
            divRoot.appendChild(cnt);
            const lblRank = createDivCss2Label(`lblRankA`, rankMark, {
                x: 325, y: 90, w: 200, h: 20, siz: 80, color: `#000000`, fontFamily: getBasicFont(`"Bookman Old Style"`)
            });
            lblRank.style.textAlign = C_ALIGN_CENTER;
            divRoot.appendChild(lblRank);
        }

    }
}