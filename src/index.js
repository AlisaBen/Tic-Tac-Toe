import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//       className="square" 
//       onClick={()=>this.props.onClick()}//在类中使用箭头函数来访问正确的this值
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

/**
和class实现的功能相同，只不过应用了函数式组件
*/
function Square(props) {//Board组件传来props属性，包括value和onClick,据此更改显示的值
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

// class Board extends React.Component {
//   constructor() {
//     super();
//     this.state = {//state下存储两个状态，squares和xIsNext分别表示9个方格的内容和X是否是下一个player
//       squares: Array(9).fill(null),
//       xIsNext:true,//X是首发
//     };
//   }
//   handlelick(i) {
//     const squares = this.state.squares.slice();//创建squares数组的副本进行修改
//     if (calculateWinner(squares) || squares[i]) {
//       return;//有人赢了比赛，或者该位置已经被填充过
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';//如果X是下一位Player，就修改squares副本的第i个值为’X‘
//     this.setState({
//       squares:squares,//更新squares数组
//       xIsNext:!this.state.xIsNext,//更新xIsNext
//     });
//   }
//   renderSquare(i) {
//     return (
//        <Square 
//        value={this.state.squares[i]}
//        onClick={()=>this.handlelick(i)}
//         />
//       );
//   }

//   render() {
//     const winner = calculateWinner(this.state.squares);
//     let status;
//     if (winner) {
//       status = 'winner: ' + winner;
//     }else{
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }


//为了存储回放记录而重新构建Board组件
class Board extends React.Component {
  renderSquare(i) {
    return (
       <Square 
       value={this.props.squares[i]}
       onClick={()=>this.props.onClick(i)}
        />
      );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'winner: ' + winner;
    // }else{
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



//存储回放记录
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {//history存储历史状态
      history:[{
        squares:Array(9).fill(null)//每走一步，history会更新一个squares
      }],
      stepNumber:0,//步数
      xIsNext:true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];//拿到当前的squares数组

    const squares = current.squares.slice();//创建squares数组的副本进行修改
    if (calculateWinner(squares) || squares[i]) {
      return;//有人赢了比赛，或者该位置已经被填充过
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';//如果X是下一位Player，就修改squares副本的第i个值为’X‘
    this.setState({//每次更新值的时候要更新history、stepNumber、xIsNext
      history:history.concat([{//原来的history状态连接当前的squares状态
        squares:squares
      }]),
      stepNumber:history.length,
      // squares:squares,//更新squares数组
      xIsNext:!this.state.xIsNext,//更新xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber:step,
      xIsNext:(step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        // <li key={move}>
          // <a herf="#" onClick={()=>this.jumpTo(move)}>{desc}</a>
        // </li>
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if(winner) {
      status = 'winner: ' + winner; 
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//计算获胜者
function calculateWinner(squares) {
  const lines = [//赢得比赛的几种可能性所占的下标
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {//遍历所有的可能性并判断每种下标组合的状态下，是否squares的数值相同，若相同则返回数值，否则返回空
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// class ShoppingList extends React.Component{
// 	render() {
// 		return (
// 			<div className="shopping-list">
// 				<h1>shopping list for {this.props.name}</h1>
// 				<ul>
// 					<li>instagram</li>
// 					<li>whatsApp</li>
// 					<li>oculus</li>
// 				</ul>

// 			</div>

// 			);
// 	}
// }

// return React.createElement('div',{className:'shopping-list'},
//   React.createElement('h1',null,"shopping list for",props.name),
//   React.createElement(
//     'ul',
//     null,
//     React.createElement("li",null,"instagram"),
//     React.createElement("li",null,"whatsApp"),
//     React.createElement("li",null,"oculus")
//     )
//   );