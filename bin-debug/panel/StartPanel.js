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
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StartPanel.prototype.onAddToStage = function (event) {
        this.drawStartBg();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    StartPanel.prototype.onRemoveFromStage = function (event) {
        this._shapeStart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this._shapeStart.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    StartPanel.prototype.drawStartBg = function () {
        this._shapeBg = new egret.Shape();
        this._shapeBg.graphics.beginFill(0xc1ffc1);
        this._shapeBg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._shapeBg.graphics.endFill();
        this.addChild(this._shapeBg);
        this._shapeStart = new egret.Shape();
        this._shapeStart.graphics.beginFill(0x76ee00);
        this._shapeStart.graphics.drawRect((this.stage.stageWidth - 280) / 2, (this.stage.stageHeight - 80) / 2, 280, 80);
        this._shapeStart.graphics.endFill();
        this._shapeStart.touchEnabled = true;
        this._shapeStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this._shapeStart.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addChild(this._shapeStart);
        this._labelStart = new eui.Label();
        this._labelStart.text = "START";
        this._labelStart.textColor = 0x218868;
        this._labelStart.size = 60;
        this._labelStart.x = (this.stage.stageWidth - this._labelStart.width) / 2;
        this._labelStart.y = (this.stage.stageHeight - this._labelStart.height) / 2;
        this._labelStart.touchEnabled = false;
        this.addChild(this._labelStart);
    };
    StartPanel.prototype.onTouch = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                EventManager.getInstance().dispatchEvent(new DataEvent(DataEvent.EVENT_SHOW_GAME));
                break;
            default:
                break;
        }
    };
    return StartPanel;
}(egret.DisplayObjectContainer));
__reflect(StartPanel.prototype, "StartPanel");
//# sourceMappingURL=StartPanel.js.map