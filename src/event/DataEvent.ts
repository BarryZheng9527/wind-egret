class DataEvent extends egret.Event
{
    public static EVENT_SHOW_GAME:string = "EVENT_SHOW_GAME";
    public static EVENT_SHOW_START:string = "EVENT_SHOW_START";

    public _param:number;

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type, bubbles, cancelable);
    }
}