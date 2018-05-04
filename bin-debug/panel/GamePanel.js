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
        var _this = this;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
        document.addEventListener("keydown", function (event) { _this.OnKeyDown(event); });
        document.addEventListener("keyup", function (event) { _this.OnKeyUp(event); });
        this.InitData();
        this.UpdateShow();
    };
    GamePanel.prototype.onRemoveFromStage = function (event) {
        var _this = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);
        document.removeEventListener("keydown", function (event) { _this.OnKeyDown(event); });
        document.removeEventListener("keyup", function (event) { _this.OnKeyUp(event); });
        this.Clear();
    };
    /**
     * 显示数据初始化
     */
    GamePanel.prototype.InitData = function () {
        this._nCurCombo = 0;
        this._nScore = 0;
        this._nScoreRate = 1;
        this._nPerNum = 0;
        this._nGameTime = 0;
        this._nTimeFlag = 0;
        this._nNoteIndex = 0;
        this._bPerDown1 = false;
        this._bPerDown2 = false;
        this._bPerDown3 = false;
        this._bPerDown4 = false;
    };
    /**
     * 更新显示
     */
    GamePanel.prototype.UpdateShow = function () {
        //容器层次
        if (!this._LayerScene) {
            this._LayerScene = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerScene);
        if (!this._LayerNote) {
            this._LayerNote = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerNote);
        if (!this._LayerUI) {
            this._LayerUI = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerUI);
        //背景图
        if (!this._bmpBg) {
            this._bmpBg = new egret.Bitmap();
        }
        var texture = RES.getRes("image_gameBg_jpg");
        this._bmpBg.texture = texture;
        this._LayerScene.addChild(this._bmpBg);
        if (!this._bmpPerBg) {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2 = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.stageHeight - 543;
        this._LayerScene.addChild(this._bmpPerBg);
        //区域点击高亮
        if (!this._shapePerDown1) {
            this._shapePerDown1 = new egret.Shape();
        }
        this._shapePerDown1.graphics.lineStyle(1, 0x000001, 1);
        this._shapePerDown1.graphics.beginFill(0x33ccff, 0.5);
        this._shapePerDown1.graphics.moveTo(this.stage.stageWidth * 5 / 12, this.stage.stageHeight * 27 / 128);
        this._shapePerDown1.graphics.lineTo(this.stage.stageWidth * 17 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown1.graphics.lineTo(this.stage.stageWidth * 55 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown1.graphics.lineTo(this.stage.stageWidth * 11 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown1.graphics.lineTo(this.stage.stageWidth * 5 / 12, this.stage.stageHeight * 27 / 128);
        this._shapePerDown1.graphics.endFill();
        this._LayerScene.addChild(this._shapePerDown1);
        this._shapePerDown1.visible = false;
        if (!this._shapePerDown2) {
            this._shapePerDown2 = new egret.Shape();
        }
        this._shapePerDown2.graphics.lineStyle(1, 0x000001, 1);
        this._shapePerDown2.graphics.beginFill(0x33ccff, 0.5);
        this._shapePerDown2.graphics.moveTo(this.stage.stageWidth * 11 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown2.graphics.lineTo(this.stage.stageWidth * 55 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown2.graphics.lineTo(this.stage.stageWidth / 2, this.stage.stageHeight * 103 / 128);
        this._shapePerDown2.graphics.lineTo(this.stage.stageWidth / 2, this.stage.stageHeight * 27 / 128);
        this._shapePerDown2.graphics.lineTo(this.stage.stageWidth * 11 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown2.graphics.endFill();
        this._LayerScene.addChild(this._shapePerDown2);
        this._shapePerDown2.visible = false;
        if (!this._shapePerDown3) {
            this._shapePerDown3 = new egret.Shape();
        }
        this._shapePerDown3.graphics.lineStyle(1, 0x000001, 1);
        this._shapePerDown3.graphics.beginFill(0x33ccff, 0.5);
        this._shapePerDown3.graphics.moveTo(this.stage.stageWidth / 2, this.stage.stageHeight * 27 / 128);
        this._shapePerDown3.graphics.lineTo(this.stage.stageWidth / 2, this.stage.stageHeight * 103 / 128);
        this._shapePerDown3.graphics.lineTo(this.stage.stageWidth * 137 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown3.graphics.lineTo(this.stage.stageWidth * 13 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown3.graphics.lineTo(this.stage.stageWidth / 2, this.stage.stageHeight * 27 / 128);
        this._shapePerDown3.graphics.endFill();
        this._LayerScene.addChild(this._shapePerDown3);
        this._shapePerDown3.visible = false;
        if (!this._shapePerDown4) {
            this._shapePerDown4 = new egret.Shape();
        }
        this._shapePerDown4.graphics.lineStyle(1, 0x000001, 1);
        this._shapePerDown4.graphics.beginFill(0x33ccff, 0.5);
        this._shapePerDown4.graphics.moveTo(this.stage.stageWidth * 13 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown4.graphics.lineTo(this.stage.stageWidth * 137 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown4.graphics.lineTo(this.stage.stageWidth * 176 / 192, this.stage.stageHeight * 103 / 128);
        this._shapePerDown4.graphics.lineTo(this.stage.stageWidth * 113 / 192, this.stage.stageHeight * 27 / 128);
        this._shapePerDown4.graphics.lineTo(this.stage.stageWidth * 13 / 24, this.stage.stageHeight * 27 / 128);
        this._shapePerDown4.graphics.endFill();
        this._LayerScene.addChild(this._shapePerDown4);
        this._shapePerDown4.visible = false;
        //按键选中
        if (!this._bmpPerPress1) {
            this._bmpPerPress1 = new egret.Bitmap();
        }
        var texture7 = RES.getRes("image_keyPress1_png");
        this._bmpPerPress1.texture = texture7;
        this._bmpPerPress1.x = this.stage.stageWidth * 29 / 192 - this._bmpPerPress1.width / 2;
        this._bmpPerPress1.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress1.height / 2;
        this._bmpPerPress1.visible = false;
        this._LayerScene.addChild(this._bmpPerPress1);
        if (!this._bmpPerPress2) {
            this._bmpPerPress2 = new egret.Bitmap();
        }
        var texture8 = RES.getRes("image_keyPress2_png");
        this._bmpPerPress2.texture = texture8;
        this._bmpPerPress2.x = this.stage.stageWidth * 73 / 192 - this._bmpPerPress2.width / 2;
        this._bmpPerPress2.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress2.height / 2;
        this._bmpPerPress2.visible = false;
        this._LayerScene.addChild(this._bmpPerPress2);
        if (!this._bmpPerPress3) {
            this._bmpPerPress3 = new egret.Bitmap();
        }
        var texture9 = RES.getRes("image_keyPress3_png");
        this._bmpPerPress3.texture = texture9;
        this._bmpPerPress3.x = this.stage.stageWidth * 119 / 192 - this._bmpPerPress3.width / 2;
        this._bmpPerPress3.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress3.height / 2;
        this._bmpPerPress3.visible = false;
        this._LayerScene.addChild(this._bmpPerPress3);
        if (!this._bmpPerPress4) {
            this._bmpPerPress4 = new egret.Bitmap();
        }
        var texture10 = RES.getRes("image_keyPress4_png");
        this._bmpPerPress4.texture = texture10;
        this._bmpPerPress4.x = this.stage.stageWidth * 163 / 192 - this._bmpPerPress4.width / 2;
        this._bmpPerPress4.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress4.height / 2;
        this._bmpPerPress4.visible = false;
        this._LayerScene.addChild(this._bmpPerPress4);
        //点击和判定区域
        this._rectClick1 = new egret.Rectangle(0, this.stage.stageHeight * 3 / 4, this.stage.stageWidth * 55 / 192, this.stage.stageHeight / 4);
        this._rectClick2 = new egret.Rectangle(this.stage.stageWidth * 55 / 192, this.stage.stageHeight * 3 / 4, this.stage.stageWidth * 41 / 192, this.stage.stageHeight / 4);
        this._rectClick3 = new egret.Rectangle(this.stage.stageWidth / 2, this.stage.stageHeight * 3 / 4, this.stage.stageWidth * 41 / 192, this.stage.stageHeight / 4);
        this._rectClick4 = new egret.Rectangle(this.stage.stageWidth * 137 / 192, this.stage.stageHeight * 3 / 4, this.stage.stageWidth * 55 / 192, this.stage.stageHeight / 4);
        this._rectPerfect = new egret.Rectangle(0, this.stage.stageHeight * 27 / 32, this.stage.stageWidth, this.stage.stageHeight / 16);
        this._rectGreat = new egret.Rectangle(0, this.stage.stageHeight * 25 / 32, this.stage.stageWidth, this.stage.stageHeight * 3 / 16);
        this._rectMiss = new egret.Rectangle(0, this.stage.stageHeight * 3 / 4, this.stage.stageWidth, this.stage.stageHeight / 4);
        //边线闪烁
        if (!this._bmpSideLine) {
            this._bmpSideLine = new egret.Bitmap();
        }
        var texture3 = RES.getRes("image_sideline_png");
        this._bmpSideLine.texture = texture3;
        this._bmpSideLine.x = (this.stage.stageWidth - this._bmpSideLine.width) / 2;
        this._bmpSideLine.y = (this.stage.stageHeight - this._bmpSideLine.height) / 2;
        this._bmpSideLine.alpha = 0;
        this._LayerScene.addChild(this._bmpSideLine);
        this._nTimeOutId1 = egret.setTimeout(this.SidelineBlink, this, 4000);
        //场景特效
        this._mfcScene1 = new egret.MovieClipDataFactory(RES.getRes("movie_scene1_json"), RES.getRes("movie_scene1_png"));
        this._mfcScene2 = new egret.MovieClipDataFactory(RES.getRes("movie_scene2_json"), RES.getRes("movie_scene2_png"));
        this._mcScene = new egret.MovieClip(this._mfcScene1.generateMovieClipData("scene1"));
        this._mcScene.addEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        this._LayerScene.addChild(this._mcScene);
        this._mcScene.visible = false;
        this._nTimeOutId2 = egret.setTimeout(function () { this._mcScene.visible = true; this._mcScene.play(1); }, this, 4000);
        //按键特效
        this._mfcPer = new egret.MovieClipDataFactory(RES.getRes("movie_per_json"), RES.getRes("movie_per_png"));
        this._mcPer1 = new egret.MovieClip(this._mfcPer.generateMovieClipData("per"));
        this._mcPer1.addEventListener(egret.Event.COMPLETE, this.onPerMcComplete1, this);
        this._mcPer1.x = this.stage.stageWidth * 29 / 192 - 125;
        this._mcPer1.y = this.stage.stageHeight * 55 / 64 - 75;
        this._LayerUI.addChild(this._mcPer1);
        this._mcPer1.stop();
        this._mcPer1.visible = false;
        this._mcPer2 = new egret.MovieClip(this._mfcPer.generateMovieClipData("per"));
        this._mcPer2.addEventListener(egret.Event.COMPLETE, this.onPerMcComplete2, this);
        this._mcPer2.x = this.stage.stageWidth * 73 / 192 - 125;
        this._mcPer2.y = this.stage.stageHeight * 55 / 64 - 75;
        this._LayerUI.addChild(this._mcPer2);
        this._mcPer2.stop();
        this._mcPer2.visible = false;
        this._mcPer3 = new egret.MovieClip(this._mfcPer.generateMovieClipData("per"));
        this._mcPer3.addEventListener(egret.Event.COMPLETE, this.onPerMcComplete3, this);
        this._mcPer3.x = this.stage.stageWidth * 119 / 192 - 125;
        this._mcPer3.y = this.stage.stageHeight * 55 / 64 - 75;
        this._LayerUI.addChild(this._mcPer3);
        this._mcPer3.stop();
        this._mcPer3.visible = false;
        this._mcPer4 = new egret.MovieClip(this._mfcPer.generateMovieClipData("per"));
        this._mcPer4.addEventListener(egret.Event.COMPLETE, this.onPerMcComplete4, this);
        this._mcPer4.x = this.stage.stageWidth * 163 / 192 - 125;
        this._mcPer4.y = this.stage.stageHeight * 55 / 64 - 75;
        this._LayerUI.addChild(this._mcPer4);
        this._mcPer4.stop();
        this._mcPer4.visible = false;
        //判定显示
        if (!this._bmpPerfect) {
            this._bmpPerfect = new egret.Bitmap();
        }
        var texture4 = RES.getRes("image_perfect_png");
        this._bmpPerfect.texture = texture4;
        this._bmpPerfect.visible = false;
        this._LayerUI.addChild(this._bmpPerfect);
        if (!this._bmpGreat) {
            this._bmpGreat = new egret.Bitmap();
        }
        var texture5 = RES.getRes("image_great_png");
        this._bmpGreat.texture = texture5;
        this._bmpGreat.visible = false;
        this._LayerUI.addChild(this._bmpGreat);
        if (!this._bmpMiss) {
            this._bmpMiss = new egret.Bitmap();
        }
        var texture6 = RES.getRes("image_miss_png");
        this._bmpMiss.texture = texture6;
        this._bmpMiss.visible = false;
        this._LayerUI.addChild(this._bmpMiss);
        //音符连击，分数，音符计数
        if (!this._bmtextCombo) {
            this._bmtextCombo = new egret.BitmapText();
        }
        this._bmtextCombo.font = RES.getRes("font_combo_fnt");
        this._bmtextCombo.width = 160;
        this._bmtextCombo.height = 40;
        this._bmtextCombo.textAlign = egret.HorizontalAlign.CENTER;
        this._bmtextCombo.x = (this.stage.stageWidth - this._bmtextCombo.width) / 2;
        this._bmtextCombo.y = this.stage.stageHeight * 69 / 256 - this._bmtextCombo.height / 2;
        this._LayerUI.addChild(this._bmtextCombo);
        if (!this._bmtextScore) {
            this._bmtextScore = new egret.BitmapText();
        }
        this._bmtextScore.font = RES.getRes("font_score_fnt");
        this._bmtextScore.width = 240;
        this._bmtextScore.height = 30;
        this._bmtextScore.textAlign = egret.HorizontalAlign.CENTER;
        this._bmtextScore.x = this.stage.stageWidth * 165 / 192 - this._bmtextScore.width / 2;
        this._bmtextScore.y = this.stage.stageHeight * 5 / 128 - this._bmtextScore.height / 2;
        this._LayerUI.addChild(this._bmtextScore);
        if (!this._textPerNum) {
            this._textPerNum = new egret.TextField();
        }
        this._textPerNum.size = 60;
        this._textPerNum.bold = true;
        this._textPerNum.textColor = 0xffff00;
        this._textPerNum.x = this.stage.stageWidth - 180;
        this._textPerNum.y = 80;
        this._textPerNum.visible = false;
        this._LayerUI.addChild(this._textPerNum);
        //积分倍数
        if (!this._bmpScoreRate1) {
            this._bmpScoreRate1 = new egret.Bitmap();
        }
        var texture11 = RES.getRes("image_double_png");
        this._bmpScoreRate1.texture = texture11;
        this._bmpScoreRate1.x = this.stage.stageWidth * 43 / 48 - this._bmpScoreRate1.width / 2;
        this._bmpScoreRate1.y = this.stage.stageHeight / 8 - this._bmpScoreRate1.height / 2;
        this._bmpScoreRate1.visible = false;
        this._LayerUI.addChild(this._bmpScoreRate1);
        if (!this._bmpScoreRate2) {
            this._bmpScoreRate2 = new egret.Bitmap();
        }
        var texture12 = RES.getRes("image_triple_png");
        this._bmpScoreRate2.texture = texture12;
        this._bmpScoreRate2.x = this.stage.stageWidth * 43 / 48 - this._bmpScoreRate2.width / 2;
        this._bmpScoreRate2.y = this.stage.stageHeight / 8 - this._bmpScoreRate2.height / 2;
        this._bmpScoreRate2.visible = false;
        this._LayerUI.addChild(this._bmpScoreRate2);
        if (!this._bmpScoreRate3) {
            this._bmpScoreRate3 = new egret.Bitmap();
        }
        var texture13 = RES.getRes("image_quadruple_png");
        this._bmpScoreRate3.texture = texture13;
        this._bmpScoreRate3.x = this.stage.stageWidth * 43 / 48 - this._bmpScoreRate3.width / 2;
        this._bmpScoreRate3.y = this.stage.stageHeight / 8 - this._bmpScoreRate3.height / 2;
        this._bmpScoreRate3.visible = false;
        this._LayerUI.addChild(this._bmpScoreRate3);
        //返回按钮
        if (!this._btnReturn) {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this._LayerUI.addChild(this._btnReturn);
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
     * 获取是否有效按键
     */
    GamePanel.prototype.GetKeyPathWay = function (szKeyCode) {
        var nPathWay = 0;
        switch (szKeyCode) {
            case "KeyD":
                nPathWay = 1;
                break;
            case "KeyF":
                nPathWay = 2;
                break;
            case "KeyJ":
                nPathWay = 3;
                break;
            case "KeyK":
                nPathWay = 4;
                break;
            default:
                break;
        }
        return nPathWay;
    };
    /**
     * 音符判定
     */
    GamePanel.prototype.GetScoreCheckID = function (note) {
        var nCheckId = 0;
        if (note) {
            var nNoteY = note.height * note.scaleY / 2 + note.y;
            if (nNoteY >= this._rectPerfect.top && nNoteY <= this._rectPerfect.bottom) {
                nCheckId = 1;
            }
            else if (nNoteY >= this._rectGreat.top && nNoteY <= this._rectGreat.bottom) {
                nCheckId = 2;
            }
            else if (nNoteY >= this._rectMiss.top && nNoteY <= this._rectMiss.bottom) {
                nCheckId = 3;
            }
            if (nCheckId > 0) {
                NoteManager.getInstance().HideNote(note);
                this.PlayPerMc(note.nPathWay);
            }
        }
        if (nCheckId > 0) {
            this.ShowScoreCheck(nCheckId);
        }
        return nCheckId;
    };
    /**
     * 判定显示
     */
    GamePanel.prototype.ShowScoreCheck = function (nCheckId) {
        //连击
        if (nCheckId < 3) {
            this._nCurCombo++;
        }
        else {
            this._nCurCombo = 0;
        }
        if (this._bmtextCombo) {
            if (this._nCurCombo > 0) {
                this._bmtextCombo.text = "" + this._nCurCombo;
            }
            else {
                this._bmtextCombo.text = "";
            }
        }
        //分数倍率
        if (this._nCurCombo >= GameConst.DOUBLE_SCORE_NUM) {
            if (this._nCurCombo == GameConst.DOUBLE_SCORE_NUM) {
                this._nScoreRate = 2;
                this._bmpScoreRate1.visible = true;
                this._bmpScoreRate2.visible = false;
                this._bmpScoreRate3.visible = false;
            }
            else if (this._nCurCombo == GameConst.TRIPLE_SCORE_NUM) {
                this._nScoreRate = 3;
                this._bmpScoreRate1.visible = false;
                this._bmpScoreRate2.visible = true;
                this._bmpScoreRate3.visible = false;
            }
            else if (this._nCurCombo == GameConst.QUADRUPLE_SCORE_NUM) {
                this._nScoreRate = 4;
                this._bmpScoreRate1.visible = false;
                this._bmpScoreRate2.visible = false;
                this._bmpScoreRate3.visible = true;
            }
        }
        else {
            this._nScoreRate = 1;
            this._bmpScoreRate1.visible = false;
            this._bmpScoreRate2.visible = false;
            this._bmpScoreRate3.visible = false;
        }
        //判定结果
        var bmp;
        var nScoreAdd = 0;
        if (nCheckId == 1) {
            bmp = this._bmpPerfect;
            nScoreAdd = GameConst.PERFECT_SCORE;
        }
        else if (nCheckId == 2) {
            bmp = this._bmpGreat;
            nScoreAdd = GameConst.GREAT_SCORE;
        }
        else if (nCheckId == 3) {
            bmp = this._bmpMiss;
        }
        if (bmp) {
            egret.Tween.removeTweens(bmp);
            bmp.scaleX = bmp.scaleY = 1;
            bmp.x = (this.stage.stageWidth - bmp.width) / 2;
            bmp.y = this.stage.stageHeight * 23 / 128 - bmp.height / 2;
            bmp.visible = true;
            var nTarX = bmp.x + bmp.width * 9 / 20;
            var nTarY = bmp.y + bmp.height * 9 / 20;
            egret.Tween.get(bmp).to({ x: nTarX, y: nTarY, scaleX: 0.1, scaleY: 0.1 }, 200).call(this.removeScoreCheck, this, [bmp]);
        }
        //分数
        this._nScore += this._nScoreRate * nScoreAdd;
        if (this._bmtextScore) {
            this._bmtextScore.text = "" + this._nScore;
        }
        //计数
        this._nPerNum++;
        if (this._textPerNum) {
            this._textPerNum.text = "" + this._nPerNum;
        }
    };
    GamePanel.prototype.removeScoreCheck = function (bmp) {
        bmp.visible = false;
    };
    /**
     * 点击特效
     */
    GamePanel.prototype.PlayPerMc = function (nPer) {
        switch (Math.floor(nPer)) {
            case 1:
                this._mcPer1.visible = true;
                this._mcPer1.gotoAndPlay(1, 1);
                break;
            case 2:
                this._mcPer2.visible = true;
                this._mcPer2.gotoAndPlay(1, 1);
                break;
            case 3:
                this._mcPer3.visible = true;
                this._mcPer3.gotoAndPlay(1, 1);
                break;
            case 4:
                this._mcPer4.visible = true;
                this._mcPer4.gotoAndPlay(1, 1);
                break;
            default:
                break;
        }
    };
    /**
     * 点击开始
     */
    GamePanel.prototype.TouchBeginHandler = function (nTouchPathWay) {
        if (nTouchPathWay > 0) {
            var nType1 = nTouchPathWay * 10;
            var nType2 = nTouchPathWay * 10 + 1;
            var objShow = NoteManager.getInstance().objShow;
            if (objShow) {
                var arrNote1 = objShow[nType1];
                var arrNote2 = objShow[nType2];
                if (arrNote1 && arrNote1.length > 0) {
                    for (var iIndex1 = 0; iIndex1 < arrNote1.length; ++iIndex1) {
                        var curNote1 = arrNote1[iIndex1];
                        this.GetScoreCheckID(curNote1);
                    }
                }
                if (arrNote2 && arrNote2.length > 0) {
                    for (var iIndex2 = 0; iIndex2 < arrNote2.length; ++iIndex2) {
                        var curNote2 = arrNote2[iIndex2];
                        this.GetScoreCheckID(curNote2);
                    }
                }
            }
            switch (nTouchPathWay) {
                case 1:
                    this._bPerDown1 = true;
                    this._bmpPerPress1.visible = true;
                    this._shapePerDown1.visible = true;
                    break;
                case 2:
                    this._bPerDown2 = true;
                    this._bmpPerPress2.visible = true;
                    this._shapePerDown2.visible = true;
                    break;
                case 3:
                    this._bPerDown3 = true;
                    this._bmpPerPress3.visible = true;
                    this._shapePerDown3.visible = true;
                    break;
                case 4:
                    this._bPerDown4 = true;
                    this._bmpPerPress4.visible = true;
                    this._shapePerDown4.visible = true;
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * 点击持续
     */
    GamePanel.prototype.TouchPressHandler = function () {
        var objShow = NoteManager.getInstance().objShow;
        if (objShow) {
            if (this._bPerDown1) {
                var arrNote11 = objShow[12];
                var arrNote12 = objShow[13];
                if (arrNote11 && arrNote11.length > 0) {
                    for (var iIndex11 = 0; iIndex11 < arrNote11.length; ++iIndex11) {
                        var curNote11 = arrNote11[iIndex11];
                        var nNoteY11 = curNote11.height * curNote11.scaleY / 2 + curNote11.y;
                        if (nNoteY11 >= this._rectPerfect.top && nNoteY11 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote11);
                        }
                    }
                }
                if (arrNote12 && arrNote12.length > 0) {
                    for (var iIndex12 = 0; iIndex12 < arrNote12.length; ++iIndex12) {
                        var curNote12 = arrNote12[iIndex12];
                        var nNoteY12 = curNote12.height * curNote12.scaleY / 2 + curNote12.y;
                        if (nNoteY12 >= this._rectPerfect.top && nNoteY12 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote12);
                        }
                    }
                }
            }
            if (this._bPerDown2) {
                var arrNote21 = objShow[22];
                var arrNote22 = objShow[23];
                if (arrNote21 && arrNote21.length > 0) {
                    for (var iIndex21 = 0; iIndex21 < arrNote21.length; ++iIndex21) {
                        var curNote21 = arrNote21[iIndex21];
                        var nNoteY21 = curNote21.height * curNote21.scaleY / 2 + curNote21.y;
                        if (nNoteY21 >= this._rectPerfect.top && nNoteY21 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote21);
                        }
                    }
                }
                if (arrNote22 && arrNote22.length > 0) {
                    for (var iIndex22 = 0; iIndex22 < arrNote22.length; ++iIndex22) {
                        var curNote22 = arrNote22[iIndex22];
                        var nNoteY22 = curNote22.height * curNote22.scaleY / 2 + curNote22.y;
                        if (nNoteY22 >= this._rectPerfect.top && nNoteY22 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote22);
                        }
                    }
                }
            }
            if (this._bPerDown3) {
                var arrNote31 = objShow[32];
                var arrNote32 = objShow[33];
                if (arrNote31 && arrNote31.length > 0) {
                    for (var iIndex31 = 0; iIndex31 < arrNote31.length; ++iIndex31) {
                        var curNote31 = arrNote31[iIndex31];
                        var nNoteY31 = curNote31.height * curNote31.scaleY / 2 + curNote31.y;
                        if (nNoteY31 >= this._rectPerfect.top && nNoteY31 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote31);
                        }
                    }
                }
                if (arrNote32 && arrNote32.length > 0) {
                    for (var iIndex32 = 0; iIndex32 < arrNote32.length; ++iIndex32) {
                        var curNote32 = arrNote32[iIndex32];
                        var nNoteY32 = curNote32.height * curNote32.scaleY / 2 + curNote32.y;
                        if (nNoteY32 >= this._rectPerfect.top && nNoteY32 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote32);
                        }
                    }
                }
            }
            if (this._bPerDown4) {
                var arrNote41 = objShow[42];
                var arrNote42 = objShow[43];
                if (arrNote41 && arrNote41.length > 0) {
                    for (var iIndex41 = 0; iIndex41 < arrNote41.length; ++iIndex41) {
                        var curNote41 = arrNote41[iIndex41];
                        var nNoteY41 = curNote41.height * curNote41.scaleY / 2 + curNote41.y;
                        if (nNoteY41 >= this._rectPerfect.top && nNoteY41 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote41);
                        }
                    }
                }
                if (arrNote42 && arrNote42.length > 0) {
                    for (var iIndex42 = 0; iIndex42 < arrNote42.length; ++iIndex42) {
                        var curNote42 = arrNote42[iIndex42];
                        var nNoteY42 = curNote42.height * curNote42.scaleY / 2 + curNote42.y;
                        if (nNoteY42 >= this._rectPerfect.top && nNoteY42 <= this._rectPerfect.bottom) {
                            this.GetScoreCheckID(curNote42);
                        }
                    }
                }
            }
        }
    };
    /**
     * 点击结束
     */
    GamePanel.prototype.TouchEndHandler = function (nTouchPathWay) {
        switch (nTouchPathWay) {
            case 1:
                this._bPerDown1 = false;
                this._bmpPerPress1.visible = false;
                this._shapePerDown1.visible = false;
                break;
            case 2:
                this._bPerDown2 = false;
                this._bmpPerPress2.visible = false;
                this._shapePerDown2.visible = false;
                break;
            case 3:
                this._bPerDown3 = false;
                this._bmpPerPress3.visible = false;
                this._shapePerDown3.visible = false;
                break;
            case 4:
                this._bPerDown4 = false;
                this._bmpPerPress4.visible = false;
                this._shapePerDown4.visible = false;
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
                var nTouchPathWayStart = this.GetTouchPathWay(event.localX, event.localY);
                this.TouchBeginHandler(nTouchPathWayStart);
                break;
            case egret.TouchEvent.TOUCH_END:
                var nTouchPathWayEnd = this.GetTouchPathWay(event.localX, event.localY);
                this.TouchEndHandler(nTouchPathWayEnd);
                break;
            default:
                break;
        }
    };
    /**
     * 游戏滑动事件
     */
    GamePanel.prototype.onGameTouchMove = function (event) {
        if (event.localX > 20 && event.localX < this.stage.stageWidth - 20 && event.localY > this.stage.stageHeight * 3 / 4 && event.localY < this.stage.stageHeight - 20) {
            var nPerDownType = this.GetTouchPathWay(event.localX, event.localY);
            switch (nPerDownType) {
                case 1:
                    if (!this._bPerDown1) {
                        this._bmpPerPress1.visible = true;
                        this._shapePerDown1.visible = true;
                    }
                    this._bPerDown1 = true;
                    if (this._bPerDown2) {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                        this._shapePerDown2.visible = false;
                    }
                    if (this._bPerDown3) {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                        this._shapePerDown3.visible = false;
                    }
                    if (this._bPerDown4) {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                        this._shapePerDown4.visible = false;
                    }
                    break;
                case 2:
                    if (!this._bPerDown2) {
                        this._bmpPerPress2.visible = true;
                        this._shapePerDown2.visible = true;
                    }
                    this._bPerDown2 = true;
                    if (this._bPerDown1) {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                        this._shapePerDown1.visible = false;
                    }
                    if (this._bPerDown3) {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                        this._shapePerDown3.visible = false;
                    }
                    if (this._bPerDown4) {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                        this._shapePerDown4.visible = false;
                    }
                    break;
                case 3:
                    if (!this._bPerDown3) {
                        this._bmpPerPress3.visible = true;
                        this._shapePerDown3.visible = true;
                    }
                    this._bPerDown3 = true;
                    if (this._bPerDown1) {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                        this._shapePerDown1.visible = false;
                    }
                    if (this._bPerDown2) {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                        this._shapePerDown2.visible = false;
                    }
                    if (this._bPerDown4) {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                        this._shapePerDown4.visible = false;
                    }
                    break;
                case 4:
                    if (!this._bPerDown4) {
                        this._bmpPerPress4.visible = true;
                        this._shapePerDown4.visible = true;
                    }
                    this._bPerDown4 = true;
                    if (this._bPerDown1) {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                        this._shapePerDown1.visible = false;
                    }
                    if (this._bPerDown2) {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                        this._shapePerDown2.visible = false;
                    }
                    if (this._bPerDown3) {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                        this._shapePerDown3.visible = false;
                    }
                    break;
                default:
                    break;
            }
        }
        else {
            if (this._bPerDown1) {
                this._bPerDown1 = false;
                this._bmpPerPress1.visible = false;
                this._shapePerDown1.visible = false;
            }
            if (this._bPerDown2) {
                this._bPerDown2 = false;
                this._bmpPerPress2.visible = false;
                this._shapePerDown2.visible = false;
            }
            if (this._bPerDown3) {
                this._bPerDown3 = false;
                this._bmpPerPress3.visible = false;
                this._shapePerDown3.visible = false;
            }
            if (this._bPerDown4) {
                this._bPerDown4 = false;
                this._bmpPerPress4.visible = false;
                this._shapePerDown4.visible = false;
            }
        }
    };
    /**
     * 键盘按下事件
     */
    GamePanel.prototype.OnKeyDown = function (event) {
        var szKeyCode = event.code;
        var nTouchPathWayStart = this.GetKeyPathWay(szKeyCode);
        this.TouchBeginHandler(nTouchPathWayStart);
    };
    /**
     * 键盘抬起事件
     */
    GamePanel.prototype.OnKeyUp = function (event) {
        var szKeyCode = event.code;
        var nTouchPathWayEnd = this.GetKeyPathWay(szKeyCode);
        this.TouchEndHandler(nTouchPathWayEnd);
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
            note.scaleX = note.scaleY = 0.2;
            note.x = this.stage.stageWidth * 19 / 48 + this.stage.stageWidth * nPathWay / 24 - 23;
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
            this._LayerNote.addChild(note);
            egret.Tween.get(note).to({ x: nTargetX, y: this.stage.stageHeight - 42, scaleX: 1, scaleY: 1 }, GameConst.NOTE_FLY_TIME, egret.Ease.sineIn).call(this.removeNote, this, [note]);
        }
        this.TouchPressHandler();
        return false;
    };
    GamePanel.prototype.removeNote = function (note) {
        NoteManager.getInstance().HideNote(note);
        this.ShowScoreCheck(3);
    };
    /**
     * 边线闪烁
     */
    GamePanel.prototype.SidelineBlink = function () {
        if (this._bmpSideLine) {
            if (this._bmpSideLine.alpha == 0) {
                egret.Tween.get(this._bmpSideLine).to({ alpha: 1 }, 500).call(this.SidelineBlink, this);
            }
            else if (this._bmpSideLine.alpha == 1) {
                egret.Tween.get(this._bmpSideLine).to({ alpha: 0 }, 500).call(this.SidelineBlink, this);
            }
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
     * 点击特效播放完毕
     */
    GamePanel.prototype.onPerMcComplete1 = function (event) {
        this._mcPer1.stop();
        this._mcPer1.visible = false;
    };
    GamePanel.prototype.onPerMcComplete2 = function (event) {
        this._mcPer2.stop();
        this._mcPer2.visible = false;
    };
    GamePanel.prototype.onPerMcComplete3 = function (event) {
        this._mcPer3.stop();
        this._mcPer3.visible = false;
    };
    GamePanel.prototype.onPerMcComplete4 = function (event) {
        this._mcPer4.stop();
        this._mcPer4.visible = false;
    };
    /**
     * 音乐播放完毕
     */
    GamePanel.prototype.onGameSoundComplete = function (event) {
        egret.stopTick(this.timerFunc, this);
        egret.clearTimeout(this._nTimeOutId1);
        this._bmpSideLine.alpha = 0;
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
        this._mcPer1.stop();
        this._mcPer1.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete1, this);
        if (this._mcPer1 && this._mcPer1.parent) {
            this._mcPer1.parent.removeChild(this._mcPer1);
        }
        this._mcPer2.stop();
        this._mcPer2.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete2, this);
        if (this._mcPer2 && this._mcPer2.parent) {
            this._mcPer2.parent.removeChild(this._mcPer2);
        }
        this._mcPer3.stop();
        this._mcPer3.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete3, this);
        if (this._mcPer3 && this._mcPer3.parent) {
            this._mcPer3.parent.removeChild(this._mcPer3);
        }
        this._mcPer4.stop();
        this._mcPer4.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete4, this);
        if (this._mcPer4 && this._mcPer4.parent) {
            this._mcPer4.parent.removeChild(this._mcPer4);
        }
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
        this._LayerScene = null;
        this._LayerNote = null;
        this._LayerUI = null;
        this._bmpBg = null;
        this._bmpPerBg = null;
        this._bmpPerPress1 = null;
        this._bmpPerPress2 = null;
        this._bmpPerPress3 = null;
        this._bmpPerPress4 = null;
        this._bmpSideLine = null;
        egret.clearTimeout(this._nTimeOutId1);
        this._mfcScene1 = null;
        this._mfcScene2 = null;
        this._mcScene = null;
        this._mfcPer = null;
        this._mcPer1 = null;
        this._mcPer2 = null;
        this._mcPer3 = null;
        this._mcPer4 = null;
        egret.clearTimeout(this._nTimeOutId2);
        this._bmpPerfect = null;
        this._bmpGreat = null;
        this._bmpMiss = null;
        this._bmtextCombo = null;
        this._bmtextScore = null;
        this._textPerNum = null;
        this._bmpScoreRate1 = null;
        this._bmpScoreRate2 = null;
        this._bmpScoreRate3 = null;
        this._btnReturn = null;
        this._soundReady = null;
        this._soundGame = null;
        this._shapePerDown1.graphics.clear();
        this._shapePerDown1 = null;
        this._shapePerDown2.graphics.clear();
        this._shapePerDown2 = null;
        this._shapePerDown3.graphics.clear();
        this._shapePerDown3 = null;
        this._shapePerDown4.graphics.clear();
        this._shapePerDown4 = null;
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