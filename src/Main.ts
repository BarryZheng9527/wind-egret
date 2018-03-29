class Main extends egret.DisplayObjectContainer 
{
    private _stStartPanel:StartPanel;
    private _stGamePanel:GamePanel;

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        //加载配置
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        EventManager.getInstance().addEventListener(DataEvent.EVENT_SHOW_GAME, this.onShowGame, this);
        EventManager.getInstance().addEventListener(DataEvent.EVENT_SHOW_START, this.onShowStart, this);

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage(event:egret.Event)
    {
        EventManager.getInstance().removeEventListener(DataEvent.EVENT_SHOW_GAME, this.onShowGame, this);
        EventManager.getInstance().removeEventListener(DataEvent.EVENT_SHOW_START, this.onShowStart, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onConfigComplete(event:RES.ResourceEvent):void 
    {
        //配置加载成功，开始预加载
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void 
    {
        if (event.groupName == "preload") 
        {
            //预加载成功，载入开始界面
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //解析配置
            ConfigManager.getInstance().ParseConfig();
            this.switchScene(1);
        }
    }

    private onItemLoadError(event:RES.ResourceEvent):void 
    {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event:RES.ResourceEvent):void 
    {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void 
    {
        if (event.groupName == "preload") 
        {
        }
    }

    private onShowStart(event:DataEvent) 
    {
        this.switchScene(1);
    }

    public onShowGame(event:DataEvent):void
    {
        this.switchScene(2);
    }

    /**
     * 载入场景
     */
    private switchScene(nType:number):void
    {
        if (nType == 1)
        {
            if (this._stGamePanel && this._stGamePanel.parent)
            {
                this._stGamePanel.parent.removeChild(this._stGamePanel);
            }

            if (this._stStartPanel == null)
            {
                this._stStartPanel = new StartPanel();
            }
            this.addChild(this._stStartPanel);
        }
        else
        {
            if (this._stStartPanel && this._stStartPanel.parent)
            {
                this._stStartPanel.parent.removeChild(this._stStartPanel);
            }

            if (this._stGamePanel == null)
            {
                this._stGamePanel = new GamePanel();
            }
            this.addChild(this._stGamePanel);
        }
    }
}