var uuid = require('uuid/v1')

function reducer(bus, state) {

  bus.on('addItem', function (name) {
    let action = {
      id: uuid(),
      name: name,
      status: 'pending'
    }
    state.actions = [...state.actions,action]
    state = {
      actions: state.actions
    }    
    bus.emit('update', state)
})

bus.on('removeItem', function(id) {
    state.actions = state.actions.filter(function (action) {
        if (id === action.id) {
            if (action.status === 'pending') {
              action.status = 'done'              
            }else{
                action.status = 'pending'
            }
        }
      return action;
    })
    bus.emit('update', state)
  })

}

export default reducer
