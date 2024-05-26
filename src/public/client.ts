import io from 'socket.io-client'
import { GameSummary } from '../summaries/gameSummary'
import { FeatureSummary } from '../summaries/featureSummary'

const socket = io()

let featureSummaries: FeatureSummary[] = []

window.onmousedown = (event: MouseEvent) => {
  console.log('featureSummaries', featureSummaries)
}

socket.on('connected', () => {
  console.log('connected')
  setInterval(updateServer, 1 / 60)
})
socket.on('gameSummary', (gameSummary: GameSummary) => {
  featureSummaries = gameSummary.featureSummaries
})

function updateServer (): void {
  const msg = {}
  socket.emit('clientUpdateServer', msg)
}
