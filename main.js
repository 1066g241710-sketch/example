let currentCalDate = new Date();
let currentDurationFilter = "all";
let currentSortOption = "dueDate";

// 高精度・多種類の線画SVGアイコンライブラリ（全35種類以上）
const SVG_ICONS = {
    // 基本・達成系
    target: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    checkCircle: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    star: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    sparkles: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.5-6.5l-2 2m-7 7l-2 2m11 0l-2-2m-7-7l-2-2"></path></svg>`,
    trophy: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>`,
    award: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    crown: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`,
    flame: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,

    // スキマ時間・スピード系
    zap: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    activity: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    clockFast: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 10"></polyline><path d="M2 12h2m16 0h2"></path></svg>`,

    // ルーティン・時間系
    repeat: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`,
    refresh: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg>`,
    hourglass: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>`,
    calendarCheck: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path></svg>`,

    // 朝・夜・週末系
    sun: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    sunrise: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6M4.93 10.93l4.24 4.24M2 18h20M20 18a8 8 0 0 0-16 0"></path></svg>`,
    moon: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    owl: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8.5" cy="10.5" r="2.5"></circle><circle cx="15.5" cy="10.5" r="2.5"></circle><path d="M12 13l1 2h-2z"></path><path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"></path></svg>`,
    shield: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    sword: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline><line x1="13" y1="19" x2="19" y2="13"></line><line x1="16" y1="16" x2="20" y2="20"></line><line x1="19" y1="21" x2="21" y2="19"></line></svg>`,

    // 相棒ペット育成系
    egg: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C16.97 22 21 17.52 21 12C21 6.47 16.97 2 12 2C7.03 2 3 6.47 3 12C3 17.52 7.03 22 12 22Z"></path></svg>`,
    petBaby: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"></circle><path d="M9 10h.01"></path><path d="M15 10h.01"></path><path d="M11 14l1 1 1-1"></path></svg>`,
    rabbit: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 2v8"></path><path d="M17 2v8"></path><path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path></svg>`,
    cat: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26.86 1.42.3 4.28-.7 6.01A9 9 0 1 1 4.28 9.01c-1-1.73-1.56-4.59-.7-6.01 1.39-.58 4.64.26 6.42 2.26.65-.17 1.33-.26 2-.26z"></path></svg>`,
    dragon: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"></path><path d="M12 6l3 3-3 3-3-3 3-3z"></path></svg>`,
    heart: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,

    // カテゴリ特化系
    shopping: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    housework: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    school: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    briefcase: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    book: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    health: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    smile: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,

    // 機能活用系
    edit: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
    sliders: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`,
    user: `<svg class="achieve-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
};

