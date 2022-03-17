import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GROUP_COLOR } from '../../../constants/cardDataApi'
import { useActions } from '../../../hooks/useActions'
import { GameSwitcher } from '../settings'

interface IHardSettings {
  position: string
  pos: number
}
export const HardWordSettings: React.FC<IHardSettings> = ({
  position,
  pos,
}) => {
  return (
    <>
      <div className="settingsBar" style={{ position: position, bottom: pos }}>
        <GameSwitcher />
        <GroupSwitcherHard />
      </div>
    </>
  )
}

const GroupSwitcherHard = () => {
  const { setWordsGroup, setLevel } = useActions()
  const [active, setActive] = useState(false)
  const color = GROUP_COLOR[6].color
  const groupArr = [1, 2, 3, 4, 5, 6]

  let isAuth = false
  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    isAuth = true
  }
  return (
    <>
      <div className="groupSwitchWrapper">
        <button
          className="groupSwitchBtn"
          style={color}
          onClick={() => setActive(!active)}
        >
          {7}
        </button>
        <ul className={`listGroups ${active}`}>
          {groupArr.map((el, ind) => (
            <li key={`list-${el}-key`} className={`listGroupsItem`}>
              <NavLink to="/textbook" className={'link-in-hardwords'}>
                <button
                  className="to-button"
                  style={GROUP_COLOR[ind].color}
                  onClick={() => {
                    setWordsGroup(ind)
                    setLevel(ind)
                  }}
                >
                  {el}
                </button>
              </NavLink>
            </li>
          ))}
          {isAuth ? (
            <>
              <li className={`listGroupsItem listItemPicked`}>
                <NavLink
                  to="/textbook/hardwords"
                  className="to-button"
                  style={{
                    background: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  7
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  )
}
