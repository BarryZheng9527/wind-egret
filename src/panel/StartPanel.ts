class StartPanel extends egret.DisplayObjectContainer {
    //背景图
    private _bmpBg: egret.Bitmap;
    //开始按钮
    private _btnStart: MyButton;
    //背景音乐
    private _soundGame: egret.Sound;
    private _channelGame: egret.SoundChannel;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.UpdateShow();
    }

    private onRemoveFromStage(event: egret.Event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.Clear();
    }

    private UpdateShow(): void {
        if (!this._bmpBg) {
            this._bmpBg = new egret.Bitmap();
        }
        var texture: egret.Texture = RES.getRes("image_startBg_jpg");
        this._bmpBg.texture = texture;
        this.addChild(this._bmpBg);
        if (!this._btnStart) {
            this._btnStart = new MyButton();
        }
        this._btnStart.SetResource("image_start1_png", "image_start2_png", this.onTouch);
        this._btnStart.x = this.stage.stageWidth / 16;
        this._btnStart.y = this.stage.stageHeight / 2;
        this.addChild(this._btnStart);
        //载入游戏音乐
        if (!this._soundGame) {
            this._soundGame = RES.getRes("sound_start_mp3");
        }
        this._channelGame = this._soundGame.play();
    }

    private onTouch(event: egret.TouchEvent) {
        EventManager.getInstance().dispatchEvent(new DataEvent(DataEvent.EVENT_SHOW_START_MOVIE));
    }

    private Clear(): void {
        if (this._channelGame) {
            this._channelGame.stop();
            this._channelGame = null;
        }

        this._bmpBg = null;
        this._btnStart = null;
        this._soundGame = null;
    }
}