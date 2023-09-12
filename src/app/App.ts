/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppController from '../controller/AppController'
import AppView from '../view/AppView'
import AppStorage from '../appStorage/appStorage'
import { AppEnv } from '../interfaces/interfaces'

class App {
  private appController: AppController

  private appView: AppView

  private appStorage: AppStorage

  private env: AppEnv

  constructor() {
    this.appController = new AppController()
    this.appView = new AppView()
    this.appStorage = new AppStorage()
    this.env = {
      CURRENT_LEVEL_NUMBER: undefined,
      LEVEL_CORRECT_ANSWER: undefined,
      IS_LEVEL_PASSED: false,
    }
  }

  private setAppEnv(): void {
    const level = this.appStorage.loadCurrentLevel()
    const passedLevels = this.appStorage.getPassedLevelsNumbers()

    this.env.CURRENT_LEVEL_NUMBER = level.number
    this.env.LEVEL_CORRECT_ANSWER = level.selector
    this.env.IS_LEVEL_PASSED = passedLevels.includes(level.number)
  }

  public start(): void {
    const { document } = window
    const { cssEditorPaneController, sidebarController, menuController } =
      this.appController
    const { cssEditorPane, menu } = this.appView

    const appAnswerInputField: HTMLInputElement | null = document.querySelector(
      '.answer-input'
    ) as HTMLInputElement
    const appSidebar: Element | null = document.querySelector(
      '.app-sidebar'
    ) as Element
    const appMenu: Element | null = document.querySelector(
      '.app-menu'
    ) as Element

    appAnswerInputField.addEventListener('input', () => {
      cssEditorPaneController.handleInputFieldChange(
        cssEditorPane.changeInputFieldState
      )
    })
    appSidebar.addEventListener('click', (event) => {
      sidebarController.handleButtonClick(event, menu.toggle)
    })
    appMenu.addEventListener('click', (event) => {
      menuController.handleMenuClick(event, this.appStorage, menu.toggle)
    })

    document.addEventListener('correctAnswer', () => {
      this.appController.handleCorrectAnswer(this.appStorage)
    })
    document.addEventListener('incorrectAnswer', () => {
      this.appController.handleIncorrectAnswer(this.appView.shakeEditor)
    })

    document.addEventListener('renderTrigger', () => {
      this.setAppEnv()
      this.appView.render(this.appStorage, this.env)
    })
    document.addEventListener('nextLevelTrigger', () => {
      this.appStorage.setNextLevel()
      this.setAppEnv()
      this.appView.render(this.appStorage, this.env)
    })
    document.addEventListener('prevLevelTrigger', () => {
      this.appStorage.setPrevLevel()
      this.setAppEnv()
      this.appView.render(this.appStorage, this.env)
    })

    document.addEventListener('keydown', (event) => {
      cssEditorPaneController.handleEnterButtonClick(
        event,
        cssEditorPane.changeEnterButtonState,
        this.env.LEVEL_CORRECT_ANSWER
      )
    })
    document.addEventListener('keyup', (event) => {
      cssEditorPaneController.handleEnterButtonRelease(
        event,
        cssEditorPane.changeEnterButtonState
      )
    })

    this.setAppEnv()
    this.appView.render(this.appStorage, this.env)
  }
}

export default App
