class Word extends eui.Component implements eui.UIComponent {

	//组件中的文本
	public lb_text: eui.Label;

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
		this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.word_tap, this);
	}
	/**
	 * 点击选择区域的文字的响应方法
	 */
	protected word_tap() {
		//点击文字，让游戏场景去处理自己
		SceneGame.Shared().word_click(this);
	}
	//设置文本内容
	public setWordText(val: string){
		this.lb_text.text = val;
	}
	//获取文本内容
	public getWordText(): string{
		return this.lb_text.text;
	}
}

/**
 * 答案区域的字（成语的四个组成字）
 */
class AnswerWord extends Word{
	//记录答案区域的内容
	public SelectWord: Word = null;

	public constructor(){
		super();
	}
	/**
	 * 点击答案区域的字的响应方法
	 */
	protected word_tap(){
		//如果点击的答案区有内容（有文字）
		if(this.SelectWord != null){
			//清空该答案区
			this.SelectWord.visible = true;
			this.SelectWord = null;
			this.setWordText("");
		}
	}
	/**
	 * 点击选择区域的word，在ananswer中记录下来这个word
	 */
	public SetSelectWord(word: Word){
		if(word != null){
			this.setWordText(word.getWordText());
			this.SelectWord = word;
			word.visible = false;
		}
		else{
			this.setWordText("");
			this.SelectWord = null;
		}
		//记录点击的word
		// this.SelectWord = word;
	}

}