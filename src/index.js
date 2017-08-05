import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




function activeTodoFolderItem() {
  let todoFolders = $('.leftAsideWrap').find('.todoFolderItem');
  $.each(todoFolders, function(index, item) {
    let _this = $(this);
    console.log(_this)
    _this.on('click', () => {
      console.log('click');
      todoFolders.removeClass('active');
      _this.addClass('active');
      console.log(this);
    });
  });
}

activeTodoFolderItem();

