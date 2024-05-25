import { getIo } from './server.js'
import { World } from 'planck'

const updateInterval = 1 / 60

const world = new World()

const io = getIo(() => {
  setInterval(update, updateInterval * 1000)
})

function update () {
  //
}
