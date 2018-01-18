var yo = require('yo-yo')
var uuid = require('uuid/v1')

var actions = []
var text = "todoVal"
var el = list(actions, update, removeAction)

function list(items, onclick, remove) {
  return yo `<div>
    ToDo App 
    <input type="text" id="todoVal">
    <button onclick=${onclick} class="btn">Add action</button>
    <ul>
      ${items.map(function (item) {
          if (item.status === 'pending') {
            return yo`<li id=${item.id}>
                ${item.name}
                <input type="checkbox" onclick=${remove} class="btn">
            </li>`
          }        
      })}
    </ul>   
    Done
    <ul>
      ${items.map(function (item) {
        if (item.status === 'done') {
            return yo`<li id=${item.id}>
                ${item.name}
                <button onclick=${remove} class="btn">Pending</button>
            </li>`
        }        
      })}
    </ul>     
  </div>`
}

function update() {

  let action = {
    id: uuid(),
    name: document.getElementById(text).value,
    status: 'pending'
  }

  actions.push(action)

  document.getElementById(text).value = ""

  var newList = list(actions, update, removeAction)
  yo.update(el, newList)
}

function removeAction(ev) {

  let id = ev.target.parentNode.getAttribute('id')
  actions = actions.filter(function (action) {
      if (id === action.id) {
          if (action.status === 'pending') {
            action.status = 'done'              
          }else{
              action.status = 'pending'
          }
      }
    return action;
  })

  var newList = list(actions, update, removeAction)
  yo.update(el, newList)
}

document.body.appendChild(el)
