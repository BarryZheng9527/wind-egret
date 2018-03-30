class MyButton extends egret.DisplayObjectContainer
{
    private _btnBg:egret.Bitmap;
    private _textureUp:egret.Texture;
    private _textureDown:egret.Texture;
    private _listener:Function;

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

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    public SetResource(szUPName:string, szDownName:string, func:Function):void
    {
        if (!this._btnBg)
        {
            this._btnBg = new egret.Bitmap();
        }
        this._textureUp = RES.getRes(szUPName);
        this._textureDown = RES.getRes(szDownName);
        this._listener = func;
        this._btnBg.texture = this._textureUp;
        this.addChild(this._btnBg);
    }

    private onTouch(event:egret.TouchEvent) 
    {
        switch (event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._btnBg.texture = this._textureDown;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._btnBg.texture = this._textureUp;
                break;
            default:
                break;
        }
    }

    private onTouchMove(event:egret.TouchEvent) 
    {
        if (event.localX > 20 && event.localX < 243 && event.localY > 20 && event.localY < 71)
        {
            this._btnBg.texture = this._textureDown;
        }
        else
        {
            this._btnBg.texture = this._textureUp;
        }
    }

    private onTouchTap(event:egret.TouchEvent) 
    {
        this._listener(event);
    }
}