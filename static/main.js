//To make the layout and state preservation a little bit easier to deal with we are also going to use Vue.js.
const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Websockets Chat',
     name: '',
     text: '',
     messages: [],
     socket: null
    },
    methods: {
        //sendMessage() function which gets the input from our layout and emits it to our 
        //server using the same event if the input is correct
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    }
   },
   //this function will be executed whenever the frontend is created
   //we instantiate our socket variable using the socketio library we will later import in our frontend.
    created() {
     this.socket = io('http://localhost:3000')
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })