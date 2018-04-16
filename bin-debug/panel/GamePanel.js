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
        _this.touchEnabled = true;
        return _this;
    }
    GamePanel.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
        this.InitData();
        this.UpdateShow();
    };
    GamePanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
        this.Clear();
    };
    /**
     * 显示数据初始化
     */
    GamePanel.prototype.InitData = function () {
        this._nGameTime = 0;
        this._nTimeFlag = 0;
        this._nNoteIndex = 0;
        this._rectClick1 = new egret.Rectangle(0, this.stage.height * 3 / 4, this.stage.width * 55 / 192, this.stage.height / 4);
        this._rectClick2 = new egret.Rectangle(this.stage.width * 55 / 192, this.stage.height * 3 / 4, this.stage.width * 41 / 192, this.stage.height / 4);
        this._rectClick3 = new egret.Rectangle(this.stage.width / 2, this.stage.height * 3 / 4, this.stage.width * 41 / 192, this.stage.height / 4);
        this._rectClick4 = new egret.Rectangle(this.stage.width * 137 / 192, this.stage.height * 3 / 4, this.stage.width * 55 / 192, this.stage.height / 4);
        this._rectPerfect = new egret.Rectangle(0, this.stage.height * 27 / 32, this.stage.width, this.stage.height / 16);
        this._rectGreat = new egret.Rectangle(0, this.stage.height * 25 / 32, this.stage.width, this.stage.height * 3 / 16);
        this._rectMiss = new egret.Rectangle(0, this.stage.height * 3 / 4, this.stage.width, this.stage.height / 4);
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
     * 获取点击是否在有效区域，在则返回所在音符滑道，否则返回0
     */
    GamePanel.prototype.GetTouchPathWay = function (nPosX, nPosY) {
        if (this._rectClick1.contains(nPosX, nPosY)) {
            return 1;
        }
        if (this._rectClick2.contains(nPosX, nPosY)) {
            return 2;
        }
        if (this._rectClick3.contains(nPosX, nPosY)) {
            return 3;
        }
        if (this._rectClick4.contains(nPosX, nPosY)) {
            return 4;
        }
        return 0;
    };
    /**
     * 点击开始
     */
    GamePanel.prototype.TouchBeginHandler = function (nPosX, nPosY) {
        var nTouchPathWay = this.GetTouchPathWay(nPosX, nPosY);
        switch (nTouchPathWay) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    };
    /**
     * 游戏点击事件
     */
    GamePanel.prototype.onGameTouch = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                break;
            default:
                break;
        }
    };
    GamePanel.prototype.onGameTouchMove = function (event) {
        if (event.localX > 20 && event.localX < 243 && event.localY > 20 && event.localY < 71) {
        }
        else {
        }
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
            note.x = this.stage.width * 19 / 48 + this.stage.width * nPathWay / 24;
            note.y = this.stage.height * 27 / 128;
            var nTargetX;
            if (nPathWay == 1) {
                nTargetX = this.stage.width * 17 / 192 - 114;
            }
            else if (nPathWay == 2) {
                nTargetX = this.stage.width * 23 / 64 - 114;
            }
            else if (nPathWay == 3) {
                nTargetX = this.stage.width * 41 / 64 - 114;
            }
            else if (nPathWay == 4) {
                nTargetX = this.stage.width * 175 / 192 - 114;
            }
            this.addChild(note);
            egret.Tween.get(note).to({ x: nTargetX, y: this.stage.height - 42, scaleX: 1, scaleY: 1 }, GameConst.NOTE_FLY_TIME, egret.Ease.sineIn).call(this.removeNote, this, [note]);
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
            egret.Tween.get(this._bmpSideLine).to({ alpha: 1 }, 500).call(this.SidelineBlink, this);
        }
        else if (this._bmpSideLine.alpha == 1) {
            egret.Tween.get(this._bmpSideLine).to({ alpha: 0 }, 500).call(this.SidelineBlink, this);
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
        this._bmpSideLine = null;
        this._mfcScene1 = null;
        this._mfcScene2 = null;
        this._mcScene = null;
        this._btnReturn = null;
        this._soundReady = null;
        this._soundGame = null;
        this._nGameTime = 0;
        this._nNoteIndex = 0;
        this._rectClick1 = null;
        this._rectClick2 = null;
        this._rectClick3 = null;
        this._rectClick4 = null;
        this._rectPerfect = null;
        this._rectGreat = null;
        this._rectMiss = null;
    };
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map