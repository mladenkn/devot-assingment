import { LoadableStatus, Loaded, Loadable } from "./loadable"

export type LoadableListStatus = LoadableStatus | 'LOADING_MORE'

export type LoadedList<T> = Loaded<T>

export type LoadableList<T> = Loadable<T> | { status: 'LOADING_MORE', value: T }