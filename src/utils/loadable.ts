export type LoadableStatus = 'LOADING' | 'LOADED' | 'ERRO'

export interface Loaded<T> {
  status: 'LOADED',
  value: T
}

export type Loadable<T> = Loaded<T> | { status: 'LOADING' } | { status: 'ERROR' }

export function assertIsLoaded<T, TReturnValue>(loadable: Loadable<T>, cb: (a: T) => TReturnValue){
  if(loadable.status !== 'LOADED')
    throw new Error('Loadable not loaded.')
  return cb(loadable.value)
}

export function map<T, TMapped>(loadable: Loadable<T>, mapActual: (loadedValue: T) => TMapped){
  if(loadable.status === 'LOADED')
    return {
      status: loadable.status,
      value: mapActual(loadable.value)
    }
  else
    return loadable
}