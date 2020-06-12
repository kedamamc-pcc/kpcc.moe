interface PlayersJson {
  _version: string
  _update: number
  players: PlayerInfo[]
}

interface PlayerInfo {
  uuid: string
  name: string
  names: NameRecord[]
  time_start: number
  time_last: number
  time_lived: number
  banned: boolean
}

interface NameRecord {
  name: string
  changedToAt?: number
}
