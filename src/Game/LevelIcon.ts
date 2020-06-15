class LevelIcon extends eui.Button implements  eui.UIComponent {
	
	public lb_level:eui.Label;


	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	//设置lb_level的内容一些函数(getter/setter)
	public get Level(): number{
		return parseInt(this.lb_level.text);
	}
	public set Level(val: number){
		if(this.lb_level){
			this.lb_level.text = val.toString();
		}
		
	}
	
}