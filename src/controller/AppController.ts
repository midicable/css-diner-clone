/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import AppStorage from '../appStorage/appStorage'
import CSSEditorPaneController from './components/CSSEditorPaneController'
import MenuController from './components/MenuController'
import SidebarController from './components/SidebarController'

class AppController {
  public cssEditorPaneController: CSSEditorPaneController

  public sidebarController: SidebarController

  public menuController: MenuController

  constructor() {
    this.cssEditorPaneController = new CSSEditorPaneController()
    this.sidebarController = new SidebarController()
    this.menuController = new MenuController()
  }

  public handleCorrectAnswer(appStorage: AppStorage): void {
    appStorage.markCurrentLevelAsPassed()
  }

  public handleIncorrectAnswer(shakeEditor: () => void): void {
    shakeEditor()
  }
}

export default AppController
