//引入Foot类
import Foot from "./Foot";
//引入ScorePanel类
import ScorePanel from './ScorePanel'
//引入Snake类
import Snake from './Snake'

//游戏控制器
class GameControl {
  snake: Snake //蛇
  food: Foot  //食物
  scorePanel: ScorePanel  //记分牌
  direction: string = 'ArrowRight' //蛇的移动方向
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Foot()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  //游戏初始化
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    //调用run方法
    this.run()
  }

  //键盘按下函数
  keydownHandler(event: KeyboardEvent) {
    //检查event.key是否合法
    this.direction = event.key
    // console.log(event.key); 
    // this.run()
  }

  //控制蛇移动的方向
  run() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        //向上移动
        Y -= 10
        break;
      case "ArrowDown":
      case "Down":
        //向下移动
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10
        //向左移动
        break;
      case "ArrowRight":
      case "Right":
        //向右移动
        X += 10
        break;
    }

    this.checkEat(X,Y)

    //修改蛇的X和Y的值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e: any) {
      //进入catch，说明出现了异常，游戏结束
      alert(e.message + 'Game Over!')
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  //蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log('吃到食物了');
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }

}

export default GameControl