var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.NOTE_FLY_TIME = 1000; //音符飞行时间（毫秒），与配置表结合使用
    GameConst.PERFECT_SCORE = 200; //PERFECT判定分数
    GameConst.GREAT_SCORE = 80; //GREAT判定分数
    GameConst.DOUBLE_SCORE_NUM = 450; //双倍积分所需连击
    GameConst.TRIPLE_SCORE_NUM = 800; //三倍积分所需连击
    GameConst.QUADRUPLE_SCORE_NUM = 1300; //四倍积分所需连击
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
//# sourceMappingURL=GameConst.js.map