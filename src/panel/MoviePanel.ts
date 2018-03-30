class MoviePanel extends egret.DisplayObjectContainer 
{
    private _mfcStart1:egret.MovieClipDataFactory;
    private _mfcStart2:egret.MovieClipDataFactory;
    private _mfcStart3:egret.MovieClipDataFactory;
    private _mfcStart4:egret.MovieClipDataFactory;
    private _mfcStart5:egret.MovieClipDataFactory;
    private _mfcStart6:egret.MovieClipDataFactory;
    private _mfcStart7:egret.MovieClipDataFactory;
    private _mfcStart8:egret.MovieClipDataFactory;
    private _mfcStart9:egret.MovieClipDataFactory;
    private _mfcStart10:egret.MovieClipDataFactory;
    private _mcStart:egret.MovieClip;

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.UpdateShow();
    }

    private onRemoveFromStage(event:egret.Event)
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        this.Clear();
    }

    private UpdateShow():void
    {
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
        this._mcStart = new egret.MovieClip(this._mfcStart1.generateMovieClipData("start1"));
        this.addChild(this._mcStart);
        this._mcStart.play(1);
        this._mcStart.addEventListener(egret.Event.COMPLETE, this.onStartMcComplete1, this);
    }

    private onStartMcComplete1(event:egret.Event):void
    {
        this._mcStart.movieClipData = this._mfcStart1.generateMovieClipData("start2");
        this._mcStart.play(1);
    }

    private Clear():void
    {
    }
}