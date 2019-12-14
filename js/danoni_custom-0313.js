'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル (No.313 Be Alike)
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


/**
 * タイトル画面 [Scene: Title / Melon]
 */
function customTitleInit2() {
	// バージョン表記
	g_localVersion2 = "sp-5";

	divRoot.style.opacity = 1;
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

	var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
	var keyNum = g_keyObj["chara" + keyCtrlPtn].length;
	var frameNum = g_scoreObj.frameNum;
	var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
	var actualFrame = frameNum - preblankFrame;

	for (var j = 0; j < keyNum; j++) {
		var tmpStep = document.getElementById("step" + j);
		tmpStep.style.opacity = 1;
	}
	if (g_stateObj.d_special == "ON" && actualFrame < 3828) {
		for (var j = 0; j < keyNum; j++) {
			var tmpStep = document.getElementById("step" + j);
			if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
				tmpStep.style.opacity = 0.2;
			}
		}
	}
	divRoot.style.opacity = 1;
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame2() {

	if (g_stateObj.d_special == "ON") {
		var frameNum = g_scoreObj.frameNum;
		var preblankFrame = g_headerObj.blankFrame - g_headerObj.blankFrameDef + g_stateObj.adjustment;
		var actualFrame = frameNum - preblankFrame;
		var keyCtrlPtn = g_keyObj.currentKey + "_" + g_keyObj.currentPtn;
		var keyNum = g_keyObj["chara" + keyCtrlPtn].length;

		if (actualFrame < 3818) {
		} else if (actualFrame < 5297) {
			if (actualFrame < 3828) {
				var nextAlpha = parseFloat(divRoot.style.opacity) - 0.1;
				if (nextAlpha > 0) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 0;
				}
			} else if (actualFrame == 3828) {
				divRoot.style.opacity = 0;

				// [1サビ前] 元に戻す＆7key復帰
			} else if (actualFrame < 3837) {
			} else if (actualFrame < 3857) {
				var nextAlpha = parseFloat(divRoot.style.opacity) + 0.05;
				if (nextAlpha < 1) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 1;
				}
				for (var j = 0; j < keyNum; j++) {
					if (g_keyObj["color" + keyCtrlPtn][j] <= 2) {
						var tmpStep = document.getElementById("step" + j);
						var nextAlpha = parseFloat(tmpStep.style.opacity) + 0.04;
						if (nextAlpha < 1) {
							tmpStep.style.opacity = nextAlpha;
						} else {
							tmpStep.style.opacity = 1;
						}
					}
				}
			}
		} else if (actualFrame < 6164) {

			// [1サビ後] 5keyアルファ
			if (actualFrame < 5337) {
				for (var j = 0; j < keyNum; j++) {
					if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
						var tmpStep = document.getElementById("step" + j);
						var nextAlpha = parseFloat(tmpStep.style.opacity) - 0.02;
						if (nextAlpha > 0) {
							tmpStep.style.opacity = nextAlpha;
						} else {
							tmpStep.style.opacity = 0;
						}

					}
				}
			} else if (actualFrame == 5337) {
				for (var j = 0; j < keyNum; j++) {
					if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
						var tmpStep = document.getElementById("step" + j);
						tmpStep.style.opacity = 0.2;
					}
				}

				// [2メロ前] フリーズアローに合わせて徐々に全体アルファ
			} else if (actualFrame < 6028) {
			} else if (actualFrame < 6048) {
				var nextAlpha = parseFloat(divRoot.style.opacity) - 0.01;
				if (nextAlpha > 0) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 0;
				}
			} else if (actualFrame < 6062) {
			} else if (actualFrame < 6082) {
				var nextAlpha = parseFloat(divRoot.style.opacity) - 0.01;
				if (nextAlpha > 0) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 0;
				}
			} else if (actualFrame < 6096) {
			} else if (actualFrame < 6116) {
				var nextAlpha = parseFloat(divRoot.style.opacity) - 0.01;
				if (nextAlpha > 0) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 0;
				}
			} else if (actualFrame < 6129) {
			} else if (actualFrame < 6149) {
				var nextAlpha = parseFloat(divRoot.style.opacity) - 0.01;
				if (nextAlpha > 0) {
					divRoot.style.opacity = nextAlpha;
				} else {
					divRoot.style.opacity = 0;
				}
			} else if (actualFrame == 6149) {
				divRoot.style.opacity = 0.2;
			}

			// [2メロ前] 元に戻す
		} else if (actualFrame < 6174) {
			var nextAlpha = parseFloat(divRoot.style.opacity) + 0.08;
			if (nextAlpha < 1) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 1;
			}
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
					var tmpStep = document.getElementById("step" + j);
					var nextAlpha = parseFloat(tmpStep.style.opacity) + 0.08;
					if (nextAlpha < 1) {
						tmpStep.style.opacity = nextAlpha;
					} else {
						tmpStep.style.opacity = 1;
					}
				}
			}

		} else if (actualFrame == 6174) {
			divRoot.style.opacity = 1;
			for (var j = 0; j < keyNum; j++) {
				if (g_keyObj["color" + keyCtrlPtn][j] == 3) {
					var tmpStep = document.getElementById("step" + j);
					tmpStep.style.opacity = 1;
				}
			}

			// [2サビ前] 全体アルファ⇒元に戻す
		} else if (actualFrame < 8272) {
		} else if (actualFrame < 8282) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.1;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame == 8282) {
			divRoot.style.opacity = 0;
		} else if (actualFrame < 8292) {
		} else if (actualFrame < 8312) {
			var nextAlpha = parseFloat(divRoot.style.opacity) + 0.05;
			if (nextAlpha < 1) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 1;
			}
		} else if (actualFrame == 8312) {
			divRoot.style.opacity = 1;

			// [ラスサビ前] 全体アルファ⇒元に戻す
		} else if (actualFrame < 12097) {
		} else if (actualFrame < 12107) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.075;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame == 12107) {
			divRoot.style.opacity = 0.25;
		} else if (actualFrame < 12161) {
		} else if (actualFrame < 12181) {
			var nextAlpha = parseFloat(divRoot.style.opacity) + 0.0375;
			if (nextAlpha < 1) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 1;
			}
		} else if (actualFrame == 12181) {
			divRoot.style.opacity = 1;

			// [ラスサビ] フリーズアローに合わせて徐々に全体アルファ
		} else if (actualFrame < 15793) {
		} else if (actualFrame < 15813) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.0125;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame < 15826) {
		} else if (actualFrame < 15846) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.0125;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame < 15860) {
		} else if (actualFrame < 15880) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.0125;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame < 15894) {
		} else if (actualFrame < 15914) {
			var nextAlpha = parseFloat(divRoot.style.opacity) - 0.0125;
			if (nextAlpha > 0) {
				divRoot.style.opacity = nextAlpha;
			} else {
				divRoot.style.opacity = 0;
			}
		} else if (actualFrame == 15914) {
			divRoot.style.opacity = 0;
		}
	}
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit2() {
	divRoot.style.opacity = 1;
}