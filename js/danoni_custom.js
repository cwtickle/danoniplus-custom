'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [for Cross Walker]
 * 
 * 作品共通カスタム設定
 * 　・カスタム変数の定義 (titlesize, titlefont)
 * 　・製作者のデフォルトアドレス指定
 * 　・楽曲タイトル、アーティスト名の自動反映
 * 　・Readyモーション
 * 　・背景設定
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
function customTitleInit() {

	// バージョン表記
	g_localVersion = "ti-3.5";

	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);


	// 背景の矢印オブジェクトを表示
	const lblArrow = createArrowEffect("lblArrow", g_headerObj["setColor"][0], (g_sWidth - 500) / 2, -15, 500, 180);
	lblArrow.style.opacity = 0.25;
	lblArrow.style.zIndex = 0;
	divRoot.appendChild(lblArrow);


	// 曲名文字描画（曲名は譜面データから取得）
	// TEST:試験的に矢印色の1番目と3番目を使ってタイトルをグラデーション
	const grd2 = l0ctx.createLinearGradient(0, 0, g_sHeight, 0);
	if (g_headerObj["setColor"][0] !== undefined) {
		grd2.addColorStop(0, g_headerObj["setColor"][0]);
	} else {
		grd2.addColorStop(0, "#ffffff");
	}
	if (g_headerObj["setColor"][2] !== undefined) {
		grd2.addColorStop(1, g_headerObj["setColor"][2]);
	} else {
		grd2.addColorStop(1, "#66ffff");
	}
	let titlefontsize = 64 * (12 / g_headerObj["musicTitle"].length);
	if (titlefontsize >= 64) {
		titlefontsize = 64;
	}

	// カスタム変数 titlesize の定義
	if (g_rootObj.titlesize !== undefined && g_rootObj.titlesize !== "") {
		titlefontsize = setVal(g_rootObj.titlesize, titlefontsize, "number");
	}
	// カスタム変数 titlefont の定義
	let titlefontname = "メイリオ";
	if (g_rootObj.titlefont !== undefined && g_rootObj.titlefont !== "") {
		titlefontname = setVal(g_rootObj.titlefont, titlefontname, "string");
	}

	createLabel(l0ctx, g_headerObj["musicTitle"], g_sWidth / 2, g_sHeight / 2,
		titlefontsize, titlefontname, grd2, "center");

	// 製作者のデフォルトアドレス
	if (g_headerObj.creatorUrl === location.href) {
		g_headerObj.creatorUrl = "http://cw7.sakura.ne.jp/";
	}

	// 楽曲タイトル、アーティスト名の自動反映（Thanks: MFV2さん)
	if (document.getElementById("musicTitle") !== null) {
		document.getElementById("musicTitle").innerText = g_headerObj.musicTitle;
	}
	if (document.getElementById("artistName") !== null) {
		document.getElementById("artistName").innerText = g_headerObj.artistName;
		document.getElementById("artistName").href = g_headerObj.artistUrl;
	}

	// 初項
	g_headerObj.calcFirstTerm = 0;
	// 公差
	g_headerObj.calcDifference = 0;
	// フリーズ基本点
	g_headerObj.calcFreeze = 0;
	// 得点率 (誤差フレーム数毎に定義)
	g_headerObj.calcScoreRates = [100, 99, 95, 80, 60, 30];
}

/**
 * オプション画面(初期表示) [Scene: Option / Lime]
 */
function customOptionInit() {
	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);

	const lblTitle = document.getElementById("lblTitle");
	lblTitle.style.animationDuration = "1.5s";
	lblTitle.style.animationName = "upToDown";
}

/**
 * 表示変更(初期表示) [Scene: Settings-Display / Lemon]
 */
function customSettingsDisplayInit() {
	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);

	const lblTitle = document.getElementById("lblTitle");
	lblTitle.style.animationDuration = "1.5s";
	lblTitle.style.animationName = "upToDown";

}

/**
 * キーコンフィグ画面(初期表示) [Scene: KeyConfig / Orange]
 */
function customKeyConfigInit() {
	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);

	const lblTitle = document.getElementById("lblTitle");
	lblTitle.style.animationDuration = "1.5s";
	lblTitle.style.animationName = "upToDown";
}

/**
 * 譜面読込画面 [Scene: Loading / Strawberry]
 * - この画面のみ、画面表示がありません。
 * - 処理が完了すると、自動的にメイン画面へ遷移します。
 */
function customLoadingInit() {

	// 実際のスコア
	g_resultObj.realScore = 0;
	// ドラムロール上のスコア
	g_workObj.viewScore = 0;
	// 実際のスコア - ドラムロール上のスコア
	g_workObj.tempScore = 0;

	// スコア機構
	if (g_rootObj.scoreType === "Type2") {

		let scoreIdHeader = "";
		if (g_stateObj.scoreId > 0) {
			scoreIdHeader = Number(g_stateObj.scoreId) + 1;
		}

		// 譜面データより初項、公差、フリーズ基本点を取得
		if (g_rootObj.calc_data !== undefined && g_rootObj.calc_data !== "") {
			const calcs = g_rootObj["calc" + scoreIdHeader + "_data"].split(",");
			g_headerObj.calcFirstTerm = parseInt(calcs[0]);
			g_headerObj.calcDifference = parseInt(calcs[1]);
			g_headerObj.calcFreeze = parseInt(calcs[2]);
		}
	}
}

/**
 * メイン画面(初期表示) [Scene: Main / Banana]
 */
