export class UserAuthInfo {
  id!: number
  email!: string
  firstName!: string
  lastName!: string
  roleDto!: Role
}

export interface Role {
  id: number
  name: string
  privileges: string[]
}
