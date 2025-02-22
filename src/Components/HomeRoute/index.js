import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import './index.css'

class HomeRoute extends Component {
  state = {
    optionsList: [],
    tasksList: [],
    inputText: '',
    selectedOption: 'Health',
    originalList: [],
  }

  componentDidMount() {
    const {tagsList} = this.props
    this.setState({optionsList: tagsList})
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {inputText, selectedOption} = this.state
    const updatedOption = selectedOption.slice(1).toLocaleLowerCase()
    const optionSelected = selectedOption[0] + updatedOption
    const newTask = {
      id: uuidV4(),
      inputText,
      optionSelected,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      originalList: [...prevState.originalList, newTask],
      inputText: '',
    }))
  }

  onInputEvent = event => {
    this.setState({inputText: event.target.value})
  }

  onSelectEvent = event => {
    this.setState({selectedOption: event.target.value})
  }

  onSelectedTag = item => {
    const {originalList} = this.state
    const tag = originalList.filter(
      eachItem => eachItem.optionSelected === item.displayText,
    )
    this.setState(prevState => ({
      optionsList: prevState.optionsList.map(eachItem => {
        if (eachItem.optionId === item.optionId) {
          return {...eachItem, display: !eachItem.display}
        }
        return eachItem
      }),
      displayTag: !prevState.displayTag,
      tasksList: tag,
      selectedOption: item.displayText,
    }))
    if (item.display === true) {
      this.setState({tasksList: originalList})
    }
  }

  render() {
    const {optionsList, inputText, selectedOption, tasksList} = this.state
    return (
      <div className="Background-container">
        <div className="Left-container">
          <h1 className="Left-head">Create a task!</h1>
          <form className="Form-container" onSubmit={this.onSubmitEvent}>
            <label htmlFor="input-text" className="lable-head">
              Task
            </label>
            <input
              type="text"
              className="Input"
              id="input-text"
              placeholder="Enter the task here"
              value={inputText}
              onChange={this.onInputEvent}
            />
            <label htmlFor="input-select" className="lable-head">
              Tags
            </label>
            <select
              id="input-select"
              className="input-dropdown"
              onChange={this.onSelectEvent}
            >
              {optionsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <ul className="Submit-container">
              <button type="submit" className="button-submit">
                Add Task
              </button>
            </ul>
          </form>
        </div>
        <div className="Right-container">
          <h1 className="Right-head">Tags</h1>
          <ul className="Tags-container">
            {optionsList.map(eachItem => (
              <li key={eachItem.optionId}>
                {selectedOption === eachItem.displayText ? (
                  <button
                    type="button"
                    className={
                      eachItem.display
                        ? 'Tags-button tags-background'
                        : 'Tags-button'
                    }
                    onClick={() => this.onSelectedTag(eachItem)}
                  >
                    <p>{eachItem.displayText}</p>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="Tags-button"
                    onClick={() => this.onSelectedTag(eachItem)}
                  >
                    <p>{eachItem.displayText}</p>
                  </button>
                )}
              </li>
            ))}
          </ul>
          <h1 className="Right-head">Tasks</h1>{' '}
          {tasksList.length !== 0 && (
            <ul className="Task-container">
              <p>
                {tasksList.map(eachItem => (
                  <li className="Task-items" key={eachItem.id}>
                    <p className="Task-para">{eachItem.inputText}</p>
                    <button type="button" className="Task-button">
                      <p>{eachItem.optionSelected}</p>
                    </button>
                  </li>
                ))}
              </p>
            </ul>
          )}
          {tasksList.length === 0 && (
            <ul className="Notask-container">
              <p className="Notask-para">No Tasks Added Yet</p>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default HomeRoute
