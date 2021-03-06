class MoviePanel extends egret.DisplayObjectContainer 
{
    //场景切换动画
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
    //场景切换音效
    private _soundCheer:egret.Sound;
    private _channelCheer:egret.SoundChannel;
    private _soundLight:egret.Sound;
    private _channelLight:egret.SoundChannel;

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

    public UpdateShow():void
    {
        this.InitMovie();
        this._mcStart = new egret.MovieClip(this._mfcStart1.generateMovieClipData("start1"));
        this._mcStart.addEventListener(egret.Event.COMPLETE, this.onStartMcComplete, this);
        this.addChild(this._mcStart);
        this._mcStart.play(1);
        //播放场景切换音效
        if (!this._soundCheer)
        {
            this._soundCheer = RES.getRes("sound_cheer_mp3");
        }
        this._channelCheer = this._soundCheer.play(0, 1);
        if (!this._soundLight)
        {
            this._soundLight = RES.getRes("sound_light_mp3");
        }
        this._channelLight = this._soundLight.play(0, 1);
    }

    private InitMovie():void
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
    }

    private onStartMcComplete(event:egret.Event):void
    {
        var szLable:string = this._mcStart.currentLabel;
        switch (szLable)
        {
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
    }

    private Clear():void
    {
        this._mcStart.stop();
        this._mcStart.removeEventListener(egret.Event.COMPLETE, this.onStartMcComplete, this);
        if (this._channelCheer)
        {
            this._channelCheer.stop();
            this._channelCheer = null;
        }
        if (this._channelLight)
        {
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
    }
}