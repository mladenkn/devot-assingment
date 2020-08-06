import { LoadableList as LoadableModel } from "../loadable";
import { makeStyles, CircularProgress } from "@material-ui/core";
import React, { ReactElement } from "react";
import clsx from 'clsx'
import { CSSProperties } from "@material-ui/core/styles/withStyles";

type Props<T> = {
  className?: string
  notLoadedClassName?: string
  circularProgressStyle?: CSSProperties
  children: (loaded: T) => ReactElement
} & LoadableModel<T>

export function Loadable<TValue>(props: Props<TValue>){
  const styles = useStyles()
  return (
    <div className={clsx(props.className, props.status !== 'LOADED' && styles.notLoaded, props.status !== 'LOADED' && props.notLoadedClassName)}>
      {props.status === 'ERROR' && 'Error'}
      {props.status === 'LOADING' && <CircularProgress style={props.circularProgressStyle} />}
      {props.status === 'LOADED' && props.children(props.value)}
    </div>
  )
}

const useStyles = makeStyles({
  notLoaded: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})