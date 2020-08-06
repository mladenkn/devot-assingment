export type LoadableStatus = 'LOADING' | 'LOADED' | 'ERROR'

export type Loaded<T> = {
  status: 'LOADED',
  value: T
}

export type Loadable<T> = Loaded<T> | { status: 'LOADING' } | { status: 'ERROR' }