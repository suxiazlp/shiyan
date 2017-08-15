import React from 'react';
import  {Component}  from 'react';
import './App.css';
import Tab from './components/tab'

class App extends Component {
    constructor(props) {
        super(props);
        this.changeIndex = this.changeIndex.bind(this);
        this.state = {
            data: [
                {name: "杨幂", score: '逆时营救'},
                {name: "刘诗诗", score: '步步惊心'},
                {name: "白敬亭", score: '匆匆那年'},
                {name: "胡歌", score: '逍遥'},
                {name: "薛子谦", score: '我们的少年时代'},
                {name: "林俊杰", score: '爱笑的眼睛'},
                {name: "吴昕", score:'快乐大本营'},
                {name: "郑凯", score: '跑男'},
                {name: "朱亚文", score: '漂洋过海'},
                {name: "周杰伦", score: '晴天'},

            ],
            studentIndex: -1
        }
    }

    changeIndex(val) {
        this.setState({
            studentIndex: val
        })
    }

    render() {

        return (<div>
            <div className="bgbox">
                {
                    this.state.data.map((obj, index)=> {
                        return <Tab name={obj.name} 
                                    key={index} 
                                    index={index} 
                                    changeIndex={this.changeIndex} 
                                    studentIndex={this.state.studentIndex}/>
                    })
                }
            </div>
            <div className="showScore">
                {
                    (this.state.data[this.state.studentIndex] || {}).score
                }
            </div>
        </div>)

    }
}

export default App;
