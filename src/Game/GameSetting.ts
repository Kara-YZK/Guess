class GameSetting extends eui.Component implements eui.UIComponent {
	//确定按钮（关闭页面）
	public btn_agree: eui.Button;
	//音乐按钮
	public btn_music: eui.Button;
	//音乐静音
	public img_music_disable: eui.Image;
	//音效按钮
	public btn_sound: eui.Button;
	//音效静音
	public img_sound_disable: eui.Image;


	//声明一个单例类
	private static shared: GameSetting;
	public static Shared(): GameSetting {
		if (GameSetting.shared == null) {
			GameSetting.shared = new GameSetting();
		}
		return GameSetting.shared;
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
		//确定按钮的绑定方法
		this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agree_tap, this);
		//背景音乐按钮的绑定方法
		this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.music_tap, this);
		//音效按钮的绑定方法
		this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sound_tap, this);
		//初始化音乐/音效的显示
		this.update_button_stage();
	}
	/**
	 * 确定按钮的响应函数
	 */
	private agree_tap() {
		console.log('确定');
		//隐藏设置场景
		this.parent.removeChild(this);
		//播放一个点击音效
		SoundManager.Shared().playClick();
	}
	/**
	 * 背景音乐按钮的响应函数
	 */
	private music_tap() {
		// console.log('music');
		SoundManager.Shared().playClick();
		SoundManager.Shared().isMusic = !SoundManager.Shared().isMusic;
		//改变状态，（如果是可播放状态，则设置为禁用状态）
		this.update_button_stage();
	}
	/**
	 * 音效按钮的响应函数
	 */
	private sound_tap() {
		// console.log('sound');
		SoundManager.Shared().playClick();
		SoundManager.Shared().isSound = !SoundManager.Shared().isSound;
		this.update_button_stage();
	}
	/**
	 * 修改音乐/音效的状态
	 */
	private update_button_stage() {
		this.img_music_disable.visible = !SoundManager.Shared().isMusic;
		this.img_sound_disable.visible = !SoundManager.Shared().isSound;
	}
}