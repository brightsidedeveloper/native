import { BrightTable } from '../types/bright.types'
import BrightBaseCRUD from './BrightBase/BrightCRUD'

const Tables = {
  contributor: new BrightBaseCRUD<Contributor, ContributorCreateOptions>('contributor'),
  house: new BrightBaseCRUD<House, HouseCreateOptions>('house'),
  ticket: new BrightBaseCRUD<Ticket, TicketCreateOptions>('ticket'),
  user: new BrightBaseCRUD<User, UserCreateOptions>('user'),
}

export type Contributor = BrightTable<'contributor'>
export interface ContributorCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type ContributorReadOptions = Parameters<typeof Tables.contributor.read>

export type ContributorInfiniteReadOptions = [
  Parameters<typeof Tables.contributor.read>[0],
  Omit<Parameters<typeof Tables.contributor.read>[1], 'limit' | 'offset'>
]

export type House = BrightTable<'house'>
export interface HouseCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type HouseReadOptions = Parameters<typeof Tables.house.read>

export type HouseInfiniteReadOptions = [
  Parameters<typeof Tables.house.read>[0],
  Omit<Parameters<typeof Tables.house.read>[1], 'limit' | 'offset'>
]

export type Ticket = BrightTable<'ticket'>
export interface TicketCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type TicketReadOptions = Parameters<typeof Tables.ticket.read>

export type TicketInfiniteReadOptions = [
  Parameters<typeof Tables.ticket.read>[0],
  Omit<Parameters<typeof Tables.ticket.read>[1], 'limit' | 'offset'>
]

export type User = BrightTable<'user'>
export interface UserCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type UserReadOptions = Parameters<typeof Tables.user.read>

export type UserInfiniteReadOptions = [
  Parameters<typeof Tables.user.read>[0],
  Omit<Parameters<typeof Tables.user.read>[1], 'limit' | 'offset'>
]

export default Tables
