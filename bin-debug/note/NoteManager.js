var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NoteManager = (function (_super) {
    __extends(NoteManager, _super);
    function NoteManager() {
        var _this = _super.call(this) || this;
        _this._objCache = new egret.HashObject();
        _this._objShow = new egret.HashObject();
        return _this;
    }
    NoteManager.getInstance = function () {
        if (this.gInstance == null) {
            this.gInstance = new NoteManager();
        }
        return this.gInstance;
    };
    Object.defineProperty(NoteManager.prototype, "objShow", {
        get: function () {
            return this._objShow;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取音符
     */
    NoteManager.prototype.GetNote = function (nTime, nPathWay, nType) {
        var type = nPathWay * 10 + nType * 1;
        var note;
        var arrNote;
        if (this._objCache[type]) {
            arrNote = this._objCache[type];
        }
        else {
            arrNote = new Array();
            this._objCache[type] = arrNote;
        }
        if (arrNote.length > 0) {
            note = arrNote.shift();
        }
        else {
            note = new NoteItem();
        }
        note.SetNoteStyle(nTime, nPathWay, nType);
        this.ShowNote(note);
        return note;
    };
    /**
     * 归还音符
     */
    NoteManager.prototype.ReturnNote = function (note) {
        var arrNote = this._objCache[note.nNoteType];
        if (arrNote) {
            arrNote.push(note);
        }
    };
    /**
     * 添加音符到显示列表
     */
    NoteManager.prototype.ShowNote = function (note) {
        var arrNote;
        if (this._objShow[note.nNoteType]) {
            arrNote = this._objShow[note.nNoteType];
        }
        else {
            arrNote = new Array();
            this._objShow[note.nNoteType] = arrNote;
        }
        arrNote.push(note);
    };
    /**
     * 从显示列表移除音符
     */
    NoteManager.prototype.HideNote = function (note) {
        var arrNote = this._objShow[note.nNoteType];
        if (arrNote) {
            for (var iIndex = 0; iIndex < arrNote.length; ++iIndex) {
                var curNote = arrNote[iIndex];
                if (curNote.nKey == note.nKey) {
                    arrNote.splice(iIndex, 1);
                    this.ReturnNote(note);
                    break;
                }
            }
            if (note && note.parent) {
                note.parent.removeChild(note);
            }
        }
    };
    /**
     * 移除所有音符
     */
    NoteManager.prototype.HideAllNote = function () {
        var key;
        for (key in this._objShow) {
            var arrNote = this._objShow[key];
            for (var iIndex = 0; iIndex < arrNote.length; ++iIndex) {
                var curNote = arrNote[iIndex];
                if (curNote && curNote.parent) {
                    curNote.parent.removeChild(curNote);
                }
            }
        }
        this._objCache = new egret.HashObject();
        this._objShow = new egret.HashObject();
    };
    return NoteManager;
}(egret.DisplayObject));
__reflect(NoteManager.prototype, "NoteManager");
//# sourceMappingURL=NoteManager.js.map