export class UpdateRoomDto {
  readonly id: number
  readonly owner: number
  readonly name: string
  readonly avatar: string
  readonly participants: any
}
