class StartPanel extends egret.DisplayObjectContainer 
{
    private _shapeBg:egret.Shape;
    private _shapeStart:egret.Shape;
    private _labelStart:eui.Label;

    public constructor() 
    {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.drawStartBg();

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this._shapeStart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this._shapeStart.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private drawStartBg():void
    {
        this._shapeBg = new egret.Shape();
        this._shapeBg.graphics.beginFill(0xc1ffc1);
        this._shapeBg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._shapeBg.graphics.endFill();
        this.addChild(this._shapeBg);

        this._shapeStart = new egret.Shape();
        this._shapeStart.graphics.beginFill(0x76ee00);
        this._shapeStart.graphics.drawRect((this.stage.stageWidth - 280)/2, (this.stage.stageHeight - 80)/2, 280, 80);
        this._shapeStart.graphics.endFill();
        this._shapeStart.touchEnabled = true;
        this._shapeStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this._shapeStart.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addChild(this._shapeStart);

        this._labelStart = new eui.Label();
        this._labelStart.text = "START";
        this._labelStart.textColor = 0x218868;
        this._labelStart.size = 60;
        this._labelStart.x = (this.stage.stageWidth - this._labelStart.width)/2;
        this._labelStart.y = (this.stage.stageHeight - this._labelStart.height)/2;
        this._labelStart.touchEnabled = false;
        this.addChild(this._labelStart);
    }

    private onTouch(event:egret.TouchEvent) 
    {
        switch (event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                EventManager.getInstance().dispatchEvent(new DataEvent(DataEvent.EVENT_SHOW_GAME));
                break;
            default:
                break;
        }
    }
}