// 全55種類・固有アイコン割り当て済みアチーブメント定義
const ACHIEVEMENTS = [
    // --- 1. タスク累計完了数（10段階） ---
    { id: "cmpl_1", prereq: null, title: "ファーストステップ", desc: "初めてタスクを1つ完了する", svg: SVG_ICONS.checkCircle },
    { id: "cmpl_5", prereq: "cmpl_1", title: "ビギナーシューター", desc: "累計5個のタスクを完了する", svg: SVG_ICONS.target },
    { id: "cmpl_10", prereq: "cmpl_5", title: "タスクマスター", desc: "累計10個のタスクを完了する", svg: SVG_ICONS.star },
    { id: "cmpl_25", prereq: "cmpl_10", title: "行動力の塊", desc: "累計25個のタスクを完了する", svg: SVG_ICONS.flame },
    { id: "cmpl_50", prereq: "cmpl_25", title: "達成の達人", desc: "累計50個のタスクを完了する", svg: SVG_ICONS.trophy },
    { id: "cmpl_75", prereq: "cmpl_50", title: "不屈の執行者", desc: "累計75個のタスクを完了する", svg: SVG_ICONS.award },
    { id: "cmpl_100", prereq: "cmpl_75", title: "タスクレジェンド", desc: "累計100個のタスクを完了する", svg: SVG_ICONS.crown },
    { id: "cmpl_150", prereq: "cmpl_100", title: "超絶タスクキラー", desc: "累計150個のタスクを完了する", svg: SVG_ICONS.sparkles },
    { id: "cmpl_200", prereq: "cmpl_150", title: "時間の覇王", desc: "累計200個のタスクを完了する", svg: SVG_ICONS.crown },
    { id: "cmpl_500", prereq: "cmpl_200", title: "神域の達成者", desc: "累計500個のタスクを完了する", svg: SVG_ICONS.crown },

    // --- 2. スキマ時間活用（7段階） ---
    { id: "skm_1", prereq: null, title: "スキマ時間の発見者", desc: "スキマ時間タスクを初めて完了する", svg: SVG_ICONS.zap },
    { id: "skm_5", prereq: "skm_1", title: "スキマ時間の活用者", desc: "スキマ時間タスクを5個完了する", svg: SVG_ICONS.zap },
    { id: "skm_10", prereq: "skm_5", title: "タイムハンター", desc: "スキマ時間タスクを10個完了する", svg: SVG_ICONS.clockFast },
    { id: "skm_20", prereq: "skm_10", title: "スキマ時間マスター", desc: "スキマ時間タスクを20個完了する", svg: SVG_ICONS.clockFast },
    { id: "skm_35", prereq: "skm_20", title: "隙無きスナイパー", desc: "スキマ時間タスクを35個完了する", svg: SVG_ICONS.activity },
    { id: "skm_50", prereq: "skm_35", title: "タイムマジシャン", desc: "スキマ時間タスクを50個完了する", svg: SVG_ICONS.sparkles },
    { id: "skm_100", prereq: "skm_50", title: "超時間の支配者", desc: "スキマ時間タスクを100個完了する", svg: SVG_ICONS.crown },

    // --- 3. スマート・ルーティン（6段階） ---
    { id: "rtn_1", prereq: null, title: "習慣化の萌芽", desc: "スマート・ルーティンを初めて完了する", svg: SVG_ICONS.repeat },
    { id: "rtn_3", prereq: "rtn_1", title: "習慣化の第一歩", desc: "スマート・ルーティンを3回完了する", svg: SVG_ICONS.repeat },
    { id: "rtn_5", prereq: "rtn_3", title: "三日坊主の克服", desc: "スマート・ルーティンを5回完了する", svg: SVG_ICONS.refresh },
    { id: "rtn_10", prereq: "rtn_5", title: "ルーティンマスター", desc: "スマート・ルーティンを10回完了する", svg: SVG_ICONS.refresh },
    { id: "rtn_25", prereq: "rtn_10", title: "継続は力なり", desc: "スマート・ルーティンを25回完了する", svg: SVG_ICONS.calendarCheck },
    { id: "rtn_50", prereq: "rtn_25", title: "鉄の意志", desc: "スマート・ルーティンを50回完了する", svg: SVG_ICONS.shield },

    // --- 4. ワンタップ先送り（5段階） ---
    { id: "pst_1", prereq: null, title: "明日から本気出す", desc: "ワンタップ先送りを初めて利用する", svg: SVG_ICONS.hourglass },
    { id: "pst_5", prereq: "pst_1", title: "計画の再構築者", desc: "ワンタップ先送りを5回利用する", svg: SVG_ICONS.hourglass },
    { id: "pst_10", prereq: "pst_5", title: "柔軟な戦術家", desc: "ワンタップ先送りを10回利用する", svg: SVG_ICONS.hourglass },
    { id: "pst_25", prereq: "pst_10", title: "タイムシフトのプロ", desc: "ワンタップ先送りを25回利用する", svg: SVG_ICONS.hourglass },
    { id: "pst_50", prereq: "pst_25", title: "未来へのバトン", desc: "ワンタップ先送りを50回利用する", svg: SVG_ICONS.hourglass },

    // --- 5. 朝型人間（4段階） ---
    { id: "eb_1", prereq: null, title: "朝型人間", desc: "午前6時〜9時の間にタスクを完了する", svg: SVG_ICONS.sunrise },
    { id: "eb_5", prereq: "eb_1", title: "爽やかな朝", desc: "午前6時〜9時にタスクを通算5回完了", svg: SVG_ICONS.sun },
    { id: "eb_15", prereq: "eb_5", title: "モーニングルーティナー", desc: "午前6時〜9時にタスクを通算15回完了", svg: SVG_ICONS.sun },
    { id: "eb_30", prereq: "eb_15", title: "暁の覚者", desc: "午前6時〜9時にタスクを通算30回完了", svg: SVG_ICONS.sun },

    // --- 6. 夜ふかし（4段階） ---
    { id: "no_1", prereq: null, title: "夜ふかし", desc: "深夜22時〜午前4時の間にタスクを完了する", svg: SVG_ICONS.moon },
    { id: "no_5", prereq: "no_1", title: "ミッドナイトワーカー", desc: "深夜22時〜午前4時にタスクを通算5回完了", svg: SVG_ICONS.moon },
    { id: "no_15", prereq: "no_5", title: "月光の作業者", desc: "深夜22時〜午前4時にタスクを通算15回完了", svg: SVG_ICONS.owl },
    { id: "no_30", prereq: "no_15", title: "常闇の守護者", desc: "深夜22時〜午前4時にタスクを通算30回完了", svg: SVG_ICONS.owl },

    // --- 7. 週末の戦士（4段階） ---
    { id: "ww_1", prereq: null, title: "週末の戦士", desc: "土曜日または日曜日にタスクを完了する", svg: SVG_ICONS.shield },
    { id: "ww_5", prereq: "ww_1", title: "休日もタスク消化", desc: "週末にタスクを通算5回完了する", svg: SVG_ICONS.sword },
    { id: "ww_15", prereq: "ww_5", title: "ウィークエンドヒーロー", desc: "週末にタスクを通算15回完了する", svg: SVG_ICONS.sword },
    { id: "ww_30", prereq: "ww_15", title: "無休のガーディアン", desc: "週末にタスクを通算30回完了する", svg: SVG_ICONS.crown },

    // --- 8. 相棒ペット育成（8段階） ---
    { id: "pet_lv2", prereq: null, title: "パートナーの誕生", desc: "ペットがレベル2（ちびひよこ）に成長", svg: SVG_ICONS.egg },
    { id: "pet_lv5", prereq: "pet_lv2", title: "すくすく成長", desc: "ペットのレベルが5に到達する", svg: SVG_ICONS.petBaby },
    { id: "pet_lv10", prereq: "pet_lv5", title: "属性進化達成！", desc: "ペットのレベルが10に到達（進化）", svg: SVG_ICONS.cat },
    { id: "pet_lv15", prereq: "pet_lv10", title: "頼れる相棒", desc: "ペットのレベルが15に到達する", svg: SVG_ICONS.rabbit },
    { id: "pet_lv20", prereq: "pet_lv15", title: "絆の深まり", desc: "ペットのレベルが20に到達する", svg: SVG_ICONS.heart },
    { id: "pet_lv25", prereq: "pet_lv20", title: "最終形態：守護獣", desc: "ペットのレベルが25に到達（ドラゴン化）", svg: SVG_ICONS.dragon },
    { id: "pet_exp_500", prereq: "pet_lv2", title: "愛情たっぷり", desc: "ペットに累計500 EXP以上を与える", svg: SVG_ICONS.heart },
    { id: "pet_exp_2000", prereq: "pet_exp_500", title: "最高のバディ", desc: "ペットに累計2000 EXP以上を与える", svg: SVG_ICONS.sparkles },

    // --- 9. カテゴリ特化（7段階） ---
    { id: "cat_shop_5", prereq: null, title: "お買い物名人", desc: "「お買い物」タスクを5個完了", svg: SVG_ICONS.shopping },
    { id: "cat_house_5", prereq: null, title: "家事の達人", desc: "「家事」タスクを5個完了", svg: SVG_ICONS.housework },
    { id: "cat_school_5", prereq: null, title: "学業成就", desc: "「学校」タスクを5個完了", svg: SVG_ICONS.school },
    { id: "cat_work_5", prereq: null, title: "バリバリ働く", desc: "「職場」タスクを5個完了", svg: SVG_ICONS.briefcase },
    { id: "cat_study_5", prereq: null, title: "知識の探求者", desc: "「勉強」タスクを5個完了", svg: SVG_ICONS.book },
    { id: "cat_health_5", prereq: null, title: "健康第一", desc: "「美容・健康」タスクを5個完了", svg: SVG_ICONS.health },
    { id: "cat_priv_5", prereq: null, title: "充実に満ちた生活", desc: "「プライベート」タスクを5個完了", svg: SVG_ICONS.smile },

    // --- 10. 機能活用系（4段階） ---
    { id: "func_edit_1", prereq: null, title: "細やかな調整", desc: "タスクの「後から編集」を初めて利用する", svg: SVG_ICONS.edit },
    { id: "func_edit_5", prereq: "func_edit_1", title: "推敲のプロ", desc: "タスクの「後から編集」を5回利用する", svg: SVG_ICONS.edit },
    { id: "func_sort_1", prereq: null, title: "整頓上手", desc: "並び替え（ソート）機能を切り替える", svg: SVG_ICONS.sliders },
    { id: "func_auth_1", prereq: null, title: "アカウント設立", desc: "ログインまたはアカウント作成を行う", svg: SVG_ICONS.user }
];

