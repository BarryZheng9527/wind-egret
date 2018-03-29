class ConfigManager extends egret.DisplayObject
{
    private static gInstance:ConfigManager;

    public _arrBorn:any[];

    public constructor() 
    {
        super();
        this._arrBorn = new Array();
    }

    public static getInstance():ConfigManager
    {
        if (this.gInstance == null)
        {
            this.gInstance = new ConfigManager();
        }
        return this.gInstance;
    }

    public ParseConfig():void
    {
        var data = RES.getRes("config_born_json");
        this._arrBorn = data.born;
    }
}