class NoteManager extends egret.DisplayObject
{
    private static gInstance:NoteManager;

    private _objCache:egret.HashObject;
    private _objShow:egret.HashObject;

    public constructor() 
    {
        super();
        this._objCache = new egret.HashObject();
        this._objShow = new egret.HashObject();
    }

    public static getInstance():NoteManager
    {
        if (this.gInstance == null)
        {
            this.gInstance = new NoteManager();
        }
        return this.gInstance;
    }

    public get objShow()
    {
        return this._objShow;
    }

    /**
     * 获取音符
     */
    public GetNote(nTime:number, nPathWay:number, nType:number):NoteItem
    {
        var type:number = nPathWay * 10 + nType * 1;
        var note:NoteItem;
        var arrNote:any[];
        if (this._objCache[type])
        {
            arrNote = this._objCache[type];
        }
        else
        {
            arrNote = new Array();
            this._objCache[type] = arrNote;
        }
        if (arrNote.length > 0)
        {
            note = arrNote.shift();
        }
        else
        {
            note = new NoteItem();
        }
        note.SetNoteStyle(nTime, nPathWay, nType);
        this.ShowNote(note);
        return note;
    }

    /**
     * 归还音符
     */
    public ReturnNote(note:NoteItem):void
    {
        var arrNote:any[] = this._objCache[note.nNoteType];
        if (arrNote)
        {
            arrNote.push(note);
        }
    }

    /**
     * 添加音符到显示列表
     */
    public ShowNote(note:NoteItem):void
    {
        var arrNote:any[];
        if (this._objShow[note.nNoteType])
        {
            arrNote = this._objShow[note.nNoteType];
        }
        else
        {
            arrNote = new Array();
            this._objShow[note.nNoteType] = arrNote;
        }
        arrNote.push(note);
    }

    /**
     * 从显示列表移除音符
     */
    public HideNote(note:NoteItem):void
    {
        var arrNote:any[] = this._objShow[note.nNoteType];
        if (arrNote)
        {
            for (var iIndex = 0; iIndex < arrNote.length; ++iIndex)
            {
                var curNote:NoteItem = arrNote[iIndex];
                if (curNote.nKey == note.nKey)
                {
                    arrNote.splice(iIndex, 1);
                    this.ReturnNote(note);
                    break;
                }
            }
            if (note && note.parent)
            {
                note.parent.removeChild(note);
            }
        }
    }

    /**
     * 移除所有音符
     */
    public HideAllNote():void
    {
        var key:any;
        for (key in this._objShow)
        {
            var arrNote:any[] = this._objShow[key];
            for (var iIndex = 0; iIndex < arrNote.length; ++iIndex)
            {
                var curNote:NoteItem = arrNote[iIndex];
                if (curNote && curNote.parent)
                {
                    curNote.parent.removeChild(curNote);
                }
            }
        }
        this._objCache = new egret.HashObject();
        this._objShow = new egret.HashObject();
    }
}