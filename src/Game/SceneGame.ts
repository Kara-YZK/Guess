class SceneGame extends eui.Component implements eui.UIComponent {
	//返回按钮
	public btn_back: eui.Button;
	//成语提示图片
	public img_question: eui.Image;
	//选择区域组
	public group_words: eui.Group;
	//答案区域组
	public group_answer: eui.Group;

	//声明一个变量，用来表示所处的关卡
	private levelIndex: number;

	//游戏正解组
	public group_win: eui.Group;
	//下一关的组
	public btn_next: eui.Button;
	//成语解释
	public lb_explain: eui.Label;
	//成语出处
	public lb_from: eui.Label;

	private static shared: SceneGame;
	public static Shared(): SceneGame {
		if (SceneGame.shared == null) {
			SceneGame.shared = new SceneGame();
		}
		return SceneGame.shared;
	}

	public constructor() {
		super();
		this.skinName = "resource/Game/SceneGame.exml"
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
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_tap, this);
		this.group_win.visible = false;
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_tap, this);
	}
	/**
	 * 返回按钮的响应函数
	 */
	private back_tap() {
		this.parent.addChild(SceneLevel.Shared());
		this.parent.removeChild(this);
	}
	/**
	 * 初始化游戏场景
	 */
	public initLevel(level: number) {
		//记录当前关卡
		this.levelIndex = level;
		//获取关卡的内容
		var levelData = LevelDataManager.Shared().getLevel(level);
		//先把自己关卡的成语（4个字）和混淆字（16个字）拼接起来
		var words = levelData.answer + levelData.word;
		//随机一个关卡，把随机关卡的成语和混淆字也拼接到words后面
		while (words.length == 10) {
			var i = Math.floor(Math.random() * 400);
			if (i != level) {
				var temp = LevelDataManager.Shared().getLevel(i);
				//把随机关卡的成语和混淆字添加进来
				words += temp.answer + temp.word;
			}
		}
		//把words变成数组
		var wordList: string[] = [];
		for (var i: number = 0; i < words.length; i++) {
			wordList.push(words.charAt(i));
		}
		//重新排列(打乱wordList这个数组)
		wordList = this.randomList(wordList);
		//把wordList里面的文字渲染出来
		for (var i = 0; i < this.group_words.numChildren; i++) {
			//获取到选择区域 Word 组件
			var word = <Word>this.group_words.getChildAt(i);
			//设置word的显示内容
			word.setWordText(wordList[i]);
			//设置该word可见
			word.visible = true;
		}
		//对答案区域进行初始化
		for (var i: number = 0; i < this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i);
			answer.SetSelectWord(null);
			answer.visible = true;
			answer.SelectWord = null;
		}
		//显示图示提示
		this.img_question.source = "resource/assets/data/" + levelData.img;
	}
	/**
	 * 对一个数组进行随机排列
	 */
	private randomList(arr: string[]): string[] {
		var array = [];
		while (arr.length > 0) {
			var i = Math.floor(Math.random() * arr.length);
			array.push(arr[i]);
			arr.splice(i, 1);
		}
		return array;
	}
	/**
	 * 点击选择区域的文本后的响应函数
	 */
	public word_click(word: Word) {
		var sel: AnswerWord = null;
		for (var i: number = 0; i < this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i);
			if (answer.SelectWord == null) {
				sel = answer;
				break;
			}
		}
		//如果存在空白区，则把点击的文字上传到答案区
		if (sel != null) {
			sel.SetSelectWord(word);
			//胜利判断
			var check_str: string = "";
			for (var i: number = 0; i < this.group_answer.numChildren; i++) {
				var answer = <AnswerWord>this.group_answer.getChildAt(i);
				check_str += answer.getWordText();
			}
			//如果答案区的拼成成语等于当前关卡的答案，则弹出正解场景页面
			if (check_str == LevelDataManager.Shared().getLevel(this.levelIndex).answer) {
				this.showWin();
			}
		}
	}
	/**
	 * 显示正解场景
	 */
	private showWin() {
		// console.log("win");
		this.group_win.visible = true;
		//获取游戏的关卡信息
		var levelData = LevelDataManager.Shared().getLevel(this.levelIndex);
		this.lb_from.text = levelData.content;
		this.lb_explain.text = levelData.tip;
	}
	/**
	 * 点击下一关按钮的响应函数
	 */
	private next_tap() {
		//先把游戏正解场景隐藏起来
		// this.group_win.visible = false;
		//从新初始化游戏场景
		this.initLevel(this.levelIndex + 1);
	}
}