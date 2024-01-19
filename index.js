// Import stylesheets
import './style.css';

const onClickAdd = () => {
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';

  //未完了リストに追加
  createIncompleteTodo(inputText);
};

//渡された引数を元に未完了のTODOを作成する関数
const createIncompleteTodo = (todo) => {
  //liを生成
  const li = document.createElement('li');

  //div生成
  const div = document.createElement('div');
  div.className = 'list-row';

  //p生成
  const p = document.createElement('p');
  p.className = 'todo-item';
  p.innerText = todo;

  //button(完了)タグ生成
  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  completeButton.addEventListener('click', () => {
    /* const completeTarget = completeButton.closest('li');
       document.getElementById('incomplete-list').removeChild(deleteTarget);
       const todovalue = completeTarget.p;
      */
    //押された完了ボタンの親にあるliタグを配下の完了ボタンと削除ボタンを削除
    const moveTarget = completeButton.closest('li');
    //削除ボタンの削除
    completeButton.nextElementSibling.remove();
    //完了ボタンの削除
    completeButton.remove();
    //戻すボタンを生成してdivタグ配下に設定
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    backButton.addEventListener('click', () => {
      //TODOの内容を取得し、未完了リストに追加
      //戻すボタンの前のpタグのテキストを取得する
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      //押された戻すボタンの親にあるliタグを削除
      backButton.closest('li').remove();
    });

    //moveTargetがliタグを持っているので、firstElementChildをするとdivタグを取得できる。
    moveTarget.firstElementChild.appendChild(backButton);
    //完了リストに移動
    document.getElementById('complete-list').appendChild(moveTarget);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';
  deleteButton.addEventListener('click', () => {
    //削除ボタンから一番近いliタグを探す。
    const deleteTarget = deleteButton.closest('li');
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  //階層構造の処理
  //ulタグのid="incomplete-list"にliタグをさすこむ処理
  //注意：　先にappendしたものから左に表示されていく。
  div.append(p);
  div.append(completeButton);
  div.append(deleteButton);
  li.append(div);
  //未完了リストに追加
  document.getElementById('incomplete-list').appendChild(li);
};

document.getElementById('add-button').addEventListener('click', onClickAdd);
