import React from "react";
//1. 创建一个扩展React.component的es6类
//2. 创建一个叫做render的空方法
//3. 将函数体移动到render（）方法中
//4. 在render（）方法中，使用this.props替换props
//5. 删除剩余的空函数声明
//6. 给类添加局部状态
//7. 将this.props.state 替换为 this.state.date
//8. 设定一个函数用于更新时间
//9. 使用this.Setdate({})来更新状态
//10. 借助生命周期调用tick更新状态

//无状态组件
<Home state={new Date().toLocaleTimeString()} />;
// props只读属性 接受父元素传递的state
function Home(props) {
  return (
    <div>
      <h1>无状态组件</h1>
      <h2>{props.state}</h2>
    </div>
  );
}
//有状态组件
class Clock extends React.Component {
  constructor() {
    super(); //继承父类的属性 获取this指向、
    console.log(this);
    this.state = {
      date: new Date().toLocaleTimeString(),
      name: "jcakda",
      msg: "Paimovie",
    };
  }
  componentDidMount() {
    //组件挂载之后
    this.time = setInterval(this.tick.bind(this), 1000);
    this.setState({
      //1.this.setState可能是异步的不能依赖它直接赋值
      name: "陈园呀", // max :this.state.name +this.state. msg
    });
    setTimeout(() => {
      console.log(this.state.name);
    }, 20);
    //2.解决异步赋值
    this.setState((prevState, props) => {
      console.log(prevState); // prevState.max  = prevState.name + prevState.msg
      return {
        max: prevState.name + prevState.msg,
      };
    }); //类似vue的nexttick原理为定时器 // setInterval(() => { //     this.tick() // }, 1000);
  }
  componentWillUnmount() {
    //组件即将卸载
    clearInterval(this.time);
  }
  tick() {
    this.setState({
      date: new Date().toLocaleTimeString(),
    });
  } //render用于进行diff算法 对比组件（元素） 不允许在render中调用this.setState({})
  render() {
    return (
      <div>
        <h1>{this.state.date}</h1>
        <h2>{this.state.name}</h2>
        <h1>{this.state.max}</h1>
      </div>
    );
  }
}
export default Clock;
