import './App.css'

import HomeRoute from './Components/HomeRoute'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    display: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    display: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    display: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    display: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    display: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    display: false,
  },
]

const App = () => <HomeRoute tagsList={tagsList} />

export default App
