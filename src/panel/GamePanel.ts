class GamePanel extends egret.DisplayObjectContainer
{
    //容器层次
    private _LayerScene:egret.DisplayObjectContainer;
    private _LayerNote:egret.DisplayObjectContainer;
    private _LayerUI:egret.DisplayObjectContainer;
    //背景图
    private _bmpBg:egret.Bitmap;
    private _bmpPerBg:egret.Bitmap;
    //按键选中
    private _bmpPerPress1:egret.Bitmap;
    private _bmpPerPress2:egret.Bitmap;
    private _bmpPerPress3:egret.Bitmap;
    private _bmpPerPress4:egret.Bitmap;
    //闪烁边线
    private _bmpSideLine:egret.Bitmap;
    private _nTimeOutId1:number;
    //场景动画
    private _mfcScene1:egret.MovieClipDataFactory;
    private _mfcScene2:egret.MovieClipDataFactory;
    private _mcScene:egret.MovieClip;
    private _nTimeOutId2:number;
    //点击特效
    private _mfcPer:egret.MovieClipDataFactory;
    private _mcPer1:egret.MovieClip;
    private _mcPer2:egret.MovieClip;
    private _mcPer3:egret.MovieClip;
    private _mcPer4:egret.MovieClip;
    //判定显示
    private _bmpPerfect:egret.Bitmap;
    private _bmpGreat:egret.Bitmap;
    private _bmpMiss:egret.Bitmap;
    //音符连击，分数，音符计数
    private _bmtextCombo:egret.BitmapText;
    private _nCurCombo:number;
    private _bmtextScore:egret.BitmapText;
    private _nScore:number;
    private _textPerNum:egret.TextField;
    private _nPerNum:number;
    //返回按钮
    private _btnReturn:MyButton;
    //准备音效
    private _soundReady:egret.Sound;
    private _channelReady:egret.SoundChannel;
    //背景音乐
    private _soundGame:egret.Sound;
    private _channelGame:egret.SoundChannel;
    //游戏时间
    private _nGameTime:number;
    private _nTimeFlag:number;
    //当前使用的音符下标
    private _nNoteIndex:number;
    //区域点击状态
    private _bPerDown1:boolean;
    private _bPerDown2:boolean;
    private _bPerDown3:boolean;
    private _bPerDown4:boolean;
    //有效点击区域
    private _rectClick1:egret.Rectangle;
    private _rectClick2:egret.Rectangle;
    private _rectClick3:egret.Rectangle;
    private _rectClick4:egret.Rectangle;
    //判定区域
    private _rectPerfect:egret.Rectangle;
    private _rectGreat:egret.Rectangle;
    private _rectMiss:egret.Rectangle;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.touchEnabled = true;
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);

        this.InitData();
        this.UpdateShow();
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onGameTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGameTouchMove, this);

        this.Clear();
    }

    /**
     * 显示数据初始化
     */
    private InitData():void
    {
        this._nCurCombo = 0;
        this._nScore = 0;
        this._nPerNum = 0;
        this._nGameTime = 0;
        this._nTimeFlag = 0;
        this._nNoteIndex = 0;
        this._bPerDown1 = false;
        this._bPerDown2 = false;
        this._bPerDown3 = false;
        this._bPerDown4 = false;
    }

    /**
     * 更新显示
     */
    private UpdateShow():void
    {
        //容器层次
        if (!this._LayerScene)
        {
            this._LayerScene = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerScene);
        if (!this._LayerNote)
        {
            this._LayerNote = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerNote);
        if (!this._LayerUI)
        {
            this._LayerUI = new egret.DisplayObjectContainer();
        }
        this.addChild(this._LayerUI);
        //背景图
        if (!this._bmpBg)
        {
            this._bmpBg = new egret.Bitmap();
        }
        var texture:egret.Texture = RES.getRes("image_gameBg_jpg");
        this._bmpBg.texture = texture;
        this._LayerScene.addChild(this._bmpBg);
        if (!this._bmpPerBg)
        {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2:egret.Texture = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.stageHeight - 543;
        this._LayerScene.addChild(this._bmpPerBg);
        //按键选中
        if (!this._bmpPerPress1)
        {
            this._bmpPerPress1 = new egret.Bitmap();
        }
        var texture7:egret.Texture = RES.getRes("image_keyPress1_png");
        this._bmpPerPress1.texture = texture7;
        this._bmpPerPress1.x = this.stage.stageWidth * 29 / 192 - this._bmpPerPress1.width / 2;
        this._bmpPerPress1.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress1.height / 2;
        this._bmpPerPress1.visible = false;
        this._LayerScene.addChild(this._bmpPerPress1);
        if (!this._bmpPerPress2)
        {
            this._bmpPerPress2 = new egret.Bitmap();
        }
        var texture8:egret.Texture = RES.getRes("image_keyPress2_png");
        this._bmpPerPress2.texture = texture8;
        this._bmpPerPress2.x = this.stage.stageWidth * 73 / 192 - this._bmpPerPress2.width / 2;
        this._bmpPerPress2.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress2.height / 2;
        this._bmpPerPress2.visible = false;
        this._LayerScene.addChild(this._bmpPerPress2);
        if (!this._bmpPerPress3)
        {
            this._bmpPerPress3 = new egret.Bitmap();
        }
        var texture9:egret.Texture = RES.getRes("image_keyPress3_png");
        this._bmpPerPress3.texture = texture9;
        this._bmpPerPress3.x = this.stage.stageWidth * 119 / 192 - this._bmpPerPress3.width / 2;
        this._bmpPerPress3.y = this.stage.stageHeight * 55 / 64 - this._bmpPerPress3.height / 2;
        this._bmpPerPress3.visible = false;
        this._LayerScene.addChild(this._bmpPerPress3);
        if (!this._bmpPerPress4)
        {
            this._bmpPerPress4 = new egret.Bitmap();
        }
        var texture10:egret.Texture = RES.getRes("image_keyPress4_png");
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
        if (!this._bmpSideLine)
        {
            this._bmpSideLine = new egret.Bitmap();
        }
        var texture3:egret.Texture = RES.getRes("image_sideline_png");
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
        this._nTimeOutId2 = egret.setTimeout(function(){this._mcScene.visible = true;this._mcScene.play(1);}, this, 4000);
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
        if (!this._bmpPerfect)
        {
            this._bmpPerfect = new egret.Bitmap();
        }
        var texture4:egret.Texture = RES.getRes("image_perfect_png");
        this._bmpPerfect.texture = texture4;
        this._bmpPerfect.visible = false;
        this._LayerUI.addChild(this._bmpPerfect);
        if (!this._bmpGreat)
        {
            this._bmpGreat = new egret.Bitmap();
        }
        var texture5:egret.Texture = RES.getRes("image_great_png");
        this._bmpGreat.texture = texture5;
        this._bmpGreat.visible = false;
        this._LayerUI.addChild(this._bmpGreat);
        if (!this._bmpMiss)
        {
            this._bmpMiss = new egret.Bitmap();
        }
        var texture6:egret.Texture = RES.getRes("image_miss_png");
        this._bmpMiss.texture = texture6;
        this._bmpMiss.visible = false;
        this._LayerUI.addChild(this._bmpMiss);
        //音符连击，分数，音符计数
        if (!this._bmtextCombo)
        {
            this._bmtextCombo = new egret.BitmapText();
        }
        this._bmtextCombo.font = RES.getRes("font_combo_fnt");
        this._bmtextCombo.width = 160;
        this._bmtextCombo.height = 40;
        this._bmtextCombo.textAlign = egret.HorizontalAlign.CENTER;
        this._bmtextCombo.x = (this.stage.stageWidth - this._bmtextCombo.width) / 2;
        this._bmtextCombo.y = this.stage.stageHeight * 69 / 256 - this._bmtextCombo.height / 2;
        this._LayerUI.addChild(this._bmtextCombo);
        if (!this._bmtextScore)
        {
            this._bmtextScore = new egret.BitmapText();
        }
        this._bmtextScore.font = RES.getRes("font_score_fnt");
        this._bmtextScore.width = 240;
        this._bmtextScore.height = 30;
        this._bmtextScore.textAlign = egret.HorizontalAlign.CENTER;
        this._bmtextScore.x = this.stage.stageWidth * 165 / 192 - this._bmtextScore.width / 2;
        this._bmtextScore.y = this.stage.stageHeight * 5 / 128 - this._bmtextScore.height / 2;
        this._LayerUI.addChild(this._bmtextScore);
        if (!this._textPerNum)
        {
            this._textPerNum = new egret.TextField();
        }
        this._textPerNum.size = 60;
        this._textPerNum.bold = true;
        this._textPerNum.textColor = 0xffff00;
        this._textPerNum.x = this.stage.stageWidth - 180;
        this._textPerNum.y = 80;
        this._LayerUI.addChild(this._textPerNum);
        //返回按钮
        if (!this._btnReturn)
        {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this._LayerUI.addChild(this._btnReturn);
        //播放准备音效
        if (!this._soundReady)
        {
            this._soundReady = RES.getRes("sound_ready_wav");
        }
        this._channelReady = this._soundReady.play(0, 1);
        //载入游戏音乐
        if (!this._soundGame)
        {
            this._soundGame = RES.getRes("sound_game_mp3");
        }
        this._channelGame = this._soundGame.play(0, 1);
        this._channelGame.addEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
        //启动计时器
        this._nTimeFlag = egret.getTimer();
        egret.startTick(this.timerFunc, this);
    }

    /**
     * 获取点击是否在有效区域，在则返回所在音符滑道，否则返回0
     */
    private GetTouchPathWay(nPosX:number, nPosY:number):number
    {
        if (this._rectClick1.contains(nPosX, nPosY))
        {
            return 1;
        }
        if (this._rectClick2.contains(nPosX, nPosY))
        {
            return 2;
        }
        if (this._rectClick3.contains(nPosX, nPosY))
        {
            return 3;
        }
        if (this._rectClick4.contains(nPosX, nPosY))
        {
            return 4;
        }
        return 0;
    }

    /**
     * 音符判定
     */
    private GetScoreCheckID(note:NoteItem):number
    {
        var nCheckId:number = 0;
        if (note)
        {
            var nNoteY:number = note.height * note.scaleY / 2 + note.y;
            if (nNoteY >= this._rectPerfect.top && nNoteY <= this._rectPerfect.bottom)
            {
                nCheckId = 1;
            }
            else if (nNoteY >= this._rectGreat.top && nNoteY <= this._rectGreat.bottom)
            {
                nCheckId = 2;
            }
            else if (nNoteY >= this._rectMiss.top && nNoteY <= this._rectMiss.bottom)
            {
                nCheckId = 3;
            }
            if (nCheckId > 0)
            {
                NoteManager.getInstance().HideNote(note);
                this.PlayPerMc(note.nPathWay);
            }
        }
        if (nCheckId > 0)
        {
            this.ShowScoreCheck(nCheckId);
        }
        return nCheckId;
    }

    /**
     * 判定显示
     */
    private ShowScoreCheck(nCheckId:number):void
    {
        var bmp:egret.Bitmap;
        if (nCheckId == 1)
        {
            bmp = this._bmpPerfect;
            this._nScore += GameConst.PERFECT_SCORE;
        }
        else if (nCheckId == 2)
        {
            bmp = this._bmpGreat;
            this._nScore += GameConst.GREAT_SCORE;
        }
        else if (nCheckId == 3)
        {
            bmp = this._bmpMiss;
        }
        if (bmp)
        {
            egret.Tween.removeTweens(bmp);
            bmp.scaleX = bmp.scaleY = 1;
            bmp.x = (this.stage.stageWidth - bmp.width) / 2;
            bmp.y = this.stage.stageHeight * 23 / 128 - bmp.height / 2;
            bmp.visible = true;
            var nTarX:number = bmp.x + bmp.width * 9 / 20;
            var nTarY:number = bmp.y + bmp.height * 9 / 20;
            egret.Tween.get(bmp).to({x:nTarX, y:nTarY, scaleX:0.1, scaleY:0.1}, 200).call(this.removeScoreCheck, this, [bmp]);
        }
        if (nCheckId < 3)
        {
            this._nCurCombo ++;
        }
        else
        {
            this._nCurCombo = 0;
        }
        if (this._bmtextCombo)
        {
            if (this._nCurCombo > 0)
            {
                this._bmtextCombo.text = "" + this._nCurCombo;
            }
            else
            {
                this._bmtextCombo.text = "";
            }
        }
        if (this._bmtextScore)
        {
            this._bmtextScore.text = "" + this._nScore;
        }
        this._nPerNum ++;
        if (this._textPerNum)
        {
            this._textPerNum.text = "" + this._nPerNum;
        }
    }

    private removeScoreCheck(bmp:egret.Bitmap):void
    {
        bmp.visible = false;
    }

    /**
     * 点击特效
     */
    private PlayPerMc(nPer:number):void
    {
        switch (Math.floor(nPer))
        {
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
    }

    /**
     * 点击开始
     */
    private TouchBeginHandler(nTouchPathWay:number):void
    {
        if (nTouchPathWay > 0)
        {
            var nType1:number = nTouchPathWay * 10;
            var nType2:number = nTouchPathWay * 10 + 1;
            var objShow:egret.HashObject = NoteManager.getInstance().objShow;
            if (objShow)
            {
                var arrNote1:any[] = objShow[nType1];
                var arrNote2:any[] = objShow[nType2];
                if (arrNote1 && arrNote1.length > 0)
                {
                    for (var iIndex1 = 0; iIndex1 < arrNote1.length; ++iIndex1)
                    {
                        var curNote1:NoteItem = arrNote1[iIndex1];
                        this.GetScoreCheckID(curNote1);
                    }
                }
                if (arrNote2 && arrNote2.length > 0)
                {
                    for (var iIndex2 = 0; iIndex2 < arrNote2.length; ++iIndex2)
                    {
                        var curNote2:NoteItem = arrNote2[iIndex2];
                        this.GetScoreCheckID(curNote2);
                    }
                }
            }
            switch (nTouchPathWay)
            {
                case 1:
                    this._bPerDown1 = true;
                    this._bmpPerPress1.visible = true;
                    break;
                case 2:
                    this._bPerDown2 = true;
                    this._bmpPerPress2.visible = true;
                    break;
                case 3:
                    this._bPerDown3 = true;
                    this._bmpPerPress3.visible = true;
                    break;
                case 4:
                    this._bPerDown4 = true;
                    this._bmpPerPress4.visible = true;
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 点击持续
     */
    private TouchPressHandler():void
    {
        var objShow:egret.HashObject = NoteManager.getInstance().objShow;
        if (objShow)
        {
            if (this._bPerDown1)
            {
                var arrNote11:any[] = objShow[12];
                var arrNote12:any[] = objShow[13];
                if (arrNote11 && arrNote11.length > 0)
                {
                    for (var iIndex11 = 0; iIndex11 < arrNote11.length; ++iIndex11)
                    {
                        var curNote11:NoteItem = arrNote11[iIndex11];
                        var nNoteY11:number = curNote11.height * curNote11.scaleY / 2 + curNote11.y;
                        if (nNoteY11 >= this._rectPerfect.top && nNoteY11 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote11);
                        }
                    }
                }
                if (arrNote12 && arrNote12.length > 0)
                {
                    for (var iIndex12 = 0; iIndex12 < arrNote12.length; ++iIndex12)
                    {
                        var curNote12:NoteItem = arrNote12[iIndex12];
                        var nNoteY12:number = curNote12.height * curNote12.scaleY / 2 + curNote12.y;
                        if (nNoteY12 >= this._rectPerfect.top && nNoteY12 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote12);
                        }
                    }
                }
            }
            if (this._bPerDown2)
            {
                var arrNote21:any[] = objShow[22];
                var arrNote22:any[] = objShow[23];
                if (arrNote21 && arrNote21.length > 0)
                {
                    for (var iIndex21 = 0; iIndex21 < arrNote21.length; ++iIndex21)
                    {
                        var curNote21:NoteItem = arrNote21[iIndex21];
                        var nNoteY21:number = curNote21.height * curNote21.scaleY / 2 + curNote21.y;
                        if (nNoteY21 >= this._rectPerfect.top && nNoteY21 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote21);
                        }
                    }
                }
                if (arrNote22 && arrNote22.length > 0)
                {
                    for (var iIndex22 = 0; iIndex22 < arrNote22.length; ++iIndex22)
                    {
                        var curNote22:NoteItem = arrNote22[iIndex22];
                        var nNoteY22:number = curNote22.height * curNote22.scaleY / 2 + curNote22.y;
                        if (nNoteY22 >= this._rectPerfect.top && nNoteY22 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote22);
                        }
                    }
                }
            }
            if (this._bPerDown3)
            {
                var arrNote31:any[] = objShow[32];
                var arrNote32:any[] = objShow[33];
                if (arrNote31 && arrNote31.length > 0)
                {
                    for (var iIndex31 = 0; iIndex31 < arrNote31.length; ++iIndex31)
                    {
                        var curNote31:NoteItem = arrNote31[iIndex31];
                        var nNoteY31:number = curNote31.height * curNote31.scaleY / 2 + curNote31.y;
                        if (nNoteY31 >= this._rectPerfect.top && nNoteY31 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote31);
                        }
                    }
                }
                if (arrNote32 && arrNote32.length > 0)
                {
                    for (var iIndex32 = 0; iIndex32 < arrNote32.length; ++iIndex32)
                    {
                        var curNote32:NoteItem = arrNote32[iIndex32];
                        var nNoteY32:number = curNote32.height * curNote32.scaleY / 2 + curNote32.y;
                        if (nNoteY32 >= this._rectPerfect.top && nNoteY32 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote32);
                        }
                    }
                }
            }
            if (this._bPerDown4)
            {
                var arrNote41:any[] = objShow[42];
                var arrNote42:any[] = objShow[43];
                if (arrNote41 && arrNote41.length > 0)
                {
                    for (var iIndex41 = 0; iIndex41 < arrNote41.length; ++iIndex41)
                    {
                        var curNote41:NoteItem = arrNote41[iIndex41];
                        var nNoteY41:number = curNote41.height * curNote41.scaleY / 2 + curNote41.y;
                        if (nNoteY41 >= this._rectPerfect.top && nNoteY41 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote41);
                        }
                    }
                }
                if (arrNote42 && arrNote42.length > 0)
                {
                    for (var iIndex42 = 0; iIndex42 < arrNote42.length; ++iIndex42)
                    {
                        var curNote42:NoteItem = arrNote42[iIndex42];
                        var nNoteY42:number = curNote42.height * curNote42.scaleY / 2 + curNote42.y;
                        if (nNoteY42 >= this._rectPerfect.top && nNoteY42 <= this._rectPerfect.bottom)
                        {
                            this.GetScoreCheckID(curNote42);
                        }
                    }
                }
            }
        }
    }

    /**
     * 点击结束
     */
    private TouchEndHandler(nTouchPathWay:number):void
    {
        switch (nTouchPathWay)
        {
            case 1:
                this._bPerDown1 = false;
                this._bmpPerPress1.visible = false;
                break;
            case 2:
                this._bPerDown2 = false;
                this._bmpPerPress2.visible = false;
                break;
            case 3:
                this._bPerDown3 = false;
                this._bmpPerPress3.visible = false;
                break;
            case 4:
                this._bPerDown4 = false;
                this._bmpPerPress4.visible = false;
                break;
            default:
                break;
        }
    }

    /**
     * 游戏点击事件
     */
    private onGameTouch(event:egret.TouchEvent) 
    {
        switch (event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                var nTouchPathWayStart:number = this.GetTouchPathWay(event.localX, event.localY);
                this.TouchBeginHandler(nTouchPathWayStart);
                break;
            case egret.TouchEvent.TOUCH_END:
                var nTouchPathWayEnd:number = this.GetTouchPathWay(event.localX, event.localY);
                this.TouchEndHandler(nTouchPathWayEnd);
                break;
            default:
                break;
        }
    }

    /**
     * 游戏滑动事件
     */
    private onGameTouchMove(event:egret.TouchEvent)
    {
        if (event.localX > 20 && event.localX < this.stage.stageWidth - 20 && event.localY > this.stage.stageHeight * 3/ 4 && event.localY < this.stage.stageHeight - 20)
        {
            var nPerDownType:number = this.GetTouchPathWay(event.localX, event.localY);
            switch (nPerDownType)
            {
                case 1:
                    if (!this._bPerDown1)
                    {
                        this._bmpPerPress1.visible = true;
                    }
                    this._bPerDown1 = true;
                    if (this._bPerDown2)
                    {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                    }
                    if (this._bPerDown3)
                    {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                    }
                    if (this._bPerDown4)
                    {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                    }
                    break;
                case 2:
                    if (!this._bPerDown2)
                    {
                        this._bmpPerPress2.visible = true;
                    }
                    this._bPerDown2 = true;
                    if (this._bPerDown1)
                    {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                    }
                    if (this._bPerDown3)
                    {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                    }
                    if (this._bPerDown4)
                    {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                    }
                    break;
                case 3:
                    if (!this._bPerDown3)
                    {
                        this._bmpPerPress3.visible = true;
                    }
                    this._bPerDown3 = true;
                    if (this._bPerDown1)
                    {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                    }
                    if (this._bPerDown2)
                    {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                    }
                    if (this._bPerDown4)
                    {
                        this._bPerDown4 = false;
                        this._bmpPerPress4.visible = false;
                    }
                    break;
                case 4:
                    if (!this._bPerDown4)
                    {
                        this._bmpPerPress4.visible = true;
                    }
                    this._bPerDown4 = true;
                    if (this._bPerDown1)
                    {
                        this._bPerDown1 = false;
                        this._bmpPerPress1.visible = false;
                    }
                    if (this._bPerDown2)
                    {
                        this._bPerDown2 = false;
                        this._bmpPerPress2.visible = false;
                    }
                    if (this._bPerDown3)
                    {
                        this._bPerDown3 = false;
                        this._bmpPerPress3.visible = false;
                    }
                    break;
                default:
                    break;
            }
        }
        else
        {
            if (this._bPerDown1)
            {
                this._bPerDown1 = false;
                this._bmpPerPress1.visible = false;
            }
            if (this._bPerDown2)
            {
                this._bPerDown2 = false;
                this._bmpPerPress2.visible = false;
            }
            if (this._bPerDown3)
            {
                this._bPerDown3 = false;
                this._bmpPerPress3.visible = false;
            }
            if (this._bPerDown4)
            {
                this._bPerDown4 = false;
                this._bmpPerPress4.visible = false;
            }
        }
    }

    /**
     * 计时器回调
     */
    private timerFunc(curTime:number):boolean 
    {
        this._nGameTime = (curTime - this._nTimeFlag);
        var arrBorn:any[] = ConfigManager.getInstance()._arrBorn;
        var nTime:number;
        var nPathWay:number;
        var nType:number;
        while (this._nNoteIndex < arrBorn.length && this._nGameTime >= arrBorn[this._nNoteIndex].time)
        {
            nTime = arrBorn[this._nNoteIndex].time;
            nPathWay = arrBorn[this._nNoteIndex].track;
            nType = arrBorn[this._nNoteIndex].type;
            this._nNoteIndex ++;

            var note:NoteItem = NoteManager.getInstance().GetNote(nTime, nPathWay, nType);
            note.scaleX = note.scaleY = 0.2;
            note.x = this.stage.stageWidth * 19 / 48 + this.stage.stageWidth * nPathWay / 24 - 23;
            note.y = this.stage.stageHeight * 27 / 128;
            var nTargetX:number;
            if (nPathWay == 1)
            {
                nTargetX = this.stage.stageWidth * 17 / 192 - 114;
            }
            else if (nPathWay == 2)
            {
                nTargetX = this.stage.stageWidth * 23 / 64 - 114;
            }
            else if (nPathWay == 3)
            {
                nTargetX = this.stage.stageWidth * 41 / 64 - 114;
            }
            else if (nPathWay == 4)
            {
                nTargetX = this.stage.stageWidth * 175 / 192 - 114;
            }
            this._LayerNote.addChild(note);
            egret.Tween.get(note).to({x:nTargetX, y:this.stage.stageHeight - 42, scaleX:1, scaleY:1}, GameConst.NOTE_FLY_TIME, egret.Ease.sineIn).call(this.removeNote, this, [note]);
        }

        this.TouchPressHandler();
        
        return false;
    }

    private removeNote(note:NoteItem):void
    {
        NoteManager.getInstance().HideNote(note);
        this.ShowScoreCheck(3);
    }

    /**
     * 边线闪烁
     */
    private SidelineBlink():void
    {
        if (this._bmpSideLine)
        {
            if (this._bmpSideLine.alpha == 0)
            {
                egret.Tween.get(this._bmpSideLine).to({alpha:1}, 500).call(this.SidelineBlink, this);
            }
            else if (this._bmpSideLine.alpha == 1)
            {
                egret.Tween.get(this._bmpSideLine).to({alpha:0}, 500).call(this.SidelineBlink, this);
            }
        }
    }

    /**
     * 场景特效播放完毕
     */
    private onSceneMcComplete(event:egret.Event):void
    {
        var szLable:string = this._mcScene.currentLabel;
        switch (szLable)
        {
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
    }

    /**
     * 点击特效播放完毕
     */
    private onPerMcComplete1(event:egret.Event):void
    {
        this._mcPer1.stop();
        this._mcPer1.visible = false;
    }

    private onPerMcComplete2(event:egret.Event):void
    {
        this._mcPer2.stop();
        this._mcPer2.visible = false;
    }

    private onPerMcComplete3(event:egret.Event):void
    {
        this._mcPer3.stop();
        this._mcPer3.visible = false;
    }

    private onPerMcComplete4(event:egret.Event):void
    {
        this._mcPer4.stop();
        this._mcPer4.visible = false;
    }

    /**
     * 音乐播放完毕
     */
    private onGameSoundComplete(event:egret.Event):void
    {
        egret.stopTick(this.timerFunc, this);
        egret.clearTimeout(this._nTimeOutId1);
        this._bmpSideLine.alpha = 0;
        this._mcScene.stop();
        this._mcScene.removeEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        if (this._mcScene && this._mcScene.parent)
        {
            this._mcScene.parent.removeChild(this._mcScene);
        }
    }

    /**
     * 返回主界面
     */
    private onReturnTouch(event:egret.TouchEvent) 
    {
        EventManager.getInstance().dispatchEvent(new egret.Event(DataEvent.EVENT_SHOW_START));
    }

    /**
     * 场景清理
     */
    private Clear():void
    {
        this._mcScene.stop();
        this._mcScene.removeEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        if (this._mcScene && this._mcScene.parent)
        {
            this._mcScene.parent.removeChild(this._mcScene);
        }
        if (this._channelReady)
        {
            this._channelReady.stop();
            this._channelReady = null;
        }
        if (this._channelGame)
        {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        this._mcPer1.stop();
        this._mcPer1.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete1, this);
        if (this._mcPer1 && this._mcPer1.parent)
        {
            this._mcPer1.parent.removeChild(this._mcPer1);
        }
        this._mcPer2.stop();
        this._mcPer2.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete2, this);
        if (this._mcPer2 && this._mcPer2.parent)
        {
            this._mcPer2.parent.removeChild(this._mcPer2);
        }
        this._mcPer3.stop();
        this._mcPer3.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete3, this);
        if (this._mcPer3 && this._mcPer3.parent)
        {
            this._mcPer3.parent.removeChild(this._mcPer3);
        }
        this._mcPer4.stop();
        this._mcPer4.removeEventListener(egret.Event.COMPLETE, this.onPerMcComplete4, this);
        if (this._mcPer4 && this._mcPer4.parent)
        {
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
        this._btnReturn = null;
        this._soundReady = null;
        this._soundGame = null;
        this._rectClick1 = null;
        this._rectClick2 = null;
        this._rectClick3 = null;
        this._rectClick4 = null;
        this._rectPerfect = null;
        this._rectGreat = null;
        this._rectMiss = null;
    }
}