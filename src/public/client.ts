import io from 'socket.io-client'
import { PlayerSummary } from '../summaries/playerSummary'
import { Renderer } from '../renderer'
import { Input } from './input'
import { InputSummary } from '../summaries/inputSummary'

const socket = io()
const input = new Input()
const renderer = new Renderer()

let inputSummary: InputSummary = new InputSummary(input)

window.onmousedown = (event: MouseEvent) => {
  // console.log('position', renderer.fighterSummaries[0].position)
  console.log(inputSummary.moveDir)
}

socket.on('connected', () => {
  console.log('connected')
  setInterval(updateServer, 1 / 60)
})
socket.on('summary', (summary: PlayerSummary) => {
  renderer.readSummary(summary)
})

function updateServer (): void {
  inputSummary = new InputSummary(input)
  socket.emit('input', inputSummary)
}
