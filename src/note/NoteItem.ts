class NoteItem extends egret.DisplayObjectContainer 
{
    private _shapeNote:egret.Shape;

    //唯一标识
    public _nKey:number;
    //所属存储类型
    public _nType:number;

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this._shapeNote = new egret.Shape();
    }

    private onAddToStage(event:egret.Event)
    {
        this.DrawNote();
        this.addChild(this._shapeNote);

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    /**
     * 设置音符类型
     * nTime 音符产生时间
     * nPathWay 所属轨道
     * nType 配置类型（0单独音符，1长音符起始，2长音符中段，3长音符结尾）
     */
    public SetNoteStyle(nTime:number, nPathWay:number, nType:number):void
    {
        this._nKey = nTime * 100 + nPathWay * 10 + nType * 1;
        this._nType = nPathWay * 10 + nType * 1;
    }

    private DrawNote():void
    {
        var nType:number = this._nType % 10;
        this._shapeNote.graphics.clear();
        if (nType == 0)
        {
            this._shapeNote.graphics.beginFill(0x00f5ff);
        }
        else
        {
            this._shapeNote.graphics.beginFill(0x00ff7f);
        }
        if (nType == 0 || nType == 1)
        {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth/8, this.stage.stageHeight/8);
        }
        else if (nType == 2)
        {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth/32, this.stage.stageHeight/8);
        }
        else if (nType == 3)
        {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth/16, this.stage.stageHeight/8);
        }
        this._shapeNote.graphics.endFill();
    }
}