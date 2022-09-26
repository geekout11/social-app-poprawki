import React, { Component } from 'react';
import './Main.css';
import { API } from '../data/Api';
import { TIME_TO_LOGIN_POPUP } from '../data/Config';

import Post from '../components/Post';
import Popup from '../components/Popup';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      bombingPopup: '',
    };
  }

  apiHandler = (res) => {
    this.setState({
      apiData: res,
    });
  };

  componentDidMount() {
    const globalAPI = new API('global');
    globalAPI.getData(this.apiHandler);
    setTimeout(() => {
      this.setState({
        bombingPopup: <Popup setLoginGate={this.props.setLoginGate} />,
      });
    }, TIME_TO_LOGIN_POPUP);
  }

  componentWillUnmount() {
    this.setState({
      bombingPopup: '',
    });
  }

  render() {
    return (
      <div className="main-cont">
        <Post posts={this.state.apiData.data} />
        {this.state.bombingPopup}
      </div>
    );
  }
}

export default Main;
