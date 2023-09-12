/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import CSSEditorPane from './components/CSSEditorPane/CSSEditorPane'
import HTMLMarkUpPane from './components/HTMLMarkUpPane/HTMLMarkUpPane'
import Sidebar from './components/Sidebar/Sidebar'
import Order from './components/Order/Order'
import HTMLRenderWindow from './components/HTMLRenderWindow/HTMLRenderWindow'
import Menu from './components/Menu/Menu'
import AppStorage from '../appStorage/appStorage'
import { AppEnv } from '../interfaces/interfaces'

class AppView {
  public order: Order

  public htmlRenderWindow: HTMLRenderWindow

  public cssEditorPane: CSSEditorPane

  public htmlMarkUpPane: HTMLMarkUpPane

  public sidebar: Sidebar

  public menu: Menu

  constructor() {
    this.order = new Order()
    this.htmlRenderWindow = new HTMLRenderWindow()
    this.cssEditorPane = new CSSEditorPane()
    this.htmlMarkUpPane = new HTMLMarkUpPane()
    this.sidebar = new Sidebar()
    this.menu = new Menu()
  }

  public render(appStorage: AppStorage, appEnv: AppEnv): void {
    const level = appStorage.loadCurrentLevel()
    const appLevels = appStorage.loadAllLevels()
    const passedLevels = appStorage.getPassedLevelsNumbers()

    this.order.render(level)
    this.htmlRenderWindow.render(level)
    this.htmlMarkUpPane.render(level)
    this.sidebar.render(level, appEnv.IS_LEVEL_PASSED)
    this.menu.render(appLevels, passedLevels, appEnv.CURRENT_LEVEL_NUMBER)
  }

  public shakeEditor(): void {
    const { document, setTimeout } = window
    const editor: Element | null = document.querySelector('.editor') as Element

    setTimeout(() => editor.classList.remove('shake'), 1000)
    editor.classList.add('shake')
  }
}

export default AppView
