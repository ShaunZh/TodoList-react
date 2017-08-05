/*
* @Author: Marte
* @Date:   2017-08-03 21:29:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 21:30:21
*/

import React from 'react';
import LeftAsideDialog from './LeftAsideDialog';
import ContentDialog from './ContentDialog';

export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <div className="userDialogWrap">
        <div className="leftAside">
          <LeftAsideDialog/>
        </div>
        {/*<div className="content">*/}
          {/*<ContentDialog/>*/}
        {/*</div>*/}
      </div>
    )
  }
}