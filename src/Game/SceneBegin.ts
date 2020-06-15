class SceneBegin extends eui.Component implements  eui.UIComponent {
	//游戏设置按钮
	public btn_setting:eui.Button;
	//游戏开始按钮
	public btn_begin:eui.Button;

	//声明单例
	private static shared:SceneBegin;
	public static Shared(): SceneBegin{
		if(SceneBegin.shared == null){
			SceneBegin.shared =new SceneBegin();
		}
		return SceneBegin.shared;
	}

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
		this.init();
	}
	//初始化
	private init(){
		//给两个按钮绑定点击方法
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting_tap,this);
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.begin_tap,this)
	}
	/**
	 * 点击设置按钮的响应函数
	 */
	private setting_tap(){
		//打开设置页面
		console.log('打开游戏关卡场景');
	}
	/**
	 * 点击开始游戏的响应函数
	 */
	private begin_tap(){
		//打开游戏关卡场景
		console.log('打开游戏关卡场景');
		//把游戏关卡场景添加到显示列表
		this.parent.addChild(SceneLevel.Shared());
		//移除游戏开始场景
		this.parent.removeChild(this);
	}
}