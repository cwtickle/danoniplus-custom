'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル (No.216 Artificial Flower)
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

var g_tmpCnt1 = 0;
var g_tmpCnt2 = 0;

/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
	// バージョン表記
	g_localVersion2 = `sp-4`;
	document.body.style.backgroundColor = "#110011";
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

	document.body.style.backgroundColor = "#110011";

	// ステップゾーン位置を変更
	for (let j = 0; j < keyNum; j++) {

		if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {

			const step = document.querySelector(`#stepRoot${j}`);
			g_workObj.stepX[j] += 55;
			step.style.left = `${g_workObj.stepX[j]}px`;

			//const stepHit = document.querySelector(`#stepHit${j}`);
			//stepHit.style.left = `${parseFloat(g_workObj.stepX[j] - 15)}px`;

			const frzHit = document.querySelector(`#frzHit${j}`);
			frzHit.style.left = `${g_workObj.stepX[j]}px`;

		} else if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {

			const step = document.querySelector(`#stepRoot${j}`);
			g_workObj.stepX[j] -= 55;
			step.style.left = `${g_workObj.stepX[j]}px`;

			//const stepHit = document.querySelector(`#stepHit${j}`);
			//stepHit.style.left = `${parseFloat(g_workObj.stepX[j] - 15)}px`;

			const frzHit = document.querySelector(`#frzHit${j}`);
			frzHit.style.left = `${g_workObj.stepX[j]}px`;
		}
	}

	if (actualFrame < 2228) {
		// 7key
		for (var j = 0; j < keyNum; j++) {

			const stepRoot = document.querySelector(`#stepRoot${j}`);
			const step = document.querySelector(`#step${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);
			const frzHit = document.querySelector(`#frzHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] >= 3) {
				// 11key, 11Lkeyの上段を隠す
				step.style.display = `none`;
				stepHit.style.display = `none`;

			} else if (g_keyObj[`color${keyCtrlPtn}`][j] <= 2) {
				// 下段7key部は上段へ移動
				g_workObj.dividePos[j] = (g_workObj.dividePos[j] === 0 ? 1 : 0);
				g_workObj.scrollDir[j] = (g_workObj.scrollDir[j] === 1 ? -1 : 1);

				stepRoot.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
				//stepHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j] - 15)}px`;
				frzHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
			}
		}

	} else if (actualFrame < 4345) {
		// 11Lkey
		for (var j = 0; j < keyNum; j++) {

			const step = document.querySelector(`#stepRoot${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
				// 11key上段を隠す
				step.style.display = `none`;
				stepHit.style.display = `none`;
			} else if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
				// 11Lkey上段はうっすら隠す
				step.style.opacity = 0.25;
			}
		}

	} else if (actualFrame < 7024) {
		// 11Lkey
		for (var j = 0; j < keyNum; j++) {

			const step = document.querySelector(`#stepRoot${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
				// 11key上段を隠す
				step.style.display = `none`;
				stepHit.style.display = `none`;
			}
		}

	} else if (actualFrame < 10285) {
		// 11key
		for (var j = 0; j < keyNum; j++) {

			const step = document.querySelector(`#stepRoot${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
				// 11Lkey上段を隠す
				step.style.display = `none`;
				stepHit.style.display = `none`;
			}
		}
	} else if (actualFrame < 11471) {
		// 11Lkey
		for (var j = 0; j < keyNum; j++) {

			const step = document.querySelector(`#stepRoot${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
				// 11key上段を隠す
				step.style.display = `none`;
				stepHit.style.display = `none`;
			}
		}

	} else {
		// 11Fkey
		displayOutStep(2);
		displayOutStep(3);
		displayOutStep(4);
		displayOutStep(5);
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

	if (actualFrame < 7024) {
		if (actualFrame < 2155) {
		} else if (actualFrame === 2155) {

			// 7key部の半分の矢印のスクロール方向を反転
			for (let j = 8; j <= 11; j++) {
				g_workObj.dividePos[j] = (g_workObj.dividePos[j] === 0 ? 1 : 0);
				g_workObj.scrollDir[j] = (g_workObj.scrollDir[j] === 1 ? -1 : 1);
			}
		} else if (actualFrame < 2238) {
		} else if (actualFrame === 2238) {

			// 7key部の半分を下段へ移動
			for (let j = 8; j <= 11; j++) {
				const step = document.querySelector(`#stepRoot${j}`);
				//const stepHit = document.querySelector(`#stepHit${j}`);
				const frzHit = document.querySelector(`#frzHit${j}`);
				step.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
				//stepHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j] - 15)}px`;
				frzHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
			}

			// 7key部の残りの矢印のスクロール方向を反転
			for (let j = 12; j <= 14; j++) {
				g_workObj.dividePos[j] = (g_workObj.dividePos[j] === 0 ? 1 : 0);
				g_workObj.scrollDir[j] = (g_workObj.scrollDir[j] === 1 ? -1 : 1);
			}

		} else if (actualFrame < 2281) {
		} else if (actualFrame === 2281) {

			// 7key部の残りを下段へ移動
			for (let j = 12; j <= 14; j++) {
				const step = document.querySelector(`#stepRoot${j}`);
				//const stepHit = document.querySelector(`#stepHit${j}`);
				step.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
				//stepHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j] - 15)}px`;
			}

			// 11Lkey上段をうっすら表示
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
					const step = document.querySelector(`#step${j}`);
					const stepHit = document.querySelector(`#stepHit${j}`);
					step.style.opacity = 0.25;
					if (g_stateObj.d_stepzone != C_FLG_OFF) {
						step.style.display = `inherit`;
						stepHit.style.display = `inherit`;
					}
				}
			}
		} else if (actualFrame === 3000) {
			for (let j = 12; j <= 14; j++) {
				const frzHit = document.querySelector(`#frzHit${j}`);
				frzHit.style.top = `${(g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j])}px`;
			}
		} else if (actualFrame < 4356) {
		} else if (actualFrame === 4356) {

			document.body.style.backgroundColor = "#220000";

			// 11Lkey上段を表示
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
					const step = document.querySelector(`#step${j}`);
					step.style.opacity = 1;
				}
			}
		} else if (actualFrame < 7024) {
		}
	} else if (actualFrame < 7064) {

		// 11Lkey上段を移動
		// 110pxを40frameで移動させる（二次関数）
		g_tmpCnt1++;
		for (var j = 0; j < keyNum; j++) {
			if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
				const step = document.querySelector(`#stepRoot${j}`);
				step.style.left = `${parseFloat(step.style.left) + 0.1375 * (41 - g_tmpCnt1)}px`;
			}
		}
	} else if (actualFrame < 7066) {
	} else if (actualFrame === 7066) {

		document.body.style.backgroundColor = "#000022";

		// 11key上段を表示、11Lkey上段は非表示にして元の位置に戻す
		for (var j = 0; j < keyNum; j++) {
			const stepRoot = document.querySelector(`#stepRoot${j}`);
			const step = document.querySelector(`#step${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);
			const frzHit = document.querySelector(`#frzHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
				if (g_stateObj.d_stepzone != C_FLG_OFF) {
					step.style.display = `inherit`;
					stepHit.style.display = `inherit`;
				}

			} else if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
				stepRoot.style.left = `${g_workObj.stepX[j]}px`;
				//step.style.left = `${g_workObj.stepX[j]}px`;
				//stepHit.style.left = `${parseFloat(g_workObj.stepX[j] - 15)}px`;
				frzHit.style.left = `${g_workObj.stepX[j]}px`;

				step.style.display = `none`;
				stepHit.style.display = `none`;
			}
		}

	} else if (actualFrame < 10285) {
	} else if (actualFrame === 10285) {

		document.body.style.backgroundColor = "#220000";

		// 11Lkey上段を表示、11key上段は非表示
		for (var j = 0; j < keyNum; j++) {
			const step = document.querySelector(`#step${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_keyObj[`color${keyCtrlPtn}`][j] === 3) {
				if (g_stateObj.d_stepzone != C_FLG_OFF) {
					step.style.display = `inherit`;
					stepHit.style.display = `inherit`;
				}

			} else if (g_keyObj[`color${keyCtrlPtn}`][j] === 4) {
				step.style.display = `none`;
				stepHit.style.display = `none`;
			}
		}
	} else if (actualFrame < 11471) {
	} else if (actualFrame === 11471) {

		document.body.style.backgroundColor = "#220022";

		// 11Lkey・11key上段の半分ずつを表示
		displayOutStep(2);
		displayOutStep(3);
		displayOutStep(4);
		displayOutStep(5);

		for (var j = 6; j <= 7; j++) {
			const step = document.querySelector(`#step${j}`);
			const stepHit = document.querySelector(`#stepHit${j}`);

			if (g_stateObj.d_stepzone != C_FLG_OFF) {
				step.style.display = `inherit`;
				stepHit.style.display = `inherit`;
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
	step.style.opacity = 1;
	step.style.display = "none";
}

function fadeInStep(_pos) {
	const step = document.querySelector(`#step${_pos}`);
	const nextAlpha = parseFloat(step.style.opacity) + 0.125;
	step.style.opacity = nextAlpha;
}

function displayInStep(_pos) {
	const step = document.querySelector(`#step${_pos}`);
	step.style.opacity = 0;
	if (g_stateObj.d_stepzone != C_FLG_OFF) {
		step.style.display = "inherit";
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