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
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.touchEnabled = true;
        return _this;
    }
    MyButton.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    MyButton.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.Clear();
    };
    MyButton.prototype.SetResource = function (szUPName, szDownName, func) {
        if (!this._bmpBg) {
            this._bmpBg = new egret.Bitmap();
        }
        this._textureUp = RES.getRes(szUPName);
        this._textureDown = RES.getRes(szDownName);
        this._listener = func;
        this._bmpBg.texture = this._textureUp;
        this.addChild(this._bmpBg);
    };
    MyButton.prototype.onTouch = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._bmpBg.texture = this._textureDown;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._bmpBg.texture = this._textureUp;
                break;
            default:
                break;
        }
    };
    MyButton.prototype.onTouchMove = function (event) {
        if (event.localX > 20 && event.localX < 243 && event.localY > 20 && event.localY < 71) {
            this._bmpBg.texture = this._textureDown;
        }
        else {
            this._bmpBg.texture = this._textureUp;
        }
    };
    MyButton.prototype.onTouchTap = function (event) {
        this._listener(event);
    };
    MyButton.prototype.Clear = function () {
        this._bmpBg = null;
        this._textureUp = null;
        this._textureDown = null;
        this._listener = null;
    };
    return MyButton;
}(egret.DisplayObjectContainer));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=MyButton.js.map