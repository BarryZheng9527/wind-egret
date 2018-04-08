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
var MoviePanel = (function (_super) {
    __extends(MoviePanel, _super);
    function MoviePanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MoviePanel.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.UpdateShow();
    };
    MoviePanel.prototype.onRemoveFromStage = function (event) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.Clear();
    };
    MoviePanel.prototype.UpdateShow = function () {
        this.InitMovie();
        this._mcStart = new egret.MovieClip(this._mfcStart1.generateMovieClipData("start1"));
        this._mcStart.addEventListener(egret.Event.COMPLETE, this.onStartMcComplete, this);
        this.addChild(this._mcStart);
        this._mcStart.play(1);
        //播放场景切换音效
        if (!this._soundCheer) {
            this._soundCheer = RES.getRes("sound_cheer_mp3");
        }
        this._channelCheer = this._soundCheer.play(0, 1);
        if (!this._soundLight) {
            this._soundLight = RES.getRes("sound_light_mp3");
        }
        this._channelLight = this._soundLight.play(0, 1);
    };
    MoviePanel.prototype.InitMovie = function () {
        this._mfcStart1 = new egret.MovieClipDataFactory(RES.getRes("movie_start1_json"), RES.getRes("movie_start1_png"));
        this._mfcStart2 = new egret.MovieClipDataFactory(RES.getRes("movie_start2_json"), RES.getRes("movie_start2_png"));
        this._mfcStart3 = new egret.MovieClipDataFactory(RES.getRes("movie_start3_json"), RES.getRes("movie_start3_png"));
        this._mfcStart4 = new egret.MovieClipDataFactory(RES.getRes("movie_start4_json"), RES.getRes("movie_start4_png"));
        this._mfcStart5 = new egret.MovieClipDataFactory(RES.getRes("movie_start5_json"), RES.getRes("movie_start5_png"));
        this._mfcStart6 = new egret.MovieClipDataFactory(RES.getRes("movie_start6_json"), RES.getRes("movie_start6_png"));
        this._mfcStart7 = new egret.MovieClipDataFactory(RES.getRes("movie_start7_json"), RES.getRes("movie_start7_png"));
        this._mfcStart8 = new egret.MovieClipDataFactory(RES.getRes("movie_start8_json"), RES.getRes("movie_start8_png"));
        this._mfcStart9 = new egret.MovieClipDataFactory(RES.getRes("movie_start9_json"), RES.getRes("movie_start9_png"));
        this._mfcStart10 = new egret.MovieClipDataFactory(RES.getRes("movie_start10_json"), RES.getRes("movie_start10_png"));
    };
    MoviePanel.prototype.onStartMcComplete = function (event) {
        var szLable = this._mcStart.currentLabel;
        switch (szLable) {
            case "start1":
                this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start2");
                this._mcStart.play(1);
                break;
            case "start2":
                this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start3");
                this._mcStart.play(1);
                break;
            case "start3":
                this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start4");
                this._mcStart.play(1);
                break;
            case "start4":
                this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start5");
                this._mcStart.play(1);
                break;
            case "start5":
                this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start6");
                this._mcStart.play(1);
                break;
            case "start6":
                this._mcStart.movieClipData = this._mfcStart2.generateMovieClipData("start7");
                this._mcStart.play(1);
                break;
            case "start7":
                this._mcStart.movieClipData = this._mfcStart3.generateMovieClipData("start8");
                this._mcStart.play(1);
                break;
            case "start8":
                this._mcStart.movieClipData = this._mfcStart3.generateMovieClipData("start9");
                this._mcStart.play(1);
                break;
            case "start9":
                this._mcStart.movieClipData = this._mfcStart3.generateMovieClipData("start10");
                this._mcStart.play(1);
                break;
            case "start10":
                this._mcStart.movieClipData = this._mfcStart4.generateMovieClipData("start11");
                this._mcStart.play(1);
                break;
            case "start11":
                this._mcStart.movieClipData = this._mfcStart5.generateMovieClipData("start12");
                this._mcStart.play(1);
                break;
            case "start12":
                this._mcStart.movieClipData = this._mfcStart6.generateMovieClipData("start13");
                this._mcStart.play(1);
                break;
            case "start13":
                this._mcStart.movieClipData = this._mfcStart7.generateMovieClipData("start14");
                this._mcStart.play(1);
                break;
            case "start14":
                this._mcStart.movieClipData = this._mfcStart8.generateMovieClipData("start15");
                this._mcStart.play(1);
                break;
            case "start15":
                this._mcStart.movieClipData = this._mfcStart9.generateMovieClipData("start16");
                this._mcStart.play(1);
                break;
            case "start16":
                this._mcStart.movieClipData = this._mfcStart10.generateMovieClipData("start17");
                this._mcStart.play(1);
                break;
            case "start17":
                EventManager.getInstance().dispatchEvent(new DataEvent(DataEvent.EVENT_SHOW_GAME));
                break;
            default:
                break;
        }
    };
    MoviePanel.prototype.Clear = function () {
        this._mcStart.stop();
        this._mcStart.removeEventListener(egret.Event.COMPLETE, this.onStartMcComplete, this);
        if (this._channelCheer) {
            this._channelCheer.stop();
            this._channelCheer = null;
        }
        if (this._channelLight) {
            this._channelLight.stop();
            this._channelLight = null;
        }
        this._mfcStart1 = null;
        this._mfcStart2 = null;
        this._mfcStart3 = null;
        this._mfcStart4 = null;
        this._mfcStart5 = null;
        this._mfcStart6 = null;
        this._mfcStart7 = null;
        this._mfcStart8 = null;
        this._mfcStart9 = null;
        this._mfcStart10 = null;
        this._mcStart = null;
    };
    return MoviePanel;
}(egret.DisplayObjectContainer));
__reflect(MoviePanel.prototype, "MoviePanel");
//# sourceMappingURL=MoviePanel.js.map