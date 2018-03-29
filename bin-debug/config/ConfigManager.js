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
var ConfigManager = (function (_super) {
    __extends(ConfigManager, _super);
    function ConfigManager() {
        var _this = _super.call(this) || this;
        _this._arrBorn = new Array();
        return _this;
    }
    ConfigManager.getInstance = function () {
        if (this.gInstance == null) {
            this.gInstance = new ConfigManager();
        }
        return this.gInstance;
    };
    ConfigManager.prototype.ParseConfig = function () {
        var data = RES.getRes("config_born_json");
        this._arrBorn = data.born;
    };
    return ConfigManager;
}(egret.DisplayObject));
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map