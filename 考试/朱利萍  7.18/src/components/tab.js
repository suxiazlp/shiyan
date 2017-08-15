import React from 'react';
import  {Component}  from 'react';
import '../App.css';


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className="tab" style={{backgroundColor:this.props.studentIndex==this.props.index?"#eed63b":"",
            color:this.props.studentIndex==this.props.index?"#000":""}}
                    onClick={()=>this.props.changeIndex(this.props.index)}
        >
            {this.props.name}
        </div>

    }
}

export default Tab;