function customMainInit() {
	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);

	// Ready表示
	if (g_rootObj.customReady == undefined || g_rootObj.customReady != "true") {
		const lblReady = createDivLabel("lblReady", g_sWidth / 2 - 100, g_sHeight / 2 - 75,
			200, 50, 40, C_CLR_TITLE,
			"<span style='color:" + g_headerObj["setColor"][0] + ";font-size:60px;'>R</span>EADY<span style='font-size:50px;'>?</span>");
		divRoot.appendChild(lblReady);
		lblReady.style.animationDuration = "2.5s";
		lblReady.style.animationName = "leftToRightFade";
		lblReady.style.opacity = 0;
	}

	// スコアドラムロール
	if (g_rootObj.scoreType === "Type2") {
		const judgeSprite = document.getElementById("judgeSprite");
		const lblScore = createDivLabel("lblScore", g_sWidth * 3 / 4, g_sHeight - 30, g_sWidth / 4 - 50, 30, 14, "#ffffff",
			"Score:");
		lblScore.style.textAlign = C_ALIGN_LEFT;
		lblScore.style.fontFamily = C_LBL_BASICFONT;
		judgeSprite.appendChild(lblScore);

		const lblScoreRoll = createDivLabel("lblScoreRoll", g_sWidth / 2, g_sHeight - 30, g_sWidth / 2 - 10, 30, 14, "#ffffff",
			g_workObj.viewScore);
		lblScoreRoll.style.textAlign = C_ALIGN_RIGHT;
		lblScoreRoll.style.fontFamily = C_LBL_BASICFONT;
		judgeSprite.appendChild(lblScoreRoll);
	}
}

/**
 * メイン画面(フレーム毎表示) [Scene: Main / Banana]
 */
function customMainEnterFrame() {

	// スコアドラムロール
	if (g_rootObj.scoreType === "Type2") {
		if (g_resultObj.realScore > g_workObj.viewScore) {
			g_workObj.tempScore = g_resultObj.realScore - g_workObj.viewScore;
			if (g_workObj.tempScore < 100) {
				g_workObj.viewScore += 1;
			} else if (g_workObj.tempScore < 1000) {
				g_workObj.viewScore += 11;
			} else if (g_workObj.tempScore < 10000) {
				g_workObj.viewScore += 111;
			} else if (g_workObj.tempScore < 100000) {
				g_workObj.viewScore += 1111;
			} else {
				g_workObj.viewScore += 11111;
			}
			document.getElementById("lblScoreRoll").innerHTML = g_workObj.viewScore;
		}
	}
}

/**
 * 結果画面(初期表示) [Scene: Result / Grape]
 */
function customResultInit() {
	// レイヤー情報取得
	const layer0 = document.getElementById("layer0");
	const l0ctx = layer0.getContext("2d");

	// 画面背景を指定 (background-color)
	const grd = l0ctx.createLinearGradient(0, 0, 0, g_sHeight);
	grd.addColorStop(0, "#000000");
	grd.addColorStop(1, "#222222");
	l0ctx.fillStyle = grd;
	l0ctx.fillRect(0, 0, g_sWidth, g_sHeight);

	const lblTitle = document.getElementById("lblTitle");
	lblTitle.style.animationDuration = "1.5s";
	lblTitle.style.animationName = "upToDown";


	// スコア計算
	if (g_rootObj.scoreType === "Type2") {
		g_resultObj.score = g_resultObj.realScore;
		document.getElementById("lblScoreS").innerHTML = g_resultObj.score;
	}
}

/**
 * 判定カスタム処理 (引数は共通で1つ保持)
 * @param {number} difFrame タイミング誤差(フレーム数)
 */
// イイ
function customJudgeIi(difFrame) {
	if (g_rootObj.scoreType === "Type2") {
		const multi = (g_resultObj.combo > 100 ? 100 : g_resultObj.combo);
		const absDifFrame = Math.abs(difFrame);
		if (absDifFrame <= 5) {
			g_resultObj.realScore += Math.floor(g_headerObj.calcFirstTerm +
				g_headerObj.calcDifference * multi * g_headerObj.calcScoreRates[absDifFrame] / 100);
		}
	}
}

// シャキン
function customJudgeShakin(difFrame) {
	if (g_rootObj.scoreType === "Type2") {
		const multi = (g_resultObj.combo > 100 ? 100 : g_resultObj.combo);
		const absDifFrame = Math.abs(difFrame);
		if (absDifFrame <= 5) {
			g_resultObj.realScore += Math.floor(g_headerObj.calcFirstTerm +
				g_headerObj.calcDifference * multi * g_headerObj.calcScoreRates[absDifFrame] / 100);
		}
	}
}

// マターリ
function customJudgeMatari(difFrame) {
	if (g_rootObj.scoreType === "Type2") {
		const multi = (g_resultObj.combo > 100 ? 100 : g_resultObj.combo);
		const absDifFrame = Math.abs(difFrame);
		if (absDifFrame <= 5) {
			g_resultObj.realScore += Math.floor(g_headerObj.calcFirstTerm +
				g_headerObj.calcDifference * multi * g_headerObj.calcScoreRates[absDifFrame] / 100);
		}
	}
}

// ショボーン
function customJudgeShobon(difFrame) {

}

// ウワァン
function customJudgeUwan(difFrame) {

}

// キター
function customJudgeKita(difFrame) {
	if (g_rootObj.scoreType === "Type2") {
		g_resultObj.realScore += Math.floor(g_headerObj.calcFreeze);
	}
}

// イクナイ
function customJudgeIknai(difFrame) {

}