import React, {
  Component
} from 'react';

import 'normalize.css';
import './reset.css';
import './App.css';

import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'loginDialog'// 'userDialog', // 或 loginDialog
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.currentTab === 'loginDialog' ?
          <LoginDialog /> :
          <UserDialog />
        }
      </div>
    );
  }
}



var te = 1;

export default App;