document.addEventListener("DOMContentLoaded", function () {
    initDateDropdowns("dueYear", "dueMonth", "dueDate", "dueHour");
    initDateDropdowns("editDueYear", "editDueMonth", "editDueDate", "editDueHour");
    renderToDoList();
    renderCalendar();
    renderAchievements();
    renderPet();
    checkAuthStatus();

    document.getElementById("name").addEventListener("keydown", function (e) {
        if (e.key === "Enter") addToDo();
    });
});

function initDateDropdowns(yId, mId, dId, hId) {
    const today = new Date();
    const yearSelect = document.getElementById(yId);
    const monthSelect = document.getElementById(mId);
    const dateSelect = document.getElementById(dId);
    const hourSelect = document.getElementById(hId);

    if (!yearSelect) return;

    yearSelect.innerHTML = "";
    monthSelect.innerHTML = "";
    hourSelect.innerHTML = "";

    const currentYear = today.getFullYear();
    for (let y = currentYear; y <= currentYear + 2; y++) {
        yearSelect.add(new Option(y, y));
    }

    for (let m = 1; m <= 12; m++) {
        monthSelect.add(new Option(m, m));
    }

    for (let h = 0; h < 24; h++) {
        hourSelect.add(new Option(h + "時", h));
    }

    const updateDays = function () {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const selectedDate = parseInt(dateSelect.value) || 1;

        const daysInMonth = new Date(year, month, 0).getDate();
        dateSelect.innerHTML = "";

        for (let d = 1; d <= daysInMonth; d++) {
            dateSelect.add(new Option(d, d));
        }
        dateSelect.value = Math.min(selectedDate, daysInMonth);
    };

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);

    yearSelect.value = currentYear;
    monthSelect.value = today.getMonth() + 1;
    updateDays();
    dateSelect.value = today.getDate();
    hourSelect.value = 18;
}

