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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GamePanel.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.InitData();
        this.UpdateShow();
    };
    GamePanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.Clear();
    };
    /**
     * 显示数据初始化
     */
    GamePanel.prototype.InitData = function () {
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
        if (!this._bmpPerBg) {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2 = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.height - 543;
        this.addChild(this._bmpPerBg);
        //边线闪烁
        if (!this._bmpSideLine) {
            this._bmpSideLine = new egret.Bitmap();
        }
        var texture3 = RES.getRes("image_sideline_png");
        this._bmpSideLine.texture = texture3;
        this._bmpSideLine.x = (this.stage.width - this._bmpSideLine.width) / 2;
        this._bmpSideLine.y = (this.stage.height - this._bmpSideLine.height) / 2;
        this._bmpSideLine.alpha = 0;
        this.addChild(this._bmpSideLine);
        egret.setTimeout(this.SidelineBlink, this, 4000);
        //场景特效
        this._mfcScene1 = new egret.MovieClipDataFactory(RES.getRes("movie_scene1_json"), RES.getRes("movie_scene1_png"));
        this._mfcScene2 = new egret.MovieClipDataFactory(RES.getRes("movie_scene2_json"), RES.getRes("movie_scene2_png"));
        this._mcScene = new egret.MovieClip(this._mfcScene1.generateMovieClipData("scene1"));
        this._mcScene.addEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        this.addChild(this._mcScene);
        this._mcScene.visible = false;
        egret.setTimeout(function () { this._mcScene.visible = true; this._mcScene.play(1); }, this, 4000);
        //返回按钮
        if (!this._btnReturn) {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this.addChild(this._btnReturn);
        //播放准备音效
        if (!this._soundReady) {
            this._soundReady = RES.getRes("sound_ready_wav");
        }
        this._channelReady = this._soundReady.play(0, 1);
        //载入游戏音乐
        if (!this._soundGame) {
            this._soundGame = RES.getRes("sound_game_mp3");
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
            note.scaleX = note.scaleY = 0.01;
            note.x = this.stage.stageWidth * 19 / 48 + this.stage.stageWidth * nPathWay / 24;
            note.y = this.stage.stageHeight * 27 / 128;
            var nTargetX;
            if (nPathWay == 1) {
                nTargetX = this.stage.stageWidth * 17 / 192 - 114;
            }
            else if (nPathWay == 2) {
                nTargetX = this.stage.stageWidth * 23 / 64 - 114;
            }
            else if (nPathWay == 3) {
                nTargetX = this.stage.stageWidth * 41 / 64 - 114;
            }
            else if (nPathWay == 4) {
                nTargetX = this.stage.stageWidth * 175 / 192 - 114;
            }
            this.addChild(note);
            egret.Tween.get(note).to({ x: nTargetX, y: this.stage.stageHeight - 42, scaleX: 1, scaleY: 1 }, GameConst.NOTE_FLY_TIME, egret.Ease.sineIn).call(this.removeNote, this, [note]);
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
     * 边线闪烁
     */
    GamePanel.prototype.SidelineBlink = function () {
        if (this._bmpSideLine.alpha == 0) {
            egret.Tween.get(this._bmpSideLine).to({ alpha: 1 }, 500, egret.Ease.sineIn).call(this.SidelineBlink, this);
        }
        else if (this._bmpSideLine.alpha == 1) {
            egret.Tween.get(this._bmpSideLine).to({ alpha: 0 }, 500, egret.Ease.sineIn).call(this.SidelineBlink, this);
        }
    };
    /**
     * 场景特效播放完毕
     */
    GamePanel.prototype.onSceneMcComplete = function (event) {
        var szLable = this._mcScene.currentLabel;
        switch (szLable) {
            case "scene1":
                this._mcScene.movieClipData = this._mfcScene2.generateMovieClipData("scene2");
                this._mcScene.play(1);
                break;
            case "scene2":
                this._mcScene.movieClipData = this._mfcScene1.generateMovieClipData("scene1");
                this._mcScene.play(1);
                break;
            default:
                break;
        }
    };
    /**
     * 音乐播放完毕
     */
    GamePanel.prototype.onGameSoundComplete = function (event) {
        egret.stopTick(this.timerFunc, this);
        this._mcScene.stop();
        this._mcScene.removeEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        if (this._mcScene && this._mcScene.parent) {
            this._mcScene.parent.removeChild(this._mcScene);
        }
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
    GamePanel.prototype.Clear = function () {
        this._mcScene.stop();
        this._mcScene.removeEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        if (this._mcScene && this._mcScene.parent) {
            this._mcScene.parent.removeChild(this._mcScene);
        }
        if (this._channelReady) {
            this._channelReady.stop();
            this._channelReady = null;
        }
        if (this._channelGame) {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
        this._bmpBg = null;
        this._bmpPerBg = null;
        this._mfcScene1 = null;
        this._mfcScene2 = null;
        this._mcScene = null;
        this._btnReturn = null;
        this._soundReady = null;
        this._soundGame = null;
        this._nGameTime = 0;
        this._nNoteIndex = 0;
    };
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map