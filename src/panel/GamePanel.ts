class GamePanel extends egret.DisplayObjectContainer
{
    //音符飞行时间，与配置表结合使用
    public static NOTE_FLY_TIME:number = 1;
    //计时间隔，毫秒
    public static INTERVAL_TIME:number = 10;

    //音符轨道
    private _pathWayBg1:egret.Shape;
    private _pathWayBg2:egret.Shape;
    private _pathWayBg3:egret.Shape;
    private _pathWayBg4:egret.Shape;
    private _shapeReturn:egret.Shape;
    private _labelReturn:eui.Label;
    //背景音乐
    private _soundGame:egret.Sound;
    private _channelGame:egret.SoundChannel;
    //游戏时间
    private _nGameTime:number;
    private _timer:egret.Timer;
    //当前使用的音符下标
    private _nNoteIndex:number;

    public constructor()
    {
        super();

        this._soundGame = RES.getRes("sound_game_mp3");
        this._nGameTime = 0;
        this._timer = new egret.Timer(GamePanel.INTERVAL_TIME, 0);
        this._nNoteIndex = 0;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        //绘制音符飞行轨道和返回按钮
        this.drawPathWayBg();
        //载入游戏音乐
        this._channelGame = this._soundGame.play(0, 1);
        this._channelGame.addEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
        //启动计时器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this._shapeReturn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReturnTouch, this);
        this._shapeReturn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onReturnTouch, this);

        this.clearScene();
    }

    /**
     * 计时器回调
     */
    private timerFunc(event:egret.Event) 
    {
        this._nGameTime += GamePanel.INTERVAL_TIME;
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
            console.log("开始",this._nGameTime);
            egret.Tween.get(note).to({y:this.stage.stageHeight}, 1666).call(this.removeNote, this, [note]);
        }
    }

    private removeNote(note:NoteItem):void
    {
        if (note && note.parent)
        {
            note.parent.removeChild(note);
        }
        NoteManager.getInstance().HideNote(note);
        console.log("结束",this._nGameTime);
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
        if (this._timer)
        {
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer.stop();
        }
    }

    /**
     * 绘制音符飞行轨道和返回按钮
     */
    private drawPathWayBg():void
    {
        this._pathWayBg1 = new egret.Shape();
        this._pathWayBg1.graphics.beginFill(0xdedede);
        this._pathWayBg1.graphics.drawRect(0, 0, this.stage.stageWidth/4, this.stage.stageHeight);
        this._pathWayBg1.graphics.endFill();
        this.addChild(this._pathWayBg1);
        this._pathWayBg2 = new egret.Shape();
        this._pathWayBg2.graphics.beginFill(0xeee685);
        this._pathWayBg2.graphics.drawRect(this.stage.stageWidth/4, 0, this.stage.stageWidth/4, this.stage.stageHeight);
        this._pathWayBg2.graphics.endFill();
        this.addChild(this._pathWayBg2);
        this._pathWayBg3 = new egret.Shape();
        this._pathWayBg3.graphics.beginFill(0xb4eeb4);
        this._pathWayBg3.graphics.drawRect(this.stage.stageWidth/2, 0, this.stage.stageWidth/4, this.stage.stageHeight);
        this._pathWayBg3.graphics.endFill();
        this.addChild(this._pathWayBg3);
        this._pathWayBg4 = new egret.Shape();
        this._pathWayBg4.graphics.beginFill(0xdedede);
        this._pathWayBg4.graphics.drawRect(this.stage.stageWidth*3/4, 0, this.stage.stageWidth/4, this.stage.stageHeight);
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
        this._labelReturn.x = this.stage.stageWidth - 300 + (this._shapeReturn.width - this._labelReturn.width)/2;
        this._labelReturn.y = 20 + (this._shapeReturn.height - this._labelReturn.height)/2;
        this._labelReturn.touchEnabled = false;
        this.addChild(this._labelReturn);
    }

    private onReturnTouch(event:egret.TouchEvent) 
    {
        switch (event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                EventManager.getInstance().dispatchEvent(new egret.Event(DataEvent.EVENT_SHOW_START));
                break;
            default:
                break;
        }
    }

    /**
     * 场景清理
     */
    private clearScene():void
    {
        if (this._channelGame)
        {
            this._channelGame.removeEventListener(egret.Event.SOUND_COMPLETE, this.onGameSoundComplete, this);
            this._channelGame.stop();
            this._channelGame = null;
        }
        if (this._timer)
        {
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer.stop();
        }
        this._nGameTime = 0;
        this._nNoteIndex = 0;
        NoteManager.getInstance().HideAllNote();
    }
}