// トースト通知機能
function showToast(title, desc) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.innerHTML = `
        <svg style="width:20px;height:20px;color:#10b981;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
        <div>
            <div class="toast-title">${title}</div>
            <div class="toast-desc">${desc}</div>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-out");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function changeSortOption(val) {
    currentSortOption = val;
    incrementStats("sortUsedCount");
    checkAchievements();
    renderToDoList();
}

function switchNavView(viewName, navElement) {
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    if (viewName === 'list') document.getElementById("listView").classList.add("active");
    if (viewName === 'calendar') {
        document.getElementById("calendarView").classList.add("active");
        renderCalendar();
    }
    if (viewName === 'pet') {
        document.getElementById("petView").classList.add("active");
        renderPet();
    }
    if (viewName === 'achievement') {
        document.getElementById("achievementView").classList.add("active");
        renderAchievements();
    }
    if (viewName === 'account') document.getElementById("accountView").classList.add("active");

    if (navElement) navElement.classList.add("active");
}

function setDurationFilter(val, btnElement) {
    currentDurationFilter = val;
    document.querySelectorAll(".time-chips .chip").forEach(c => c.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    renderToDoList();
}

function addToDo() {
    const input = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const duration = parseInt(document.getElementById("duration").value) || 0;
    const routineDays = parseInt(document.getElementById("routineDays").value) || 0;

    const year = document.getElementById("dueYear").value;
    const month = String(document.getElementById("dueMonth").value).padStart(2, '0');
    const date = String(document.getElementById("dueDate").value).padStart(2, '0');
    const hour = String(document.getElementById("dueHour").value).padStart(2, '0');

    if (input === "") return;

    const dueDateStr = `${year}-${month}-${date}T${hour}:00`;

    addStorage(input, dueDateStr, category, duration, routineDays);
    renderToDoList();
    renderCalendar();

    document.getElementById("name").value = "";
}

function renderToDoList() {
    const activeUl = document.getElementById("activeToDoList");
    const completedUl = document.getElementById("completedToDoList");
    
    activeUl.innerHTML = "";
    completedUl.innerHTML = "";

    let toDoList = getStorage();

    const activeTasksCount = toDoList.filter(t => !t.done).length;
    const completedTasksCount = toDoList.filter(t => t.done).length;

    document.getElementById("remainingCount").textContent = activeTasksCount;
    document.getElementById("completedCount").textContent = completedTasksCount;

    toDoList = toDoList.map((item, originalIndex) => ({ ...item, originalIndex }));
    
    if (currentSortOption === "dueDate") {
        toDoList.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    } else if (currentSortOption === "category") {
        toDoList.sort((a, b) => (a.category || "").localeCompare(b.category || "", 'ja'));
    }

    let renderedActiveCount = 0;
    let renderedCompletedCount = 0;

    toDoList.forEach((toDo) => {
        if (!matchDurationFilter(toDo.duration, currentDurationFilter)) return;

        const index = toDo.originalIndex;
        const li = document.createElement("li");
        li.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = toDo.done;
        checkbox.dataset.index = index;
        checkbox.addEventListener("change", toggleDone);

        const content = document.createElement("div");
        content.className = "todo-content";

        const headerLine = document.createElement("div");
        headerLine.className = "todo-header-line";

        const catBadge = document.createElement("span");
        catBadge.className = `category-badge category-${toDo.category || 'その他'}`;
        catBadge.textContent = toDo.category || 'その他';
        headerLine.appendChild(catBadge);

        if (toDo.duration > 0) {
            const durBadge = document.createElement("span");
            durBadge.className = "tag-badge";
            durBadge.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>${toDo.duration}分`;
            headerLine.appendChild(durBadge);
        }

        if (toDo.routineDays > 0) {
            const routBadge = document.createElement("span");
            routBadge.className = "tag-badge tag-routine";
            routBadge.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>${getRoutineText(toDo.routineDays)}`;
            headerLine.appendChild(routBadge);
        }

        const text = document.createElement("span");
        text.textContent = toDo.text;
        text.className = "todo-text";
        headerLine.appendChild(text);

        const dueRow = document.createElement("div");
        dueRow.className = "due-row";

        const dueInfo = document.createElement("div");
        dueInfo.className = "due-info";

        if (toDo.dueDate) {
            const due = new Date(toDo.dueDate);
            const now = new Date();
            const formatted = `${due.getMonth() + 1}/${due.getDate()} ${due.getHours()}:00`;

            const clockIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
            const alertIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

            if (!toDo.done && due < now) {
                dueInfo.innerHTML = `${alertIcon} 期限切れ: ${formatted}`;
                dueInfo.classList.add("overdue");
            } else {
                dueInfo.innerHTML = `${clockIcon} 期限: ${formatted}`;
            }
        }
        dueRow.appendChild(dueInfo);

        if (!toDo.done) {
            const postponeActions = document.createElement("div");
            postponeActions.className = "postpone-actions";

            const btn1h = document.createElement("button");
            btn1h.className = "postpone-btn";
            btn1h.textContent = "+1h";
            btn1h.onclick = () => postponeTask(index, '1h');

            const btnTomorrow = document.createElement("button");
            btnTomorrow.className = "postpone-btn";
            btnTomorrow.textContent = "明日";
            btnTomorrow.onclick = () => postponeTask(index, 'tomorrow');

            const btnNextWeek = document.createElement("button");
            btnNextWeek.className = "postpone-btn";
            btnNextWeek.textContent = "来週";
            btnNextWeek.onclick = () => postponeTask(index, 'nextweek');

            postponeActions.appendChild(btn1h);
            postponeActions.appendChild(btnTomorrow);
            postponeActions.appendChild(btnNextWeek);
            dueRow.appendChild(postponeActions);
        }

        content.appendChild(headerLine);
        content.appendChild(dueRow);

        const actionBtns = document.createElement("div");
        actionBtns.className = "todo-action-buttons";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
        editBtn.onclick = () => openEditModal(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        deleteBtn.dataset.index = index;
        deleteBtn.addEventListener("click", deleteToDo);

        actionBtns.appendChild(editBtn);
        actionBtns.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actionBtns);

        if (toDo.done) {
            completedUl.appendChild(li);
            renderedCompletedCount++;
        } else {
            activeUl.appendChild(li);
            renderedActiveCount++;
        }
    });

    if (renderedActiveCount === 0) {
        activeUl.innerHTML = `<li style="text-align:center; color:#a1a1aa; padding:16px; font-size:13px;">該当するタスクはありません</li>`;
    }
    if (renderedCompletedCount === 0) {
        completedUl.innerHTML = `<li style="text-align:center; color:#a1a1aa; padding:16px; font-size:13px;">完了済みのタスクはありません</li>`;
    }
}

function openEditModal(index) {
    const list = getStorage();
    const task = list[index];
    if (!task) return;

    document.getElementById("editTaskIndex").value = index;
    document.getElementById("editName").value = task.text;
    document.getElementById("editCategory").value = task.category || "その他";
    document.getElementById("editDuration").value = task.duration || 0;
    document.getElementById("editRoutineDays").value = task.routineDays || 0;

    if (task.dueDate) {
        const due = new Date(task.dueDate);
        document.getElementById("editDueYear").value = due.getFullYear();
        document.getElementById("editDueMonth").value = due.getMonth() + 1;

        const daysInMonth = new Date(due.getFullYear(), due.getMonth() + 1, 0).getDate();
        const dateSelect = document.getElementById("editDueDate");
        dateSelect.innerHTML = "";
        for (let d = 1; d <= daysInMonth; d++) {
            dateSelect.add(new Option(d, d));
        }

        dateSelect.value = due.getDate();
        document.getElementById("editDueHour").value = due.getHours();
    }

    document.getElementById("editModal").classList.add("active");
}

function closeEditModal() {
    document.getElementById("editModal").classList.remove("active");
}

function saveEditedTask() {
    const index = parseInt(document.getElementById("editTaskIndex").value);
    const list = getStorage();
    if (isNaN(index) || !list[index]) return;

    const name = document.getElementById("editName").value.trim();
    if (!name) return;

    const category = document.getElementById("editCategory").value;
    const duration = parseInt(document.getElementById("editDuration").value) || 0;
    const routineDays = parseInt(document.getElementById("editRoutineDays").value) || 0;

    const year = document.getElementById("editDueYear").value;
    const month = String(document.getElementById("editDueMonth").value).padStart(2, '0');
    const date = String(document.getElementById("editDueDate").value).padStart(2, '0');
    const hour = String(document.getElementById("editDueHour").value).padStart(2, '0');

    list[index].text = name;
    list[index].category = category;
    list[index].duration = duration;
    list[index].routineDays = routineDays;
    list[index].dueDate = `${year}-${month}-${date}T${hour}:00`;

    incrementStats("editTaskCount");
    setStorage(list);
    closeEditModal();
    checkAchievements();
    renderToDoList();
    renderCalendar();
}

function matchDurationFilter(itemDuration, filterVal) {
    if (filterVal === "all") return true;
    const dur = itemDuration || 0;
    if (filterVal === "5") return dur > 0 && dur <= 5;
    if (filterVal === "15") return dur > 0 && dur <= 15;
    if (filterVal === "30") return dur > 0 && dur <= 30;
    if (filterVal === "60") return dur >= 60;
    return true;
}

function getRoutineText(days) {
    if (days === 1) return "毎日";
    if (days === 7) return "毎週";
    if (days === 14) return "2週間ごと";
    if (days === 30) return "毎月";
    return `${days}日ごと`;
}

function toggleDone() {
    const list = getStorage();
    const index = this.dataset.index;
    const task = list[index];

    if (this.checked) {
        incrementStats("totalCompleted");
        if (task.duration > 0) incrementStats("sukimaCompleted");
        if (task.routineDays > 0) incrementStats("routineCompleted");

        if (task.category) {
            incrementStats(`cat_${task.category}`);
        }

        addPetExp(20, task.category);

        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay();

        if (hour >= 6 && hour < 9) incrementStats("earlyBirdCount");
        if (hour >= 22 || hour < 4) incrementStats("nightOwlCount");
        if (dayOfWeek === 0 || dayOfWeek === 6) incrementStats("weekendCount");

        if (task.routineDays && task.routineDays > 0) {
            let baseDate = task.dueDate ? new Date(task.dueDate) : new Date();
            if (baseDate < new Date()) baseDate = new Date();
            baseDate.setDate(baseDate.getDate() + task.routineDays);

            const y = baseDate.getFullYear();
            const m = String(baseDate.getMonth() + 1).padStart(2, '0');
            const d = String(baseDate.getDate()).padStart(2, '0');
            const h = String(baseDate.getHours()).padStart(2, '0');

            task.dueDate = `${y}-${m}-${d}T${h}:00`;
            task.done = false;
        } else {
            task.done = true;
        }
    } else {
        task.done = false;
    }

    setStorage(list);
    checkAchievements();
    renderToDoList();
    renderCalendar();
}

function postponeTask(index, type) {
    const list = getStorage();
    const task = list[index];

    let current = task.dueDate ? new Date(task.dueDate) : new Date();
    if (isNaN(current.getTime()) || current < new Date()) current = new Date();

    if (type === '1h') current.setHours(current.getHours() + 1);
    else if (type === 'tomorrow') current.setDate(current.getDate() + 1);
    else if (type === 'nextweek') current.setDate(current.getDate() + 7);

    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    const h = String(current.getHours()).padStart(2, '0');

    task.dueDate = `${y}-${m}-${d}T${h}:00`;

    incrementStats("postponeUsed");
    setStorage(list);
    checkAchievements();
    renderToDoList();
    renderCalendar();
}

function deleteToDo() {
    const index = this.dataset.index;
    deleteStorage(index);
    renderToDoList();
    renderCalendar();
}

function renderCalendar() {
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarTitle = document.getElementById("calendarTitle");
    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    calendarTitle.textContent = `${year}年 ${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const toDoList = getStorage();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "cal-day empty";
        calendarGrid.appendChild(emptyCell);
    }

    const today = new Date();
    for (let day = 1; day <= lastDate; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "cal-day";

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add("is-today");
        }

        const dateNum = document.createElement("span");
        dateNum.className = "cal-date-num";
        dateNum.textContent = day;
        dayCell.appendChild(dateNum);

        const datePrefix = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayTasks = toDoList.filter(t => t.dueDate && t.dueDate.startsWith(datePrefix));

        dayTasks.forEach(task => {
            const taskEl = document.createElement("div");
            taskEl.className = `cal-task-item category-${task.category || 'その他'}` + (task.done ? " done" : "");
            taskEl.textContent = task.text;
            dayCell.appendChild(taskEl);
        });

        calendarGrid.appendChild(dayCell);
    }
}

