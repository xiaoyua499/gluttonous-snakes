
//定义记分牌类
class ScorePanel {
  score = 0//分数
  level = 1//等级

  //分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number //最大等级
  UpScore: number //升级条件

  constructor(maxLevel: number = 10, UpScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.UpScore = UpScore
  }

  //设置加分的方法
  addScore() {
    this.score++
    this.scoreEle.innerHTML = this.score + ''
    if (this.score % this.UpScore === 0) {
      this.levelUp()
    }
  }

  //提升等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }
}

// const scorePanel = new ScorePanel()
// for (let i = 0; i < 200; i++) {
//   scorePanel.addScore()
// }

export default ScorePanel