import reducer from './reducer'
var yo = require('yo-yo')
var EventEmitter = require('events')


const state = {
  actions: []
}

const bus = new EventEmitter
bus.on('update', update)
  reducer(bus, state)

var item = {
  id: '',
  name: '',
  status: ''
}
var text = "todoVal"
var el = list(state.actions, addItem, removeItem)
var li = listItem(item, removeItem)

function listItem(item, remove) {
  return yo `<li id=${item.id}>
        ${item.name}
        ${item.status === 'pending' ? yo `<input type="checkbox" onclick=${remove}>` : yo `<button onclick=${remove} class="btn">Delete</button>`}       
    </li>`
}

function list(items, onclick, remove) {
  return yo `<div>
    ToDo App 
    <input type="text" id="todoVal">
    <button onclick=${onclick} class="btn">Add action</button>
    <ul>
      ${items.map(function (item) {
          if (item.status === 'pending') {
            return listItem(item, remove)
          } 
      })}
    </ul>   
    Done
    <ul>
      ${items.map(function (item) {
        if (item.status === 'done') {
            return listItem(item, remove)
        }        
      })}
    </ul>     
  </div>`
}

function update(state) {
  var newList = list(state.actions, addItem, removeItem)
  yo.update(el, newList)
}

function addItem() {
  let name = document.getElementById(text)
  bus.emit('addItem', name.value)
  name.value = ''
}


function removeItem(ev) {
  let id = ev.target.parentNode.getAttribute('id')
  bus.emit('removeItem', id)

}

document.body.appendChild(el)
