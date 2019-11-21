`use strict`;
/**
 * Dancing☆Onigiri 設定用jsファイル
 * 
 * このファイルでは、作品全体に対しての初期設定を行うことができます。
 * 譜面データ側で個別に同様の項目が設定されている場合は、譜面データ側の設定が優先されます。
 * 例えばこのファイルで g_presetTuning = `onigiri` とすると全ての作品に製作者名として「onigiri」が設定されますが、
 * 譜面データ側で |tuning=washoi| とするとその作品には製作者名として「washoi」が設定されます。
 * 
 * Revised: 2019/11/20
 * Local Version: 0.3.0
 */

// 譜面製作者名
const g_presetTuning = `ティックル`;

// 譜面製作者URL
const g_presetTuningUrl = `https://cw7.sakura.ne.jp/`;

// ゲージ設定（デフォルト）
const g_presetGauge = {
	//	Border: 70,  // ノルマ制でのボーダーライン、ライフ制にしたい場合は `x` を指定
	//	Recovery: 2, // 回復量
	//	Damage: 7,   // ダメージ量
	//	Init: 25,    // 初期値
};

// ゲージ設定（デフォルト以外）
const g_presetGaugeCustom = {
	Easy: {
		Border: 70,
		Recovery: 4,
		Damage: 7,
		Init: 25,
	},
	Hard: {
		Border: `x`,
		Recovery: 1,
		Damage: 50,
		Init: 100,
	},
	NoRecovery: {
		Border: `x`,
		Recovery: 0,
		Damage: 50,
		Init: 100,
	},
	SuddenDeath: {
		Border: `x`,
		Recovery: 0,
		Damage: setVal(g_rootObj.maxLifeVal, C_VAL_MAXLIFE, C_TYP_FLOAT),
		Init: 100,
	},
	Practice: {
		Border: `x`,
		Recovery: 0,
		Damage: 0,
		Init: 50,
	}
};

// デフォルトのデザインを使用せず、独自のデザインを使用するかを指定
// カスタムデザインにする場合は `true` を指定
const g_presetCustomDesignUse = {
	title: `false`,
	titleArrow: `false`,
	back: `false`,
	backMain: `false`,
	ready: `false`,
}

// オプション利用設定（デフォルト）
// 一律使用させたくない場合は `false` を指定（デフォルトは `true`）
const g_presetSettingUse = {
	motion: `true`,
	scroll: `true`,
	shuffle: `true`,
	autoPlay: `true`,
	gauge: `true`,
	appearance: `true`,
};

g_presetFrzStartjdgUse = `false`;

