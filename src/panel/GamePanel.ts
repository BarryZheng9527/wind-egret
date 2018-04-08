class GamePanel extends egret.DisplayObjectContainer
{
    //背景图
    private _bmpBg:egret.Bitmap;
    private _bmpPerBg:egret.Bitmap;
    //闪烁边线
    private _bmpSideLine:egret.Bitmap;
    //场景动画
    private _mfcScene1:egret.MovieClipDataFactory;
    private _mfcScene2:egret.MovieClipDataFactory;
    private _mcScene:egret.MovieClip;
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

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.InitData();
        this.UpdateShow();
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

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
    }

    /**
     * 更新显示
     */
    private UpdateShow():void
    {
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
        this._bmpPerBg.y = this.stage.height - 543;
        this.addChild(this._bmpPerBg);
        //边线闪烁
        if (!this._bmpSideLine)
        {
            this._bmpSideLine = new egret.Bitmap();
        }
        var texture3:egret.Texture = RES.getRes("image_sideline_png");
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
        egret.setTimeout(function(){this._mcScene.visible = true;this._mcScene.play(1);}, this, 4000);
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
        if (note && note.parent)
        {
            note.parent.removeChild(note);
        }
        NoteManager.getInstance().HideNote(note);
    }

    /**
     * 边线闪烁
     */
    private SidelineBlink():void
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
        this._mfcScene1 = null;
        this._mfcScene2 = null;
        this._mcScene = null;
        this._btnReturn = null;
        this._soundReady = null;
        this._soundGame = null;
        this._nGameTime = 0;
        this._nNoteIndex = 0;
    }
}