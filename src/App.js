import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.messageRef = React.createRef();
    this.selectUserRef = React.createRef();
    this.state = {
      menu:[
        'login-user','example-user-1','example-user-2','example-user-3','example-user-4','example-user-5',
        'example-user-6','example-user-7','example-user-8','example-user-9','example-user-0'
      ],
      selectUser: "example-user-1",
      message: [],
      senderFlag: true,
      receiverFlag: false,
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.selectUserChange = this.selectUserChange.bind(this);
  }

  // commit message function
  sendMessage = () => { 
    let temp = this.state.message;
    temp.push(
      {
        message:this.messageRef.current.value,
        sender: this.selectUserRef.current.value
      }
    );
    
    this.setState({
      message:temp
    },() => {
      this.messageRef.current.value = '';
      this.messageRef.current.focus();
    })
  }

  // reset message button
  resetMessage = () => {
    this.messageRef.current.value = '';
    this.messageRef.current.focus();
  }

  // Check last message
  isLastMessage = data => {
    return (data.keyProp === (this.state.message.length - 1));
  }

  // Show last send message time
  lastUpdateTime = () => {
    let dateNow = new Date();
    return dateNow.getHours()+':'+dateNow.getMinutes();
  }

  clearHistory = () => {
    const check = window.confirm('Are you sure ?');
    if(check){
      this.setState({
        message:[]
      });
    }
  }
  // change side bar user
  selectUserChange = value => {
    this.setState({
      selectUser:value
    })
  }
  render() {
    const styleSidemenu = {height:"100vh",textAlign:"center"};
    return (
      <div className="bg-dark container-fluid" style={{minHeight:"100vh"}}>
        <div className="row">

        {/* sidemenu */}
        <div className="col-3 p-2 bg-light" style={styleSidemenu}>
          <small className="h4 d-flex justify-content-center">Messager Beta v.1</small>
          <hr />
          <div style={{height:"85vh",overflowY:"scroll"}}>
            {this.state.menu.map((data,key) => 
            <button key={key} className="btn btn-block btn-sm btn-light" onClick={this.selectUserChange.bind(this,data)}>{data}</button>  
            )}
            <hr />
            {this.state.menu.map((data,key) => 
            <button key={key} className="btn btn-block btn-sm btn-light" onClick={this.selectUserChange.bind(this,data)}>{data}</button>  
            )}
          </div>
        </div>
        
        {/* maincontent */}
        <div className="col-9">
            <div className="bg-light mt-3 rounded p-2" >
              <div className="navbar shadow-sm">
                  <button className="btn btn-white">{this.state.selectUser.toUpperCase()}</button>
                  <span className="form-inline align-items-center">
                    <select className="custom-select mr-2" ref={this.selectUserRef}>
                      <option value={'login-user'}>login-user</option>
                      <option value={this.state.selectUser}>{this.state.selectUser}</option>
                    </select>
                    <button className="btn btn-outline-danger" onClick={this.clearHistory}>CLEAR</button>
                  </span>
              </div>
              <div className="mt-2" style={{height:"60vh",overflowY:"scroll"}}>
              {this.state.message.map(
                (data,key) => 
                <React.Fragment key={key}>
                  {data.sender === 'login-user' ?
                <SenderCurrent keyProp={key} message={data.message} nowTime={this.lastUpdateTime()} LastMessage={this.isLastMessage} />
                :
                <SenderOther keyProp={key} message={data.message} nowTime={this.lastUpdateTime()} LastMessage={this.isLastMessage} />  
                }
                </React.Fragment>
              )}
              </div>
            </div>

            {/* message box */}
            <div className="bg-light d-flex mt-3 rounded p-2 justify-content-center align-items-center" style={{height:"22vh",overflowY:"hidden"}}>
              <textarea className="form-control col-9 h-100" style={{resize:"none"}} placeholder="Input message" ref={this.messageRef} />
              <div className="col-3 align-item-center">
                <button className="btn btn-block btn-outline-primary" onClick={this.sendMessage}><b>SEND</b></button>
                <button className="btn btn-block btn-outline-danger" onClick={this.resetMessage}><b>RESET</b></button>
              </div>
            </div>
        </div>

        </div>
      </div>
    );
  }
}

class SenderCurrent extends Component {
  render(){
    const data = this.props
    return(
      <React.Fragment>
        <span className="d-flex mb-1 justify-content-end text-right text-white" style={{overflowWrap:"break-word"}}>
          <small className="col-6 h6 rounded p-2 bg-success">{data.message}</small>
        </span>
        {data.LastMessage(data) ?
        <span className="d-flex justify-content-end text-right mb-3">
          <small className="col-6 text-black-50">Last send {data.nowTime}</small>
        </span>  
      :null}
      </React.Fragment>
    )
  }
}

class SenderOther extends Component {
  render(){
    const data = this.props
    return(
      <React.Fragment key={data.key}>
        <span className="d-flex mb-1 justify-content-start text-left text-white" style={{overflowWrap:"break-word"}}>
          <small className="col-6 h6 rounded p-2 bg-info">{data.message}</small>
        </span>
        {data.LastMessage(data) ?
        <span className="d-flex justify-content-start text-left mb-3">
          <small className="col-6 text-black-50">Last send {data.nowTime}</small>
        </span>  
      :null}
      </React.Fragment>
    )
  }
}

export default App;
