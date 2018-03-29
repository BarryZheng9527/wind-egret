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
        _this._shapeNote = new egret.Shape();
        return _this;
    }
    NoteItem.prototype.onAddToStage = function (event) {
        this.DrawNote();
        this.addChild(this._shapeNote);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    NoteItem.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    /**
     * 设置音符类型
     * nTime 音符产生时间
     * nPathWay 所属轨道
     * nType 配置类型（0单独音符，1长音符起始，2长音符中段，3长音符结尾）
     */
    NoteItem.prototype.SetNoteStyle = function (nTime, nPathWay, nType) {
        this._nKey = nTime * 100 + nPathWay * 10 + nType * 1;
        this._nType = nPathWay * 10 + nType * 1;
    };
    NoteItem.prototype.DrawNote = function () {
        var nType = this._nType % 10;
        this._shapeNote.graphics.clear();
        if (nType == 0) {
            this._shapeNote.graphics.beginFill(0x00f5ff);
        }
        else {
            this._shapeNote.graphics.beginFill(0x00ff7f);
        }
        if (nType == 0 || nType == 1) {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth / 8, this.stage.stageHeight / 8);
        }
        else if (nType == 2) {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth / 32, this.stage.stageHeight / 8);
        }
        else if (nType == 3) {
            this._shapeNote.graphics.drawRect(0, 0, this.stage.stageWidth / 16, this.stage.stageHeight / 8);
        }
        this._shapeNote.graphics.endFill();
    };
    return NoteItem;
}(egret.DisplayObjectContainer));
__reflect(NoteItem.prototype, "NoteItem");
//# sourceMappingURL=NoteItem.js.map