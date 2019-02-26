`use strict`;
/**
 * Dancing☆Onigiri 設定用jsファイル
 * 
 * このファイルでは、作品全体に対しての初期設定を行うことができます。
 * 譜面データ側で個別に同様の項目が設定されている場合は、譜面データ側の設定が優先されます。
 * 例えばこのファイルで g_presetTuning = `onigiri` とすると全ての作品に製作者名として「onigiri」が設定されますが、
 * 譜面データ側で |tuning=washoi| とするとその作品には製作者名として「washoi」が設定されます。
 */

// 譜面製作者名
const g_presetTuning = `ティックル`;

// 譜面製作者URL
const g_presetTuningUrl = `http://cw7.sakura.ne.jp/`;

// ゲージ設定（デフォルト）
const g_presetGauge = {
	Border: 70,  // ノルマ制でのボーダーライン、ライフ制にしたい場合は `x` を指定
	Recovery: 2, // 回復量
	Damage: 7,   // ダメージ量
	Init: 25,    // 初期値
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
};

// オプション利用設定（デフォルト）
// 一律使用させたくない場合は `false` を指定（デフォルトは `true`）
const g_presetSettingUse = {
	motion: `true`,
	shuffle: `true`,
	autoPlay: `true`,
	gauge: `true`
};

// シャッフルグループの個別変更
// 個別に上書きする場合は個々の danoni_custom2.js 内で実施
// g_keyObj.shuffle11_0 = [0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3];
// g_keyObj.shuffle11_1 = [2, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3];

// g_keyObj.shuffle15A_0 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4];
// g_keyObj.shuffle15A_1 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 4];