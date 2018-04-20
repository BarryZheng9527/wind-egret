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
var NoteItem = (function (_super) {
    __extends(NoteItem, _super);
    function NoteItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    NoteItem.prototype.onAddToStage = function (event) {
        this.AddNote();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    NoteItem.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.Clear();
    };
    Object.defineProperty(NoteItem.prototype, "nKey", {
        get: function () {
            return this._nTime * 100 + this._nPathWay * 10 + this._nType * 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoteItem.prototype, "nNoteType", {
        get: function () {
            return this._nPathWay * 10 + this._nType * 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoteItem.prototype, "nPathWay", {
        get: function () {
            return this._nPathWay;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置音符类型
     * nTime 音符产生时间
     * nPathWay 所属轨道
     * nType 配置类型（0单独音符，1长音符起始，2长音符中段，3长音符结尾）
     */
    NoteItem.prototype.SetNoteStyle = function (nTime, nPathWay, nType) {
        this._nTime = nTime;
        this._nPathWay = nPathWay;
        this._nType = nType;
    };
    NoteItem.prototype.AddNote = function () {
        if (!this._bmpNote) {
            this._bmpNote = new egret.Bitmap();
        }
        var texture;
        switch (this.nNoteType) {
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
    };
    NoteItem.prototype.Clear = function () {
        this._bmpNote = null;
    };
    return NoteItem;
}(egret.DisplayObjectContainer));
__reflect(NoteItem.prototype, "NoteItem");
//# sourceMappingURL=NoteItem.js.map