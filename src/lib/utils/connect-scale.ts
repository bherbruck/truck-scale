import type { ScaleReading, SnapshotMessage } from '$lib/types'
import { parseSnapshot } from './parse-snapshot'
import io from 'socket.io-client'

export const connectScale = (
  url: string,
  onScaleReading: (reading: ScaleReading) => void = (_) => {},
) => {
  const socket = io(url)
  socket.on('connect', () => {
    console.log('Connected to', socket.io.uri)
  })
  socket.on('connect_error', (error: Error) => {
    console.error('Connect Error:', error.message)
  })
  socket.on('disconnect', (reason: string) => {
    console.log('Disconnected:', reason)
  })
  socket.on('message', (data: string) => {
    const message = JSON.parse(data.toString()) as {
      messagetype: string
      [key: string]: any
    }
    if (message.messagetype !== 'snapshot') return
    const reading = parseSnapshot(message as SnapshotMessage)
    onScaleReading(reading)
  })
}
