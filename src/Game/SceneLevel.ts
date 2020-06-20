class SceneLevel extends eui.Component implements eui.UIComponent {
	//滚动视图
	public level_group: eui.Scroller;
	//可以滚动的关卡容器
	public group_level: eui.Group;
	//关卡指示箭头
	public arrow: eui.Image;
	//返回按钮
	public btn_back: eui.Button;

	//选中的关卡(指示箭头指向的)
	private sel_level: number = 0;
	//声明一个数组，存放关卡按钮
	private LevelIcons: LevelIcon[] = [];


	//声明单例
	private static shared: SceneLevel;
	public static Shared(): SceneLevel {
		if (SceneLevel.shared == null) {
			SceneLevel.shared = new SceneLevel();
		}
		return SceneLevel.shared;
	}

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	//初始化
	private init() {
		//禁用滚动视图的横向滚动
		this.level_group.scrollPolicyH = eui.ScrollPolicy.OFF;
		//给返回按钮绑定点击事件
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_tap, this);
		//把舞台y轴（横向）分为20份，x轴（纵向）分为10份
		var row = 10;
		var col = 20;
		//水平一份的大小
		var spanX = this.width / row;
		//垂直一份的大小（关卡按钮的高度）
		var spanY = this.height / col;

		//定义一个组容器
		var group = new eui.Group();
		this.group_level.addChild(group);
		group.width = this.width;
		//滚动容器的高度 = 关卡按钮的高度 * 关卡的个数
		group.height = spanY * 400;

		//填充滚动容器的背景
		for (var i: number = 0; i < group.height / this.height; i++) {
			var img = new eui.Image();
			//填充img背景
			img.source = RES.getRes("GameBG2_jpg");
			//设置img的高度，让前后两个img上下相连
			img.y = i * this.height;
			//禁用背景图
			img.touchEnabled = false;
			//添加到滚动时图的显示列表
			this.group_level.addChildAt(img, 0);

		}

		//获取游戏存档中玩的最远的关卡
		var milestrone: number = LevelDataManager.Shared().Milestone;
		//动态生成关卡按钮
		for (var i: number = 0; i < 400; i++) {
			//定义一个关卡按钮
			var icon = new LevelIcon();
			//添加到group里面去
			group.addChild(icon);
			//设置关卡显示文本
			icon.Level = i + 1;
			//设置X轴的位置
			icon.x = Math.sin(spanY * i / 2 / 180 * Math.PI) * 200 + group.width / 2;
			//设置y轴的位置
			icon.y = group.height - spanY * i - icon.height;
			//给每个关卡按钮绑定点击方法
			icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.icon_tap, this);
			//根据存档来设置关卡按钮的状态
			icon.enabled = i < milestrone;
			//把关卡按钮存放起来
			this.LevelIcons.push(icon);

		}
		//滚动视图默认出现在最底部（最远关卡）
		this.group_level.scrollV = group.height - this.height;

		//如果关卡过大，需要最大关卡在屏幕Y轴中间位置。
		//拿到最远关卡(假设玩到20关)
		if (milestrone > 20) {
			this.group_level.scrollV = group.height - milestrone * spanY;
		}

		//指示箭头的位置
		//修改箭头的锚点为底部的尖端处
		this.arrow.anchorOffsetX = this.arrow.width / 2;
		this.arrow.anchorOffsetY = this.arrow.height;
		this.arrow.touchEnabled = false;
		//游戏初始化的时候，箭头出现在最远关卡的正上方
		var currentIcon = group.getChildAt(milestrone - 1);
		this.arrow.x = group.getChildAt(milestrone - 1).x + currentIcon.width / 2;
		this.arrow.y = currentIcon.y;
		//设置当前选中的关卡
		this.sel_level = milestrone;
		//让箭头显示到最顶端
		this.group_level.addChild(this.arrow);
	}
	/**
	 * 点击返回按钮的响应函数
	 */
	private back_tap() {
		SoundManager.Shared().playClick();
		this.parent.addChild(SceneBegin.Shared());
		this.parent.removeChild(this);
	}
	/**
	 * 点击关卡的响应事件
	 */
	private icon_tap(e: egret.TouchEvent) {
		SoundManager.Shared().playClick();
		//获取被点击的关卡按钮
		var icon = <LevelIcon>e.currentTarget;
		if (this.sel_level != icon.Level) {
			//如果指示箭头指向的关卡不是我们点击的关卡，则移动指示箭头到点击关卡处
			this.arrow.x = icon.x + icon.width / 2;
			this.arrow.y = icon.y;
			//记录指示箭头指向的关卡
			this.sel_level = icon.Level;
		} else {
			//点击的关卡就是箭头指着的关卡，则直接进入并开始游戏
			this.parent.addChild(SceneGame.Shared());
			//传入点击的关卡所在的关卡数组中的下标
			SceneGame.Shared().initLevel(icon.Level - 1);
			this.parent.removeChild(this);

		}
	}
	/**
	 * 记录玩家过关的最远关卡，并且调整指示箭头的位置
	 */
	public setMileStoneLevel(level: number) {
		//拿到过关的关卡按钮
		var icon = this.LevelIcons[level];
		//设置该关卡为激活状态
		icon.enabled = true;
		//设置指示箭头到该关卡之上
		this.arrow.x = icon.x + icon.width / 2;
		this.arrow.y = icon.y;
		//记录最远关卡
		if (level > LevelDataManager.Shared().Milestone) {
			LevelDataManager.Shared().Milestone = level;
		}
	}
}