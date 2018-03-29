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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GamePanel.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.Init();
        this.UpdateShow();
    };
    GamePanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.clearScene();
    };
    /**
     * 显示数据初始化
     */
    GamePanel.prototype.Init = function () {
        this._nGameTime = 0;
        this._nTimeFlag = 0;
        this._nNoteIndex = 0;
    };
    /**
     * 更新显示
     */
    GamePanel.prototype.UpdateShow = function () {
        if (!this._bmpBg) {
            this._bmpBg = new egret.Bitmap();
        }
        var texture = RES.getRes("image_gameBg_jpg");
        this._bmpBg.texture = texture;
        this.addChild(this._bmpBg);
        if (!this._bmpNigthBg) {
            this._bmpNigthBg = new egret.Bitmap();
        }
        var texture1 = RES.getRes("image_gameNightBg_jpg");
        this._bmpNigthBg.texture = texture1;
        this.addChild(this._bmpNigthBg);
        this._bmpNigthBg.visible = false;
        if (!this._bmpPerBg) {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2 = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.height - 543;
        this.addChild(this._bmpPerBg);
        if (!this._btnReturn) {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this.addChild(this._btnReturn);
        //载入游戏音乐
        if (!this._soundGame) {
            this._soundGame = RES.getRes("sound_start_mp3");
        }
        this._channelGame = this._soundGame.play(0, 1);
        this._channelGame.addEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
        //启动计时器
        this._nTimeFlag = egret.getTimer();
        egret.startTick(this.timerFunc, this);
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
            egret.Tween.get(note).to({ y: this.stage.stageHeight }, 1000).call(this.removeNote, this, [note]);
        }
        return false;
    };
    GamePanel.prototype.removeNote = function (note) {
        if (note && note.parent) {
            note.parent.removeChild(note);
        }
        NoteManager.getInstance().HideNote(note);
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
     * 返回主界面
     */
    GamePanel.prototype.onReturnTouch = function (event) {
        EventManager.getInstance().dispatchEvent(new egret.Event(DataEvent.EVENT_SHOW_START));
    };
    /**
     * 场景清理
     */
    GamePanel.prototype.clearScene = function () {
        this._nGameTime = 0;
        this._nNoteIndex = 0;
        if (this._channelGame) {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
    };
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map