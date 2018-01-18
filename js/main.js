//TODO APP
document.addEventListener('DOMContentLoaded', function () {

  console.log("Hello world!")

  // select elements from the DOM
  var todoList = document.getElementById('todoList');
  var addTodo = document.getElementById('addTodo');
  var todoVal = document.getElementById('todoVal');
  var doneList = document.getElementById('doneList');

  //Arrays
  var todoArray = [];
  var doneArray = [];

  // add event handler to button
  addTodo.addEventListener('click', addTodoToDOM);

  function Action(name) {
    this.name = name;
    this.status = 'pending';
  }

  function updateLists() {
    todoArray.map((action) => {
      
      var deleteButt = document.createElement('input');
      deleteButt.type = 'checkbox';
      let tempLi = document.createElement('li');
      deleteButt.addEventListener('click', swapArrays);
    });
    todoList.append(tempList);
  }

  function swapArrays() {
    console.log(this);
    if (this.type == 'checkbox') {
      this.type = 'button';
      this.value = 'Done';
      doneList.appendChild(this.parentNode);
    } else {
      this.type = 'checkbox';
      this.checked = false;
      todoList.appendChild(this.parentNode);
    }
  };

  function addItem(){

    var deleteButt = document.createElement('input');
    deleteButt.type = 'checkbox';
    deleteButt.addEventListener('click', swapArrays);

    var todoText = document.createTextNode(todoArray[todoArray.length-1].name);
    var todoListItem = document.createElement('li');
    todoListItem.appendChild(todoText);
    todoListItem.appendChild(deleteButt);
    todoList.appendChild(todoListItem);
  }

  function addTodoToDOM(ev) {
    todoArray.push(new Action(todoVal.value));
    addItem();
    todoVal.value = '';
  }

});
