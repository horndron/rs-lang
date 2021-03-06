import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GameCard } from '../../components/gamecard/GameCard'
import MUISelect from '../../components/UI/MUISelect/MUISelect'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { SelectItemProps } from '../../interfaces/sprint'
import './games.styles.sass'

const CATEGORIES_FOR_SELECT: SelectItemProps[] = [
  { value: 0, name: 1 },
  { value: 1, name: 2 },
  { value: 2, name: 3 },
  { value: 3, name: 4 },
  { value: 4, name: 5 },
  { value: 5, name: 6 },
]

export const Games: FC = () => {
  const { level } = useTypeSelector((state) => state.words)
  const { setLevel, SetFromTextbook } = useActions()
  const dispatch = useDispatch()
  const getSelectValue = (value: number): void => {
    dispatch(setLevel(value))
  }
  useEffect(() => {
    SetFromTextbook(false)
  }, [])
  return (
    <div className="games-page">
      <div className="games">
        <h1>Выберите игру</h1>
        <div className="games__container">
          <GameCard title="Аудиовызов" classname="audiocall" url="audiocall">
            <p>
              «Аудиовызов» - это тренировка, которая улучшает восприятие речи на
              слух.
            </p>
            <ul>
              <li>Используйте мышь, чтобы выбрать.</li>
              <li>Используйте цифровые клавиши от 1 до 4 для выбора ответа</li>
              <li>Используйте пробел для повтроного звучания слова</li>
              <li>
                Используйте клавишу Enter для подсказки или для перехода к
                следующему слову
              </li>
            </ul>
          </GameCard>
          <GameCard title="Спринт" classname="sprint" url="sprint">
            <p>
              «Спринт» - это тренировка для повторения заученных слов из вашего
              словаря.
            </p>
            <ul>
              <li>Используйте мышь, чтобы выбрать.</li>
              <li>Используйте клавиши влево или вправо</li>
            </ul>
          </GameCard>
        </div>
        <div className="games__category">
          <MUISelect
            getSelectValue={getSelectValue}
            title="Сложность"
            id="games-category"
            startValue={level}
            value={level}
            items={CATEGORIES_FOR_SELECT}
          />
        </div>
      </div>
    </div>
  )
}
