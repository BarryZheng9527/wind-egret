var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this._soundGame = RES.getRes("sound_game_mp3");
        _this._nGameTime = 0;
        _this._nTimeFlag = 0;
        _this._nNoteIndex = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GamePanel.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        //绘制音符飞行轨道和返回按钮
        this.drawPathWayBg();
        //载入游戏音乐
        this._channelGame = this._soundGame.play(0, 1);
        this._channelGame.addEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
        //启动计时器
        this._nGameTime = 0;
        this._nTimeFlag = egret.getTimer();
        egret.startTick(this.timerFunc, this);
    };
    GamePanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this._shapeReturn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReturnTouch, this);
        this._shapeReturn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onReturnTouch, this);
        this.clearScene();
    };
    /**
     * 计时器回调
     */
    GamePanel.prototype.timerFunc = function (curTime) {
        this._nGameTime = (curTime - this._nTimeFlag);
        var arrBorn = ConfigManager.getInstance()._arrBorn;
        var nTime;
        var nPathWay;
        var nType;
        while (this._nNoteIndex < arrBorn.length && this._nGameTime >= arrBorn[this._nNoteIndex].time) {
            nTime = arrBorn[this._nNoteIndex].time;
            nPathWay = arrBorn[this._nNoteIndex].track;
            nType = arrBorn[this._nNoteIndex].type;
            this._nNoteIndex++;
            var note = NoteManager.getInstance().GetNote(nTime, nPathWay, nType);
            note.x = this.stage.stageWidth * (nPathWay * 4 - 3) / 16;
            note.y = -note.height;
            this.addChild(note);
            console.log("开始", this._nGameTime);
            egret.Tween.get(note).to({ y: this.stage.stageHeight }, 1000).call(this.removeNote, this, [note]);
        }
        return false;
    };
    GamePanel.prototype.removeNote = function (note) {
        if (note && note.parent) {
            note.parent.removeChild(note);
        }
        NoteManager.getInstance().HideNote(note);
        console.log("结束", this._nGameTime);
    };
    /**
     * 音乐播放完毕
     */
    GamePanel.prototype.onGameSoundComplete = function (e) {
        if (this._channelGame) {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        egret.stopTick(this.timerFunc, this);
    };
    /**
     * 绘制音符飞行轨道和返回按钮
     */
    GamePanel.prototype.drawPathWayBg = function () {
        this._pathWayBg1 = new egret.Shape();
        this._pathWayBg1.graphics.beginFill(0xdedede);
        this._pathWayBg1.graphics.drawRect(0, 0, this.stage.stageWidth / 4, this.stage.stageHeight);
        this._pathWayBg1.graphics.endFill();
        this.addChild(this._pathWayBg1);
        this._pathWayBg2 = new egret.Shape();
        this._pathWayBg2.graphics.beginFill(0xeee685);
        this._pathWayBg2.graphics.drawRect(this.stage.stageWidth / 4, 0, this.stage.stageWidth / 4, this.stage.stageHeight);
        this._pathWayBg2.graphics.endFill();
        this.addChild(this._pathWayBg2);
        this._pathWayBg3 = new egret.Shape();
        this._pathWayBg3.graphics.beginFill(0xb4eeb4);
        this._pathWayBg3.graphics.drawRect(this.stage.stageWidth / 2, 0, this.stage.stageWidth / 4, this.stage.stageHeight);
        this._pathWayBg3.graphics.endFill();
        this.addChild(this._pathWayBg3);
        this._pathWayBg4 = new egret.Shape();
        this._pathWayBg4.graphics.beginFill(0xdedede);
        this._pathWayBg4.graphics.drawRect(this.stage.stageWidth * 3 / 4, 0, this.stage.stageWidth / 4, this.stage.stageHeight);
        this._pathWayBg4.graphics.endFill();
        this.addChild(this._pathWayBg4);
        this._shapeReturn = new egret.Shape();
        this._shapeReturn.graphics.beginFill(0x2f4f4f);
        this._shapeReturn.graphics.drawRect(this.stage.stageWidth - 300, 20, 280, 60);
        this._shapeReturn.graphics.endFill();
        this._shapeReturn.touchEnabled = true;
        this._shapeReturn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReturnTouch, this);
        this._shapeReturn.addEventListener(egret.TouchEvent.TOUCH_END, this.onReturnTouch, this);
        this.addChild(this._shapeReturn);
        this._labelReturn = new eui.Label();
        this._labelReturn.text = "RETURN";
        this._labelReturn.size = 50;
        this._labelReturn.x = this.stage.stageWidth - 300 + (this._shapeReturn.width - this._labelReturn.width) / 2;
        this._labelReturn.y = 20 + (this._shapeReturn.height - this._labelReturn.height) / 2;
        this._labelReturn.touchEnabled = false;
        this.addChild(this._labelReturn);
    };
    GamePanel.prototype.onReturnTouch = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                EventManager.getInstance().dispatchEvent(new egret.Event(DataEvent.EVENT_SHOW_START));
                break;
            default:
                break;
        }
    };
    /**
     * 场景清理
     */
    GamePanel.prototype.clearScene = function () {
        if (this._channelGame) {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        this._nGameTime = 0;
        this._nNoteIndex = 0;
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
    };
    //音符飞行时间，与配置表结合使用
    GamePanel.NOTE_FLY_TIME = 1;
    //计时间隔，毫秒
    GamePanel.INTERVAL_TIME = 10;
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map