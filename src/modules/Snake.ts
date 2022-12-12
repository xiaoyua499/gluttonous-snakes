class Snake {

  //获取蛇的容器
  element: HTMLElement
  //获取蛇头元素
  head: HTMLElement
  //蛇的身体
  bodies: HTMLCollection

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  //获取蛇的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  //设置蛇头的坐标
  set X(value: number) {
    if (this.X === value) {
      return
    }
    //X的值的合法范围为0-290
    if (value < 0 || value > 290) {
      //如果蛇撞墙了，抛出一个错误
      throw new Error("蛇撞墙了");
    }
    //判断是否掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('掉头了');
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    //Y的值的合法范围为0-290
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }
    //判断是否掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log('掉头了');
      if (value > this.X) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.moveBody()

    this.head.style.top = value + 'px'

    this.checkHeadBody()
  }

  //蛇增加身体的方法
  addBody() {
    //向element中添加一个div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  //蛇身体移动的方法
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取千变身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      //将这个值设置到当前的身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  //判断是否撞到自己
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到了自己！！");

      }
    }
  }
}

export default Snake