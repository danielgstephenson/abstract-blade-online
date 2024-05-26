import io from 'socket.io-client'

const socket = io()

socket.on('connected', () => {
  console.log('connected')
})
