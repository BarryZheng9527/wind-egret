class GamePanel extends egret.DisplayObjectContainer
{
    //背景图
    private _bmpBg:egret.Bitmap;
    private _bmpNigthBg:egret.Bitmap;
    private _bmpPerBg:egret.Bitmap;
    //返回按钮
    private _btnReturn:MyButton;
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

        this._soundGame = RES.getRes("sound_game_mp3");

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.Init();
        this.UpdateShow();
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.clearScene();
    }

    /**
     * 显示数据初始化
     */
    private Init():void
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
        if (!this._bmpNigthBg)
        {
            this._bmpNigthBg = new egret.Bitmap();
        }
        var texture1:egret.Texture = RES.getRes("image_gameNightBg_jpg");
        this._bmpNigthBg.texture = texture1;
        this.addChild(this._bmpNigthBg);
        this._bmpNigthBg.visible = false;
        if (!this._bmpPerBg)
        {
            this._bmpPerBg = new egret.Bitmap();
        }
        var texture2:egret.Texture = RES.getRes("image_perBg_png");
        this._bmpPerBg.texture = texture2;
        this._bmpPerBg.y = this.stage.height - 543;
        this.addChild(this._bmpPerBg);
        if (!this._btnReturn)
        {
            this._btnReturn = new MyButton();
        }
        this._btnReturn.SetResource("image_return_png", "image_return_png", this.onReturnTouch);
        this._btnReturn.x = this.stage.stageWidth - this._btnReturn.width;
        this.addChild(this._btnReturn);
        //载入游戏音乐
        if (!this._soundGame)
        {
            this._soundGame = RES.getRes("sound_start_mp3");
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
            note.x = this.stage.stageWidth * (nPathWay * 4 - 3) / 16;
            note.y = -note.height;
            this.addChild(note);
            egret.Tween.get(note).to({y:this.stage.stageHeight}, 1000).call(this.removeNote, this, [note]);
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
     * 音乐播放完毕
     */
    private onGameSoundComplete(e:egret.Event):void
    {
        if (this._channelGame)
        {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        egret.stopTick(this.timerFunc, this);
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
    private clearScene():void
    {
        this._nGameTime = 0;
        this._nNoteIndex = 0;

        if (this._channelGame)
        {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        egret.stopTick(this.timerFunc, this);
        NoteManager.getInstance().HideAllNote();
    }
}