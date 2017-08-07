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
      todoFolders.removeClass('active');
      _this.addClass('active');
    });
  });
}

function activeCreateFolder() {
  let $createFolderBtn = $('.leftAsideWrap').find('.createFolderAction');
  $createFolderBtn.on('click', () => {
    let $createFolderDialog = $('.createFolder').eq(0);
    let fade = '<div class="fade fade-active"></div>';
    $('body').eq(0).append(fade);

    $createFolderDialog.animate({
      top: "25%",
    }, 100, () => {
      console.log('出来了');
    })
  })
}

function closeCreateFolderDialog() {
  let $fade = $('.fade');
  let $createFolderDialog = $('.createFolder').eq(0);
  $createFolderDialog.css({top: "-100%"});
  $fade.remove();
}


function cancelCreateFolder() {
  let $cancelBtn = $('.createFolder .cancel-btn').eq(0);
  $cancelBtn.on('click', (e) => {
    e.preventDefault();
    closeCreateFolderDialog();
  });
}

function saveNewFolder() {
  let $saveBtn = $('.createFolder .confirm-btn').eq(0);
  $saveBtn.on('click', (e) => {
    console.log('hahah');
    e.preventDefault();
    closeCreateFolderDialog();
  });
}


activeTodoFolderItem();
activeCreateFolder();
cancelCreateFolder();
saveNewFolder();
