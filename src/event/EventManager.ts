class EventManager extends egret.EventDispatcher
{
    private static gInstance:EventManager;

    public constructor() 
    {
        super();
    }

    public static getInstance():EventManager
    {
        if (this.gInstance == null)
        {
            this.gInstance = new EventManager();
        }
        return this.gInstance;
    }
}