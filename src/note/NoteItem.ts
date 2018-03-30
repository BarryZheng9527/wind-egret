class NoteItem extends egret.DisplayObjectContainer 
{
    //音符图片
    private _bmpNote:egret.Bitmap;
    //唯一标识
    public _nKey:number;
    //所属存储类型
    public _nType:number;

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.AddNote();

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.Clear();
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

    private AddNote():void
    {
        if (!this._bmpNote)
        {
            this._bmpNote = new egret.Bitmap();
        }
        var texture:egret.Texture;
        switch (this._nType)
        {
            case 10:
                texture = RES.getRes("image_keyStart11_png");
                break;
            case 11:
                texture = RES.getRes("image_keyStart12_png");
                break;
            case 12:
                texture = RES.getRes("image_keyMiddle1_png");
                break;
            case 13:
                texture = RES.getRes("image_keyend1_png");
                break;
            case 20:
                texture = RES.getRes("image_keyStart21_png");
                break;
            case 21:
                texture = RES.getRes("image_keyStart22_png");
                break;
            case 22:
                texture = RES.getRes("image_keyMiddle2_png");
                break;
            case 23:
                texture = RES.getRes("image_keyend2_png");
                break;
            case 30:
                texture = RES.getRes("image_keyStart31_png");
                break;
            case 31:
                texture = RES.getRes("image_keyStart32_png");
                break;
            case 32:
                texture = RES.getRes("image_keyMiddle3_png");
                break;
            case 33:
                texture = RES.getRes("image_keyend3_png");
                break;
            case 40:
                texture = RES.getRes("image_keyStart41_png");
                break;
            case 41:
                texture = RES.getRes("image_keyStart42_png");
                break;
            case 42:
                texture = RES.getRes("image_keyMiddle4_png");
                break;
            case 43:
                texture = RES.getRes("image_keyend4_png");
                break;
            default:
                break;
        }
        this._bmpNote.texture = texture;
        this.addChild(this._bmpNote);
    }

    private Clear():void
    {
        this._bmpNote = null;
    }
}