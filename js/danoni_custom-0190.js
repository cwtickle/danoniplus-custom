'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル (No.190 UNBALANCE)
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
	g_localVersion2 = "sp-3";
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
	var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
	var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

	var frameNum = g_scoreObj.frameNum;
	var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
	var actualFrame = frameNum - preblankFrame;

	g_tmpCnt1 = 0;
	g_tmpCnt2 = 0;

	// ステップゾーン位置を変更
	if (actualFrame < 13754) {

		// フェードインの初期フレームによって表現するキーを変更
		//
		// 11key, 11Lkey, 11Fkeyはステップゾーン位置に共通性があるので、
		// 一部の矢印を非表示化することで表現が可能。
		for (var j = 0; j < keyNum; j++) {
			if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
				var step = document.getElementById("stepRoot" + j);
				g_workObj.stepX[j] -= 55;
				step.style.left = g_workObj.stepX[j] + "px";
				if (actualFrame >= 7520 && actualFrame < 12879) {
					step.style.display = "none";
				}

				var stepHit = document.getElementById("stepHit" + j);
				//stepHit.style.left = parseFloat(g_workObj.stepX[j] - 15) + "px";
				if (actualFrame >= 7520 && actualFrame < 12879) {
					stepHit.style.display = "none";
				}

				var frzHit = document.getElementById("frzHit" + j);
				frzHit.style.left = g_workObj.stepX[j] + "px";

			} else if (g_keyObj["color" + keyCtrlPtn][j] === 3) {
				var step = document.getElementById("stepRoot" + j);
				g_workObj.stepX[j] += 55;
				step.style.left = g_workObj.stepX[j] + "px";
				if (actualFrame < 7519) {
					step.style.display = "none";
				}

				var stepHit = document.getElementById("stepHit" + j);
				//stepHit.style.left = parseFloat(g_workObj.stepX[j] - 15) + "px";
				if (actualFrame < 7519) {
					stepHit.style.display = "none";
				}

				var frzHit = document.getElementById("frzHit" + j);
				frzHit.style.left = g_workObj.stepX[j] + "px";

			} else if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
				var step = document.getElementById("stepRoot" + j);
				step.style.opacity = 1;
			}

			if (actualFrame >= 12879 && actualFrame < 13754) {
				displayOutStep(2);
				displayOutStep(3);
				displayOutStep(4);
				displayOutStep(5);
			}
		}
	} else {

		// 9key形式(仮)のステップゾーン表示
		//
		// 上段を左右に移動させ、中央におにぎりが入るように移動
		// おにぎりは上下を反転させる
		for (var j = 0; j < keyNum; j++) {

			// 矢印色のグループごとに処理させる
			//
			// 矢印の決め打ちにならず、融通が利く（まとめて処理できる）のでできるだけこの方法を取る。
			// 今回はステップゾーン個別処理があるため、後半は決め打ちになっている。
			if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
				g_workObj.stepX[j] -= 27.5 * 1;

				var step = document.getElementById("stepRoot" + j);
				step.style.left = g_workObj.stepX[j] + "px";
				var stepHit = document.getElementById("stepHit" + j);
				//stepHit.style.left = (g_workObj.stepX[j] - 15) + "px";
				stepHit.style.display = "inherit";
				var frzHit = document.getElementById("frzHit" + j);
				frzHit.style.left = g_workObj.stepX[j] + "px";

			} else if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
				g_workObj.stepX[j] += 27.5 * 1;

				var step = document.getElementById("stepRoot" + j);
				step.style.left = g_workObj.stepX[j] + "px";
				var stepHit = document.getElementById("stepHit" + j);
				//stepHit.style.left = (g_workObj.stepX[j] - 15) + "px";
				stepHit.style.display = "inherit";
				var frzHit = document.getElementById("frzHit" + j);
				frzHit.style.left = g_workObj.stepX[j] + "px";

			} else if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
				displayOutStep(j);

			} else if (g_keyObj["color" + keyCtrlPtn][j] == 2) {
				g_workObj.dividePos[j] = (g_workObj.dividePos[j] == 0 ? 1 : 0);
				g_workObj.scrollDir[j] = (g_workObj.scrollDir[j] == 1 ? -1 : 1);

				var step = document.getElementById("stepRoot" + j);
				step.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j]) + "px";
				//var stepHit = document.getElementById("stepHit" + j);
				//stepHit.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j] - 15) + "px";
				var frzHit = document.getElementById("frzHit" + j);
				frzHit.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j]) + "px";
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

	if (actualFrame <= 7519) {
	} else if (actualFrame <= 12900) {
		if (actualFrame <= 7539) {

			// 上段・右側4keyの矢印を回転しながら移動させる (11 → 11L)
			g_tmpCnt1++;
			var step4 = document.getElementById("stepRoot4");
			step4.style.left = (parseFloat(step4.style.left) + 2.75) + "px";
			var step4Rotate = g_keyObj["stepRtn" + keyCtrlPtn][4] + 9 * g_tmpCnt1;
			step4.style.transform = "rotate(" + step4Rotate + "deg)";

			var step5 = document.getElementById("stepRoot5");
			step5.style.left = (parseFloat(step5.style.left) - 2.75) + "px";
			var step5Rotate = g_keyObj["stepRtn" + keyCtrlPtn][5] + 9 * g_tmpCnt1;
			step5.style.transform = "rotate(" + step5Rotate + "deg)";

			var step6 = document.getElementById("stepRoot6");
			step6.style.left = (parseFloat(step6.style.left) - 2.75 * 3) + "px";
			var step6Rotate = g_keyObj["stepRtn" + keyCtrlPtn][6] + 9 * g_tmpCnt1;
			step6.style.transform = "rotate(" + step6Rotate + "deg)";

			var step7 = document.getElementById("stepRoot7");
			step7.style.left = (parseFloat(step7.style.left) - 2.75 * 5) + "px";
			var step7Rotate = g_keyObj["stepRtn" + keyCtrlPtn][7] + 9 * g_tmpCnt1;
			step7.style.transform = "rotate(" + step7Rotate + "deg)";

		} else if (actualFrame == 7540) {

			// 11L への移動確定
			// (移動完了の瞬間に、上段・右側4keyを非表示、上段・左側4keyを表示することで接続)
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
					var step = document.getElementById("stepRoot" + j);
					if (g_stateObj.d_stepzone != C_FLG_OFF) {
						step.style.display = "inherit";
					}

					var stepHit = document.getElementById("stepHit" + j);
					stepHit.style.display = "inherit";
				}
				if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
					var step = document.getElementById("stepRoot" + j);
					step.style.left = g_workObj.stepX[j] + "px";
					step.style.display = "none";

					var stepHit = document.getElementById("stepHit" + j);
					stepHit.style.display = "none";

					var frzHit = document.getElementById("frzHit" + j);
					frzHit.style.left = g_workObj.stepX[j] + "px";
				}
			}

		} else if (actualFrame < 12879) {
		} else if (actualFrame == 12879) {

			// 上段・左側4keyの右半分を右側に持っていく処理
			// 
			// 実際にはこの時点で上段・左側4keyの右半分は非表示になっており、
			// 上段・右側4keyの右半分を左側4keyに寄せている
			var step2 = document.getElementById("stepRoot2");
			step2.style.display = "none";
			var step3 = document.getElementById("stepRoot3");
			step3.style.display = "none";
			var stepHit2 = document.getElementById("stepHit2");
			stepHit2.style.display = "none";
			var stepHit3 = document.getElementById("stepHit3");
			stepHit3.style.display = "none";

			var step6 = document.getElementById("stepRoot6");
			step6.style.left = step2.style.left;
			if (g_stateObj.d_stepzone != C_FLG_OFF) {
				step6.style.display = "inherit";
			}
			var step7 = document.getElementById("stepRoot7");
			step7.style.left = step3.style.left;
			if (g_stateObj.d_stepzone != C_FLG_OFF) {
				step7.style.display = "inherit";
			}

			var frzHit6 = document.getElementById("frzHit6");
			frzHit6.style.left = step2.style.left;
			var frzHit7 = document.getElementById("frzHit7");
			frzHit7.style.left = step3.style.left;

		} else if (actualFrame <= 12899) {

			// 上段・右側4keyの右半分の矢印を回転しながら移動させる (11L → 11F)
			// 見た目は左側4keyだが、上述の通りすでに右側4keyの右半分にすり替わっている。
			g_tmpCnt2++;
			var step6 = document.getElementById("stepRoot6");
			step6.style.left = (parseFloat(step6.style.left) + 2.75 * 2) + "px";
			var step6Rotate = 18 * g_tmpCnt2;
			step6.style.transform = "rotate(" + step6Rotate + "deg)";

			var step7 = document.getElementById("stepRoot7");
			step7.style.left = (parseFloat(step7.style.left) + 2.75 * 2) + "px";
			var step7Rotate = 18 * g_tmpCnt2;
			step7.style.transform = "rotate(" + step7Rotate + "deg)";

		} else if (actualFrame == 12900) {

			// 11F への移動確定
			var step6 = document.getElementById("stepRoot6");
			step6.style.left = g_workObj.stepX[6] + "px";
			step6.style.transform = "rotate(0deg)";
			var step7 = document.getElementById("stepRoot7");
			step7.style.left = g_workObj.stepX[7] + "px";
			step7.style.transform = "rotate(0deg)";

			var stepHit6 = document.getElementById("stepHit6");
			stepHit6.style.display = "inherit";
			var stepHit7 = document.getElementById("stepHit7");
			stepHit7.style.display = "inherit";

			var frzHit6 = document.getElementById("frzHit6");
			var frzHitTop6 = document.getElementById("frzHitTop6");
			frzHit6.style.left = g_workObj.stepX[6] + "px";
			frzHitTop6.style.transform = "rotate(" + g_keyObj["stepRtn" + keyCtrlPtn][6] + "deg)";

			var frzHit7 = document.getElementById("frzHit7");
			var frzHitTop7 = document.getElementById("frzHitTop7");
			frzHit7.style.left = g_workObj.stepX[7] + "px";
			frzHitTop7.style.transform = "rotate(" + g_keyObj["stepRtn" + keyCtrlPtn][7] + "deg)";
		}
	} else if (actualFrame <= 13845) {
		if (actualFrame < 13753) {
		} else if (actualFrame == 13753) {

			// 9key(仮)への移動のための準備
			// 上段・右側4keyの左半分を元の矢印に戻す（先の回転で反転しているため）
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj["color" + keyCtrlPtn][j] <= 1) {
					var stepHit = document.getElementById("stepHit" + j);
					stepHit.style.display = "none";
				}
			}
			var step4 = document.getElementById("stepRoot4");
			step4.style.transform = "rotate(0deg)";
			var step5 = document.getElementById("stepRoot5");
			step5.style.transform = "rotate(0deg)";

			var frzHitTop4 = document.getElementById("frzHitTop4");
			frzHitTop4.style.transform = "rotate(" + g_keyObj["stepRtn" + keyCtrlPtn][4] + "deg)";
			var frzHitTop5 = document.getElementById("frzHitTop5");
			frzHitTop5.style.transform = "rotate(" + g_keyObj["stepRtn" + keyCtrlPtn][5] + "deg)";

		} else if (actualFrame < 13767) {
			fadeOutStep(8);

		} else if (actualFrame == 13767) {
			displayOutStep(8);
			fadeOutStep(14);

		} else if (actualFrame < 13780) {
			fadeOutStep(14);

		} else if (actualFrame == 13780) {
			displayOutStep(14);
			fadeOutStep(9);

		} else if (actualFrame < 13793) {
			fadeOutStep(9);

		} else if (actualFrame == 13793) {
			displayOutStep(9);
			fadeOutStep(13);

		} else if (actualFrame < 13806) {
			fadeOutStep(13);

		} else if (actualFrame == 13806) {
			displayOutStep(13);
			fadeOutStep(10);
			fadeOutStep(12);

		} else if (actualFrame < 13819) {
			fadeOutStep(10);
			fadeOutStep(12);

		} else if (actualFrame == 13819) {
			displayOutStep(10);
			displayOutStep(12);
			fadeOutStep(11);

			// 上段の見えている矢印を左右に移動させる
			var step0 = document.getElementById("stepRoot0");
			step0.style.left = (parseFloat(step0.style.left) - 3) + "px";
			var step1 = document.getElementById("stepRoot1");
			step1.style.left = (parseFloat(step1.style.left) - 3) + "px";
			var step6 = document.getElementById("stepRoot6");
			step6.style.left = (parseFloat(step6.style.left) + 3) + "px";
			var step7 = document.getElementById("stepRoot7");
			step7.style.left = (parseFloat(step7.style.left) + 3) + "px";

			var frzHit0 = document.getElementById("frzHit0");
			frzHit0.style.left = step0.style.left;
			var frzHit1 = document.getElementById("frzHit1");
			frzHit1.style.left = step1.style.left;
			var frzHit6 = document.getElementById("frzHit6");
			frzHit6.style.left = step6.style.left;
			var frzHit7 = document.getElementById("frzHit7");
			frzHit7.style.left = step7.style.left;

		} else if (actualFrame < 13845) {
			fadeOutStep(11);
			var step0 = document.getElementById("stepRoot0");
			step0.style.left = (parseFloat(step0.style.left) - 3) + "px";
			var step1 = document.getElementById("stepRoot1");
			step1.style.left = (parseFloat(step1.style.left) - 3) + "px";
			var step6 = document.getElementById("stepRoot6");
			step6.style.left = (parseFloat(step6.style.left) + 3) + "px";
			var step7 = document.getElementById("stepRoot7");
			step7.style.left = (parseFloat(step7.style.left) + 3) + "px";

		} else if (actualFrame == 13845) {

			// 上段の見えている矢印の移動確定
			//
			// 次の矢印が出てくるタイミングが短いため、すでに移動中の矢印について座標をステップゾーンに合わせる
			// おにぎりはスクロール反転させておき、表示に備える
			displayOutStep(11);
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
					g_workObj.stepX[j] -= 27.5 * 3;

					var step = document.getElementById("stepRoot" + j);
					step.style.left = g_workObj.stepX[j] + "px";
					var stepHit = document.getElementById("stepHit" + j);
					//stepHit.style.left = (g_workObj.stepX[j] - 15) + "px";
					stepHit.style.display = "inherit";
					var frzHit = document.getElementById("frzHit" + j);
					frzHit.style.left = g_workObj.stepX[j] + "px";

					for (var k = g_workObj.judgArrowCnt[j]; ; k++) {
						if (document.getElementById("arrow" + j + "_" + k) != null) {
							var arrow = document.getElementById("arrow" + j + "_" + k);

							arrow.style.left = g_workObj.stepX[j] + "px";
						} else {
							break;
						}
					}

				} else if (g_keyObj["color" + keyCtrlPtn][j] == 4) {
					g_workObj.stepX[j] += 27.5 * 3;

					var step = document.getElementById("stepRoot" + j);
					step.style.left = g_workObj.stepX[j] + "px";
					var stepHit = document.getElementById("stepHit" + j);
					//stepHit.style.left = (g_workObj.stepX[j] - 15) + "px";
					stepHit.style.display = "inherit";
					var frzHit = document.getElementById("frzHit" + j);
					frzHit.style.left = g_workObj.stepX[j] + "px";

					for (var k = g_workObj.judgArrowCnt[j]; ; k++) {
						if (document.getElementById("arrow" + j + "_" + k) != null) {
							var arrow = document.getElementById("arrow" + j + "_" + k);

							arrow.style.left = g_workObj.stepX[j] + "px";
						} else {
							break;
						}
					}

				} else if (g_keyObj["color" + keyCtrlPtn][j] == 2) {

					g_workObj.dividePos[j] = (g_workObj.dividePos[j] == 0 ? 1 : 0);
					g_workObj.scrollDir[j] = (g_workObj.scrollDir[j] == 1 ? -1 : 1);

					var step = document.getElementById("stepRoot" + j);
					step.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j]) + "px";
					//var stepHit = document.getElementById("stepHit" + j);
					//stepHit.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j] - 15) + "px";
					var frzHit = document.getElementById("frzHit" + j);
					frzHit.style.top = (g_stepY + (g_distY - g_stepY - 50) * g_workObj.dividePos[j]) + "px";
				}
			}
			displayInStep(2);
			displayInStep(3);
			displayInStep(4);
			displayInStep(5);
		}
	} else {

		// 順番に沿ってステップゾーンを徐々に表示
		if (actualFrame < 13859) {
			fadeInStep(2);
		} else if (actualFrame == 13859) {
			displayDefaultStep(2);
			fadeInStep(5);
		} else if (actualFrame < 13872) {
			fadeInStep(5);
		} else if (actualFrame == 13872) {
			displayDefaultStep(5);
			fadeInStep(3);
		} else if (actualFrame < 13885) {
			fadeInStep(3);
		} else if (actualFrame == 13885) {
			displayDefaultStep(3);
			fadeInStep(4);
		} else if (actualFrame < 13898) {
			fadeInStep(4);
		} else if (actualFrame == 13898) {
			displayDefaultStep(4);
		} else if (actualFrame < 13911) {
		} else if (actualFrame == 13911) {
			displayInStep(11);
		} else if (actualFrame < 13925) {
			fadeInStep(11);
		} else if (actualFrame == 13925) {
			displayDefaultStep(11);
		}
	}
}

function fadeOutStep(_pos) {
	var step = document.getElementById("step" + _pos);
	var nextAlpha = parseFloat(step.style.opacity) - 0.125;
	step.style.opacity = nextAlpha;
}

function displayOutStep(_pos) {
	var step = document.getElementById("step" + _pos);
	step.style.opacity = 1;
	step.style.display = "none";
}

function fadeInStep(_pos) {
	var step = document.getElementById("step" + _pos);
	var nextAlpha = parseFloat(step.style.opacity) + 0.125;
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
/*
function customResultInit2() {

}
*/