function changeMonth(delta) {
    currentCalDate.setMonth(currentCalDate.getMonth() + delta);
    renderCalendar();
}

// 相棒ペット処理
function getPetData() {
    const key = getCurrentUserKey("PetPartnerData");
    return JSON.parse(localStorage.getItem(key) || '{"level":1,"exp":0,"totalExp":0,"cats":{}}');
}

function savePetData(data) {
    const key = getCurrentUserKey("PetPartnerData");
    localStorage.setItem(key, JSON.stringify(data));
    checkAchievements();
    renderPet();
}

function addPetExp(amount, category) {
    const pet = getPetData();
    pet.exp += amount;
    pet.totalExp = (pet.totalExp || 0) + amount;

    if (category) {
        pet.cats[category] = (pet.cats[category] || 0) + 1;
    }

    let maxExp = pet.level * 50;
    while (pet.exp >= maxExp) {
        pet.exp -= maxExp;
        pet.level += 1;
        maxExp = pet.level * 50;
    }

    savePetData(pet);
}

function renderPet() {
    const pet = getPetData();
    const avatarBox = document.getElementById("petLargeAvatar");
    const nameEl = document.getElementById("petRoomName");
    const levelEl = document.getElementById("petRoomLevel");
    const expBar = document.getElementById("petRoomExpBar");
    const expText = document.getElementById("petRoomExpText");

    const topCatEl = document.getElementById("petTopCategory");
    const nextEvoEl = document.getElementById("petNextEvolution");

    if (!avatarBox) return;

    const maxExp = pet.level * 50;
    const percent = Math.min(100, Math.round((pet.exp / maxExp) * 100));

    levelEl.textContent = `Lv.${pet.level}`;
    expBar.style.width = `${percent}%`;
    expText.textContent = `${pet.exp} / ${maxExp} EXP`;

    let topCat = "育成中";
    let maxCount = 0;
    for (const c in pet.cats) {
        if (pet.cats[c] > maxCount) {
            maxCount = pet.cats[c];
            topCat = c;
        }
    }
    topCatEl.textContent = topCat;

    let petName = "タスクのたまご";
    let nextEvo = "Lv.2";
    let svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C16.9706 22 21 17.5228 21 12C21 6.47715 16.9706 2 12 2C7.02944 2 3 6.47715 3 12C3 17.5228 7.02944 22 12 22Z"></path><path d="M12 8V12L15 15"></path></svg>`;

    if (pet.level >= 2 && pet.level < 10) {
        petName = "ちびひよこ";
        nextEvo = "Lv.10";
        svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"></circle><path d="M9 10h.01"></path><path d="M15 10h.01"></path><path d="M11 14l1 1 1-1"></path></svg>`;
    } else if (pet.level >= 10 && pet.level < 25) {
        nextEvo = "Lv.25";
        if (topCat === "勉強" || topCat === "学校") {
            petName = "インテリフクロウ";
            svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8.5" cy="10.5" r="2.5"></circle><circle cx="15.5" cy="10.5" r="2.5"></circle><path d="M12 13l1 2h-2z"></path><path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"></path></svg>`;
        } else if (topCat === "美容・健康" || topCat === "家事") {
            petName = "アクティブうさぎ";
            svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 2v8"></path><path d="M17 2v8"></path><path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path><path d="M10 13h.01"></path><path d="M14 13h.01"></path></svg>`;
        } else {
            petName = "すばしっこいネコ";
            svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26.86 1.42.3 4.28-.7 6.01A9 9 0 1 1 4.28 9.01c-1-1.73-1.56-4.59-.7-6.01 1.39-.58 4.64.26 6.42 2.26.65-.17 1.33-.26 2-.26z"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle></svg>`;
        }
    } else if (pet.level >= 25) {
        petName = "守護獣ドラゴン";
        nextEvo = "MAX (最終進化)";
        svgIcon = `<svg class="pet-large-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"></path><path d="M12 6l3 3-3 3-3-3 3-3z"></path></svg>`;
    }

    nameEl.textContent = petName;
    nextEvoEl.textContent = nextEvo;
    avatarBox.innerHTML = svgIcon;
}

