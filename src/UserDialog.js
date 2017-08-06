/*
* @Author: Marte
* @Date:   2017-08-03 21:29:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 21:30:21
*/
import './UserDialog.css'
import React from 'react';
import LeftAsideDialog from './LeftAsideDialog';

import ContentDialog from './ContentDialog';
import CreateFolder from './CreateFolder';

export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: {
        username: '放风筝的小小马',
        email: '308826842@.com'
      }
    };
  }



  render() {
    return (
      <div className="userDialogWrap">
        <LeftAsideDialog />
        <ContentDialog />
        {/*<CreateFolder accountInfo={this.state.accountInfo}/>*/}

      </div>
    )
  }
}