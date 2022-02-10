import React, { FC } from 'react'
import { GameCardProps } from '../../interfaces/sprint'
import MUIButton from '../UI/MUIButton/MUIButton'

export const GameCard: FC<GameCardProps> = ({
  title,
  classname,
  url,
  children,
}) => {
  return (
    <div className={'game-card games__' + classname}>
      <h2>{title}</h2>
      <div className="description">{children}</div>
      <MUIButton name="Начать" link={'#/games/' + url} />
    </div>
  )
}
