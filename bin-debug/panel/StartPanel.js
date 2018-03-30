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
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.UpdateShow();
    };
    StartPanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.Clear();
    };
    StartPanel.prototype.UpdateShow = function () {
        if (!this._bmpBg) {
            this._bmpBg = new egret.Bitmap();
        }
        var texture = RES.getRes("image_startBg_jpg");
        this._bmpBg.texture = texture;
        this.addChild(this._bmpBg);
        if (!this._btnStart) {
            this._btnStart = new MyButton();
        }
        this._btnStart.SetResource("image_start1_png", "image_start2_png", this.onTouch);
        this._btnStart.x = this.stage.stageWidth / 16;
        this._btnStart.y = this.stage.height / 2;
        this.addChild(this._btnStart);
        //载入游戏音乐
        if (!this._soundGame) {
            this._soundGame = RES.getRes("sound_start_mp3");
        }
        this._channelGame = this._soundGame.play();
    };
    StartPanel.prototype.onTouch = function (event) {
        EventManager.getInstance().dispatchEvent(new DataEvent(DataEvent.EVENT_SHOW_GAME));
    };
    StartPanel.prototype.Clear = function () {
        this._channelGame.stop();
        this._bmpBg = null;
        this._btnStart = null;
        this._soundGame = null;
        this._channelGame = null;
    };
    return StartPanel;
}(egret.DisplayObjectContainer));
__reflect(StartPanel.prototype, "StartPanel");
//# sourceMappingURL=StartPanel.js.map