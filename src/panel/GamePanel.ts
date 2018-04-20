class GamePanel extends egret.DisplayObjectContainer
{
    //背景图
    private _bmpBg:egret.Bitmap;
    private _bmpPerBg:egret.Bitmap;
    //闪烁边线
    private _bmpSideLine:egret.Bitmap;
    private _nTimeOutId1:number;
    //场景动画
    private _mfcScene1:egret.MovieClipDataFactory;
    private _mfcScene2:egret.MovieClipDataFactory;
    private _mcScene:egret.MovieClip;
    private _nTimeOutId2:number;
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
    //按键按下状态

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
        //背景图
        if (!this._bmpBg)
        {
            this._bmpBg = new egret.Bitmap();
        }
        var texture:egret.Texture = RES.getRes("image_gameBg_jpg");
        this._bmpBg.texture = texture;
        this.addChild(this._bmpBg);
        if (!this._bmpPerBg)
        {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2:egret.Texture = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.stageHeight - 543;
        this.addChild(this._bmpPerBg);
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
        this.addChild(this._bmpSideLine);
        this._nTimeOutId1 = egret.setTimeout(this.SidelineBlink, this, 4000);
        //场景特效
        this._mfcScene1 = new egret.MovieClipDataFactory(RES.getRes("movie_scene1_json"), RES.getRes("movie_scene1_png"));
        this._mfcScene2 = new egret.MovieClipDataFactory(RES.getRes("movie_scene2_json"), RES.getRes("movie_scene2_png"));
        this._mcScene = new egret.MovieClip(this._mfcScene1.generateMovieClipData("scene1"));
        this._mcScene.addEventListener(egret.Event.COMPLETE, this.onSceneMcComplete, this);
        this.addChild(this._mcScene);
        this._mcScene.visible = false;
        this._nTimeOutId2 = egret.setTimeout(function(){this._mcScene.visible = true;this._mcScene.play(1);}, this, 4000);
        //返回按钮
        if (!this._btnReturn)
        {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this.addChild(this._btnReturn);
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
        }
        return nCheckId;
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
                        if (this.GetScoreCheckID(curNote1) > 0)
                        {
                            NoteManager.getInstance().HideNote(curNote1);
                        }
                    }
                }
                if (arrNote2 && arrNote2.length > 0)
                {
                    for (var iIndex2 = 0; iIndex2 < arrNote2.length; ++iIndex2)
                    {
                        var curNote2:NoteItem = arrNote2[iIndex2];
                        if (this.GetScoreCheckID(curNote2) > 0)
                        {
                            NoteManager.getInstance().HideNote(curNote2);
                        }
                    }
                }
            }
        }
    }

    /**
     * 点击结束
     */
    private TouchEndHandler():void
    {
    }

    /**
     * 游戏点击事件
     */
    private onGameTouch(event:egret.TouchEvent) 
    {
        switch (event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                var nTouchPathWay:number = this.GetTouchPathWay(event.localX, event.localY);
                this.TouchBeginHandler(nTouchPathWay);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.TouchEndHandler();
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
        if (event.localX > 20 && event.localX < 243 && event.localY > 20 && event.localY < 71)
        {
        }
        else
        {
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
            note.scaleX = note.scaleY = 0.01;
            note.x = this.stage.stageWidth * 19 / 48 + this.stage.stageWidth * nPathWay / 24;
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
            this.addChild(note);
            egret.Tween.get(note).to({x:nTargetX, y:this.stage.stageHeight - 42, scaleX:1, scaleY:1}, GameConst.NOTE_FLY_TIME, egret.Ease.sineIn).call(this.removeNote, this, [note]);
        }
        return false;
    }

    private removeNote(note:NoteItem):void
    {
        NoteManager.getInstance().HideNote(note);
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
     * 音乐播放完毕
     */
    private onGameSoundComplete(event:egret.Event):void
    {
        egret.stopTick(this.timerFunc, this);
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
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
        this._bmpBg = null;
        this._bmpPerBg = null;
        this._bmpSideLine = null;
        egret.clearTimeout(this._nTimeOutId1);
        this._mfcScene1 = null;
        this._mfcScene2 = null;
        this._mcScene = null;
        egret.clearTimeout(this._nTimeOutId2);
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