// 統計 & 段階的アチーブメント判定ロジック
function getStats() {
    const key = getCurrentUserKey("UserStats");
    return JSON.parse(localStorage.getItem(key) || '{}');
}

function incrementStats(key) {
    const stats = getStats();
    stats[key] = (stats[key] || 0) + 1;
    localStorage.setItem(getCurrentUserKey("UserStats"), JSON.stringify(stats));
}

function getUnlockedAchievements() {
    const key = getCurrentUserKey("UnlockedAchievements");
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function unlockAchievement(id) {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem(getCurrentUserKey("UnlockedAchievements"), JSON.stringify(unlocked));

        const item = ACHIEVEMENTS.find(a => a.id === id);
        if (item) {
            showToast(`🏆 実績解除：${item.title}`, item.desc);
        }

        renderAchievements();
    }
}

function checkAchievements() {
    const stats = getStats();
    const pet = getPetData();

    const checkMap = {
        // 完了数
        "cmpl_1": (stats.totalCompleted || 0) >= 1,
        "cmpl_5": (stats.totalCompleted || 0) >= 5,
        "cmpl_10": (stats.totalCompleted || 0) >= 10,
        "cmpl_25": (stats.totalCompleted || 0) >= 25,
        "cmpl_50": (stats.totalCompleted || 0) >= 50,
        "cmpl_75": (stats.totalCompleted || 0) >= 75,
        "cmpl_100": (stats.totalCompleted || 0) >= 100,
        "cmpl_150": (stats.totalCompleted || 0) >= 150,
        "cmpl_200": (stats.totalCompleted || 0) >= 200,
        "cmpl_500": (stats.totalCompleted || 0) >= 500,

        // スキマ時間
        "skm_1": (stats.sukimaCompleted || 0) >= 1,
        "skm_5": (stats.sukimaCompleted || 0) >= 5,
        "skm_10": (stats.sukimaCompleted || 0) >= 10,
        "skm_20": (stats.sukimaCompleted || 0) >= 20,
        "skm_35": (stats.sukimaCompleted || 0) >= 35,
        "skm_50": (stats.sukimaCompleted || 0) >= 50,
        "skm_100": (stats.sukimaCompleted || 0) >= 100,

        // ルーティン
        "rtn_1": (stats.routineCompleted || 0) >= 1,
        "rtn_3": (stats.routineCompleted || 0) >= 3,
        "rtn_5": (stats.routineCompleted || 0) >= 5,
        "rtn_10": (stats.routineCompleted || 0) >= 10,
        "rtn_25": (stats.routineCompleted || 0) >= 25,
        "rtn_50": (stats.routineCompleted || 0) >= 50,

        // 先送り
        "pst_1": (stats.postponeUsed || 0) >= 1,
        "pst_5": (stats.postponeUsed || 0) >= 5,
        "pst_10": (stats.postponeUsed || 0) >= 10,
        "pst_25": (stats.postponeUsed || 0) >= 25,
        "pst_50": (stats.postponeUsed || 0) >= 50,

        // 朝型・夜型・週末
        "eb_1": (stats.earlyBirdCount || 0) >= 1,
        "eb_5": (stats.earlyBirdCount || 0) >= 5,
        "eb_15": (stats.earlyBirdCount || 0) >= 15,
        "eb_30": (stats.earlyBirdCount || 0) >= 30,

        "no_1": (stats.nightOwlCount || 0) >= 1,
        "no_5": (stats.nightOwlCount || 0) >= 5,
        "no_15": (stats.nightOwlCount || 0) >= 15,
        "no_30": (stats.nightOwlCount || 0) >= 30,

        "ww_1": (stats.weekendCount || 0) >= 1,
        "ww_5": (stats.weekendCount || 0) >= 5,
        "ww_15": (stats.weekendCount || 0) >= 15,
        "ww_30": (stats.weekendCount || 0) >= 30,

        // ペット
        "pet_lv2": pet.level >= 2,
        "pet_lv5": pet.level >= 5,
        "pet_lv10": pet.level >= 10,
        "pet_lv15": pet.level >= 15,
        "pet_lv20": pet.level >= 20,
        "pet_lv25": pet.level >= 25,
        "pet_exp_500": (pet.totalExp || 0) >= 500,
        "pet_exp_2000": (pet.totalExp || 0) >= 2000,

        // カテゴリ別
        "cat_shop_5": (stats["cat_お買い物"] || 0) >= 5,
        "cat_house_5": (stats["cat_家事"] || 0) >= 5,
        "cat_school_5": (stats["cat_学校"] || 0) >= 5,
        "cat_work_5": (stats["cat_職場"] || 0) >= 5,
        "cat_study_5": (stats["cat_勉強"] || 0) >= 5,
        "cat_health_5": (stats["cat_美容・健康"] || 0) >= 5,
        "cat_priv_5": (stats["cat_プライベート"] || 0) >= 5,

        // 機能活用
        "func_edit_1": (stats.editTaskCount || 0) >= 1,
        "func_edit_5": (stats.editTaskCount || 0) >= 5,
        "func_sort_1": (stats.sortUsedCount || 0) >= 1,
        "func_auth_1": getActiveUser() !== null
    };

    ACHIEVEMENTS.forEach(item => {
        if (checkMap[item.id]) {
            unlockAchievement(item.id);
        }
    });
}

