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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //加载配置
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        EventManager.getInstance().addEventListener(DataEvent.EVENT_SHOW_GAME, this.onShowGame, this);
        EventManager.getInstance().addEventListener(DataEvent.EVENT_SHOW_START, this.onShowStart, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    Main.prototype.onRemoveFromStage = function (event) {
        EventManager.getInstance().removeEventListener(DataEvent.EVENT_SHOW_GAME, this.onShowGame, this);
        EventManager.getInstance().removeEventListener(DataEvent.EVENT_SHOW_START, this.onShowStart, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    Main.prototype.onConfigComplete = function (event) {
        //配置加载成功，开始预加载
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            //预加载成功，载入开始界面
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //解析配置
            ConfigManager.getInstance().ParseConfig();
            this.switchScene(1);
        }
    };
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
        }
    };
    Main.prototype.onShowStart = function (event) {
        this.switchScene(1);
    };
    Main.prototype.onShowGame = function (event) {
        this.switchScene(2);
    };
    /**
     * 载入场景
     */
    Main.prototype.switchScene = function (nType) {
        if (nType == 1) {
            if (this._stGamePanel && this._stGamePanel.parent) {
                this._stGamePanel.parent.removeChild(this._stGamePanel);
            }
            if (this._stStartPanel == null) {
                this._stStartPanel = new StartPanel();
            }
            this.addChild(this._stStartPanel);
        }
        else {
            if (this._stStartPanel && this._stStartPanel.parent) {
                this._stStartPanel.parent.removeChild(this._stStartPanel);
            }
            if (this._stGamePanel == null) {
                this._stGamePanel = new GamePanel();
            }
            this.addChild(this._stGamePanel);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map