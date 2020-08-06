export type LoadableListStatus = 'LOADING' | 'LOADED' | 'LOADING_MORE' | 'ERROR'

export interface LoadedList<T> {
  status: 'LOADED',
  value: T
}

export type LoadableList<T> = LoadedList<T> | { status: 'LOADING' } | { status: 'LOADING_MORE', value: T } | { status: 'ERROR' }

export function assertIsLoaded<T, TReturnValue>(loadable: LoadableList<T>, cb: (a: T) => TReturnValue){
  if(loadable.status !== 'LOADED')
    throw new Error('Loadable not loaded.')
  return cb(loadable.value)
}

export function map<T, TMapped>(loadable: LoadableList<T>, mapActual: (loadedValue: T) => TMapped){
  if(loadable.status === 'LOADED')
    return {
      status: loadable.status,
      value: mapActual(loadable.value)
    }
  else
    return loadable
}