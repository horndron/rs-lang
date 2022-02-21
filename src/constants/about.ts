export const COLORS = {
  brandedColor1: '#8b0061',
  brandedColor2: '#1b73ba',
  brandedColor3: '#f8d23c',
  brandedColor4: '#ff534d',
  brandedColor5: '#de8a00',
  brandedColor6: '#7478ae',
}

export const ABOUT_TEXT = `Приветствуем Вас в нашем приложении по изучению английского языка. Мы команда молодых и целеустремленных разработчиков. Как и вы мы столкнулись с проблемой изучения иностранного языка. В следствии чего и было создано это приложение. Надеемся что оно поможет Вам, также как и нам, на этом нелегком пути. Ведь в течении 3 недель мы работали над ним не покладая рук. Ниже вы найдете немного информации о нас и о том, какой вклад в этот проект сделал каждый из нас.
`

export const AUTHORS = [
  {
    name: 'Andrey Filippov',
    github: 'horndron',
    link: 'https://github.com/horndron',
    tasks: [
      { task: 'teamlead', color: `${COLORS.brandedColor1}` },
      { task: 'api', color: `${COLORS.brandedColor2}` },
      { task: 'games', color: `${COLORS.brandedColor3}` },
      { task: 'sprint', color: `${COLORS.brandedColor4}` },
      { task: 'statistics', color: `${COLORS.brandedColor5}` },
    ],
  },
  {
    name: 'Batyrkhan Temirov',
    github: 'buterbrot',
    link: 'https://github.com/ButerBrot359',
    tasks: [
      { task: 'navigation', color: `${COLORS.brandedColor5}` },
      { task: 'words list', color: `${COLORS.brandedColor2}` }, // ? words list or dictionary ?
      { task: 'e-book', color: `${COLORS.brandedColor3}` },
      { task: 'audiocall', color: `${COLORS.brandedColor4}` },
    ],
  },
  {
    name: 'Natalia Antonova',
    github: 'nat',
    link: 'https://github.com/nat6',
    tasks: [
      { task: 'authorization', color: `${COLORS.brandedColor5}` },
      { task: 'main page', color: `${COLORS.brandedColor1}` },
      { task: 'about', color: `${COLORS.brandedColor2}` },
      { task: 'design', color: `${COLORS.brandedColor3}` },
    ],
  },
]

// more:
// Прогресс изучения
// Изученные слова
// долгосрочная статистика
// «404»
