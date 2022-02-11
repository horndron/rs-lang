import { useState } from 'react'
import NextBtn from '../../assets/svg/angle-right-solid.svg'
import LatestBtn from '../../assets/svg/angles-right-solid.svg'
import { GROUP_COLOR } from '../../constants/cardDataApi'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import './settings.style.scss'

export const WordSettings: React.FC = () => {
  return (
    <>
      <div className="settingsBar">
        <GameSwitcher />
        <PageSwitch />
        <GroupSwitcher />
      </div>
    </>
  )
}

const PageSwitch = () => {
  const { page } = useTypeSelector((state) => state.words)
  const { setWordsPage } = useActions()
  function changePage(type: string) {
    switch (type) {
      case 'prev':
        if (page > 0) setWordsPage(page - 1)
        break
      case 'next':
        if (page < 29) setWordsPage(page + 1)
        break
      case 'first':
        setWordsPage(0)
        break
      case 'last':
        setWordsPage(29)
        break
    }
  }
  return (
    <>
      <div className="switchBtns">
        <button
          className="changePageBtn  latestPage"
          onClick={() => {
            changePage('first')
          }}
        >
          <img src={LatestBtn} alt="" className="reverseBtn changePageImg" />
        </button>
        <button
          className="changePageBtn"
          onClick={() => {
            changePage('prev')
          }}
        >
          <img src={NextBtn} alt="" className="reverseBtn changePageImg" />
        </button>
        <div className="pageSwitcher">{`${page + 1} / 30`}</div>
        <button
          className="changePageBtn"
          onClick={() => {
            changePage('next')
          }}
        >
          <img src={NextBtn} alt="" className="changePageImg" />
        </button>
        <button
          className="changePageBtn latestPage"
          onClick={() => {
            changePage('last')
          }}
        >
          <img src={LatestBtn} alt="" className="changePageImg" />
        </button>
      </div>
    </>
  )
}

const GroupSwitcher = () => {
  const { group } = useTypeSelector((state) => state.words)
  const { setWordsGroup } = useActions()
  const [active, setActive] = useState(false)
  const color = GROUP_COLOR[group].color
  const groupArr = [1, 2, 3, 4, 5, 6]
  return (
    <>
      <div className="groupSwitchWrapper">
        <button
          className="groupSwitchBtn"
          style={color}
          onClick={() => setActive(!active)}
        >
          {group + 1}
        </button>
        <ul className={`listGroups ${active}`}>
          {groupArr.map((el, ind) => (
            <li
              key={`list-${el}-key`}
              className={`listGroupsItem ${
                group === ind ? 'listItemPicked' : ''
              }`}
            >
              <button
                style={GROUP_COLOR[ind].color}
                onClick={() => {
                  setWordsGroup(ind)
                }}
              >
                {el}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const GameSwitcher = () => {
  const { group } = useTypeSelector((state) => state.words)
  return (
    <>
      <button>{group + 1}</button>
    </>
  )
}
