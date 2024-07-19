import type { ScaleReading, SnapshotMessage } from '$lib/types'

export const parseCapacity = (value: string): number => {
  const [perScale, numScales] = value.split(' x ')
  return parseInt(perScale) * parseInt(numScales)
}

export const parseSnapshot = (message: SnapshotMessage): ScaleReading => {
  return {
    weight: parseInt(message.weight),
    unit: message.units,
    mode: message.mode,
    motion: message.motion,
    tare: parseInt(message.tarevalue),
    capacity: parseCapacity(message.capacity),
  }
}