// 段階的（ステップアップ）開示対応の描画処理
function renderAchievements() {
    const grid = document.getElementById("achievementGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const unlocked = getUnlockedAchievements();

    const visibleAchievements = ACHIEVEMENTS.filter(item => {
        if (!item.prereq) return true;
        return unlocked.includes(item.prereq);
    });

    visibleAchievements.forEach(item => {
        const isUnlocked = unlocked.includes(item.id);
        const card = document.createElement("div");
        card.className = `achieve-card ${isUnlocked ? 'unlocked' : ''}`;

        card.innerHTML = `
            <div class="achieve-icon-box">${item.svg}</div>
            <div class="achieve-info">
                <div class="achieve-name">${item.title}</div>
                <div class="achieve-desc">${item.desc}</div>
            </div>
        `;

        grid.appendChild(card);
    });

    const percent = Math.round((unlocked.length / ACHIEVEMENTS.length) * 100);
    document.getElementById("achievementProgressBar").style.width = `${percent}%`;
    document.getElementById("achievementProgressText").textContent = `全${ACHIEVEMENTS.length}個中 ${unlocked.length} 個解除済み (${percent}%)`;
}

// アカウント機能
function getUsersDB() {
    return JSON.parse(localStorage.getItem("AppUsers") || "{}");
}

function getActiveUser() {
    return localStorage.getItem("CurrentAppUser") || null;
}

function getCurrentUserKey(baseKey) {
    const user = getActiveUser();
    return user ? `${baseKey}_${user}` : baseKey;
}

function checkAuthStatus() {
    const user = getActiveUser();
    const statusText = document.getElementById("authStatusText");
    const statusCard = document.getElementById("authStatusCard");
    const loginForm = document.getElementById("loginFormContainer");
    const loggedInView = document.getElementById("loggedInContainer");

    if (user) {
        statusText.textContent = `ログイン中: ${user} 様`;
        statusCard.classList.add("logged-in");
        loginForm.style.display = "none";
        loggedInView.style.display = "block";
    } else {
        statusText.textContent = "未ログイン状態（ゲスト利用）";
        statusCard.classList.remove("logged-in");
        loginForm.style.display = "block";
        loggedInView.style.display = "none";
    }
}

function handleAuth(type) {
    const nickname = document.getElementById("nicknameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!nickname || !password) {
        alert("ニックネームとパスワードの両方を入力してください。");
        return;
    }

    const users = getUsersDB();

    if (type === 'register') {
        if (users[nickname]) {
            alert("このニックネームは既に使われています。別の名前を入力するか、ログインしてください。");
            return;
        }
        users[nickname] = { password: password, createdAt: new Date().toISOString() };
        localStorage.setItem("AppUsers", JSON.stringify(users));
        localStorage.setItem("CurrentAppUser", nickname);

        alert(`アカウント「${nickname}」を作成しました！`);
    } else if (type === 'login') {
        if (!users[nickname] || users[nickname].password !== password) {
            alert("ニックネームまたはパスワードが正しくありません。");
            return;
        }
        localStorage.setItem("CurrentAppUser", nickname);
        alert(`ようこそ、${nickname} さん！`);
    }

    document.getElementById("nicknameInput").value = "";
    document.getElementById("passwordInput").value = "";

    checkAuthStatus();
    checkAchievements();
    renderToDoList();
    renderCalendar();
    renderAchievements();
    renderPet();
}

function handleLogout() {
    localStorage.removeItem("CurrentAppUser");
    checkAuthStatus();
    renderToDoList();
    renderCalendar();
    renderAchievements();
    renderPet();
    alert("ログアウトしました。");
}

function getStorage() {
    const key = getCurrentUserKey("ToDoList");
    let list = localStorage.getItem(key);
    if (list === null) return [];

    try {
        list = JSON.parse(list);
    } catch (e) {
        return [];
    }

    return list.map(item => ({
        text: item.text || "",
        done: !!item.done,
        dueDate: item.dueDate || "",
        category: item.category || "その他",
        duration: item.duration || 0,
        routineDays: item.routineDays || 0
    }));
}

function addStorage(text, dueDate, category, duration, routineDays) {
    const list = getStorage();
    list.push({ text, done: false, dueDate, category, duration, routineDays });
    setStorage(list);
}

function deleteStorage(index) {
    const list = getStorage();
    list.splice(index, 1);
    setStorage(list);
}

function setStorage(list) {
    const key = getCurrentUserKey("ToDoList");
    localStorage.setItem(key, JSON.stringify(list));
}