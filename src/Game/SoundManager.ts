class SoundManager {
	//点击声音
	private click_sound: egret.Sound;
	//点击字块的声音
	private word_sound: egret.Sound;
	//胜利的音频
	private win_sound: egret.Sound;
	//错误的音频
	private error_sound: egret.Sound;
	//背景音乐
	private bgm_sound: egret.Sound;
	//保存背景音乐静音的音轨
	private bgm_channel: egret.SoundChannel;
	//音效静音显示
	//声明单例
	private static shared: SoundManager;
	public static Shared(): SoundManager {
		if (SoundManager.shared == null) {
			SoundManager.shared = new SoundManager();
		}
		return SoundManager.shared;
	}
	public constructor() {
		//加载所有的音频文件
		// this.click_sound = new egret.Sound();
		// this.click_sound.load(url)
		this.click_sound = RES.getRes('buttonclick_mp3');
		this.bgm_sound = RES.getRes('Music_mp3');
		this.win_sound = RES.getRes('right_mp3');
		this.error_sound = RES.getRes('wrong_mp3');
		this.word_sound = RES.getRes('type_word_mp3');
	}
	/**
	 * 播放背景音乐
	 */
	public playBgm() {
		if (this.isMusic) {
			this.bgm_channel = this.bgm_sound.play(0, 0);
		}
	}
	/**
	 * 停止背景音乐
	 */
	public stopBgm() {
		if (this.bgm_channel != null) {
			this.bgm_channel.stop();
		}
	}
	/**
	 * 音效播放
	 */
	public playClick() {
		if (this.isSound) {
			this.click_sound.play(0, 1);
		}
	}
	/**
	 * 成功的音效播放
	 */
	public playWin() {
		if (this.isSound) {
			this.win_sound.play(0, 1);
		}
	}
	/**
	 * 答案错误的音效
	 */
	public playError() {
		if (this.isSound) {
			this.error_sound.play(0, 1);
		}
	}
	/**
	 * 点击文字的音效播放
	 */
	public playWord() {
		if (this.isSound) {
			this.word_sound.play(0, 1);
		}
	}
	/**
	 * 音乐是否播放，保存设置
	 */
	public set isMusic(val) {
		if (!val) {
			egret.localStorage.setItem('isMusic', "0");
			this.stopBgm();
		}
		else {
			egret.localStorage.setItem('isMusic', "1");
			this.playBgm();
		}
	}
	/**
	 * 获取音频是否播放
	 */
	public get isMusic() {
		let b = egret.localStorage.getItem('isMusic');
		if (b == null || b == "") {
			return true;
		}
		else {
			return b == "1";
		}
	}
	/**
	 * 音效是否播放，保存设置
	 */
	public set isSound(val) {
		if (val) {
			egret.localStorage.setItem('isSound', "1");
		}
		else {
			egret.localStorage.setItem('isSound', "0");
		}
	}
	/**
	 * 获取音频的配置
	 */
	public get isSound() {
		let b = egret.localStorage.getItem('isSound');
		if (b == null || b == "") {
			return true;
		}
		else {
			return b == "1";
		}
	}
}