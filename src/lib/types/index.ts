type ScaleMode = 'gross' | 'net' | 'tare'

export type SnapshotMessage = {
  messagetype: string
  scalenumber: number
  uiindex: number
  labelkey: string
  units: string
  capacity: string
  weight: string
  mode: ScaleMode
  centerofzero: boolean
  motion: boolean
  emulatedcell: boolean
  taretype: number
  rangeinterval: number
  tarevalue: string
  temperature: string
}

export type ScaleReading = {
  weight: number
  unit: string
  mode: ScaleMode
  motion: boolean
  tare: number
  capacity: number
}

export type ScaleConfig = {
  name: string
  url: string
}
