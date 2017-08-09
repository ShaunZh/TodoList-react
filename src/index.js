import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




function activeTodoFolderItem() {
  let todoFolders = $('.leftAsideWrap').find('.todoFolderItemWrap');
  todoFolders.on('click', (e) => {
    let $target = $(e.target);
    let $folder = $target.hasClass('todoFolderItem') ? $target : $target.parent().eq(0);
    $.each(todoFolders.find('.todoFolderItem'), (index, item) => {
      $(item).removeClass('active');
    });
    $folder.addClass('active');
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
  let $input = $('.createFolder input').eq(0);
  $input.on('keydown', (e) => {
    if (e.key === 'Enter') {
      closeCreateFolderDialog();
    }
  });
  $saveBtn.on('click', (e) => {
    closeCreateFolderDialog();
  });
}


function dispFinishedTodoListToggle() {
  let $load = $('.contentWrap .loadFinishedTodos').eq(0);
  let $finishedTodo = $('.finishedTodoItemsWrap').eq(0);
  $load.on('click', () => {
    let disp = ($finishedTodo.css('display') === 'none') ? 'block' : 'none';
    $finishedTodo.css('display', disp);
  });
}

activeTodoFolderItem();
activeCreateFolder();
cancelCreateFolder();
saveNewFolder();
dispFinishedTodoListToggle();