// 7key用のキーコン設定
// 1: Cross, 2: Split, 3: Alternate, 4:Twist, 5:Asymmetry
// transKeyを定義しているため、演出によりこれらを使わせたくない作品には |transKeyUse=false| を使用する。
/*
v10.2.0のスクロール拡張により不要になったため削除
g_keyObj.chara7_1 = [`left`, `leftdia`, `rightdia`, `right`, `down`, `space`, `up`];
g_keyObj.chara7_2 = [`left`, `leftdia`, `down`, `space`, `up`, `rightdia`, `right`];
g_keyObj.chara7_3 = [`left`, `down`, `up`, `right`, `leftdia`, `space`, `rightdia`];
g_keyObj.chara7_4 = [`left`, `leftdia`, `up`, `rightdia`, `down`, `space`, `right`];
g_keyObj.chara7_5 = [`left`, `down`, `rightdia`, `leftdia`, `space`, `up`, `right`];

g_keyObj.color7_1 = [0, 1, 1, 0, 0, 2, 0];
g_keyObj.color7_2 = [0, 1, 0, 2, 0, 1, 0];
g_keyObj.color7_3 = [0, 0, 0, 0, 1, 2, 1];
g_keyObj.color7_4 = [0, 1, 0, 1, 0, 2, 0];
g_keyObj.color7_5 = [0, 0, 1, 1, 2, 0, 0];

g_keyObj.shuffle7_1 = [0, 0, 0, 0, 0, 1, 0];
g_keyObj.shuffle7_2 = [0, 0, 0, 1, 0, 0, 0];
g_keyObj.shuffle7_3 = [0, 0, 0, 0, 0, 1, 0];
g_keyObj.shuffle7_4 = [0, 0, 0, 0, 0, 1, 0];
g_keyObj.shuffle7_5 = [0, 0, 0, 0, 0, 1, 0];

g_keyObj.stepRtn7_1 = [0, -45, 135, 180, -90, `onigiri`, 90];
g_keyObj.stepRtn7_2 = [0, -45, -90, `onigiri`, 90, 135, 180];
g_keyObj.stepRtn7_3 = [0, -90, 90, 180, -45, `onigiri`, 135];
g_keyObj.stepRtn7_4 = [0, -45, 90, 135, -90, `onigiri`, 180];
g_keyObj.stepRtn7_5 = [0, -90, 135, -45, `onigiri`, 90, 180];

g_keyObj.div7_1 = 7;
g_keyObj.div7_2 = 7;
g_keyObj.div7_3 = 7;
g_keyObj.div7_4 = 7;
g_keyObj.div7_5 = 7;

g_keyObj.pos7_1 = [0, 1, 5, 6, 7, 8, 9];
g_keyObj.pos7_2 = [0, 1, 2, 10, 11, 12, 13];
g_keyObj.pos7_3 = [0, 2, 4, 6, 7, 9, 11];
g_keyObj.pos7_4 = [0, 1, 4, 5, 9, 10, 13];
g_keyObj.pos7_5 = [0, 2, 5, 8, 10, 11, 13];

g_keyObj.keyCtrl7_1 = [[83], [68, 0], [75, 0], [76], [70], [32, 0], [74]];
g_keyObj.keyCtrl7_2 = [[83], [68, 0], [70], [32, 0], [74], [75, 0], [76]];
g_keyObj.keyCtrl7_3 = [[83], [70], [74], [76], [68, 0], [32, 0], [75, 0]];
g_keyObj.keyCtrl7_4 = [[83], [68, 0], [74], [75, 0], [70], [32, 0], [76]];
g_keyObj.keyCtrl7_5 = [[83], [70], [75, 0], [68, 0], [32, 0], [74], [76]];

g_keyObj.keyCtrl7_1d = [[83], [68, 0], [75, 0], [76], [70], [32, 0], [74]];
g_keyObj.keyCtrl7_2d = [[83], [68, 0], [70], [32, 0], [74], [75, 0], [76]];
g_keyObj.keyCtrl7_3d = [[83], [70], [74], [76], [68, 0], [32, 0], [75, 0]];
g_keyObj.keyCtrl7_4d = [[83], [68, 0], [74], [75, 0], [70], [32, 0], [76]];
g_keyObj.keyCtrl7_5d = [[83], [70], [75, 0], [68, 0], [32, 0], [74], [76]];

g_keyObj.transKey7_1 = `Cross`;
g_keyObj.transKey7_2 = `Split`;
g_keyObj.transKey7_3 = `Alternate`;
g_keyObj.transKey7_4 = `Twist`;
g_keyObj.transKey7_5 = `Asymmetry`;
*/

// 作品個別に定義する場合は下記と同じ
/*
|keyExtraList=7|
|color7=$0,1,1,0,0,2,0$0,1,0,2,0,1,0$0,0,0,0,1,2,1$0,1,0,1,0,2,0$0,0,1,1,2,0,0|
|chara7=$left,leftdia,rightdia,right,down,space,up$left,leftdia,down,space,up,rightdia,right$left,down,up,right,leftdia,space,rightdia$left,leftdia,up,rightdia,down,space,right$left,down,rightdia,leftdia,space,up,right|
|div7=$7$7$7$7$7|
|blank7=55$55$55$55$55$55|
|pos7=$0,1,5,6,7,8,9$0,1,2,10,11,12,13$0,2,4,6,7,9,11$0,1,4,5,9,10,13$0,2,5,8,10,11,13|
|stepRtn7=$0,-45,135,180,-90,onigiri,90$0,-45,-90,onigiri,90,135,180$0,-90,90,180,-45,onigiri,135$0,-45,90,135,-90,onigiri,180$0,-90,135,-45,onigiri,90,180|
|keyCtrl7=$83,68/0,75/0,76,70,32/0,74$83,68/0,70,32/0,74,75/0,76$83,70,74,76,68/0,32/0,75/0$83,68/0,74,75/0,70,32/0,76$83,70,75/0,68/0,32/0,74,76|
|transKey7=$Cross$Split$Alternate$Twist$Asymmetry|
*/

// シャッフルグループの個別変更
// 個別に上書きする場合は個々の danoni_custom2.js 内で実施
// g_keyObj.shuffle11_0 = [0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3];
// g_keyObj.shuffle11_1 = [2, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3];

// g_keyObj.shuffle15A_0 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4];
// g_keyObj.shuffle15A_1 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4];