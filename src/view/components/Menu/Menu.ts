/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Level } from '../../../interfaces/interfaces'
import './menu.css'

class Menu {
  private createMenuLevel(
    level: Level,
    isPassed: boolean,
    isCurrent: boolean
  ): Element {
    const { document } = window
    const levelElement = document.createElement('div')

    levelElement.innerHTML = `
      <span class="checkmark"></span>
      <span class="level-number">${level.number}</span>
      ${level.syntax}
    `
    levelElement.classList.add('level')
    if (isPassed) {
      levelElement.classList.add('completed')
    }
    if (isCurrent) {
      levelElement.classList.add('current')
    }

    return levelElement
  }

  private createLevelsWrapper(
    levels: Level[],
    passedLevelsNumbers: string[],
    currentLevelNumber: string | undefined
  ): Element {
    const { document } = window
    const levelsWrapper = document.createElement('div')

    for (let i = 0; i < levels.length; i += 1) {
      if (
        passedLevelsNumbers.includes(levels[i].number) &&
        levels[i].number === currentLevelNumber
      ) {
        levelsWrapper.append(this.createMenuLevel(levels[i], true, true))
      } else if (passedLevelsNumbers.includes(levels[i].number)) {
        levelsWrapper.append(this.createMenuLevel(levels[i], true, false))
      } else if (levels[i].number === currentLevelNumber) {
        levelsWrapper.append(this.createMenuLevel(levels[i], false, true))
      } else {
        levelsWrapper.append(this.createMenuLevel(levels[i], false, false))
      }
    }
    levelsWrapper.classList.add('levels')

    return levelsWrapper
  }

  private createMenuHeader(): Element {
    const { document } = window
    const appMenuHeader = document.createElement('h2')

    appMenuHeader.textContent = 'Choose a level'
    appMenuHeader.classList.add('app-menu__header')

    return appMenuHeader
  }

  private createResetButton(): Element {
    const { document } = window
    const resetButton = document.createElement('div')

    resetButton.textContent = 'Reset Progress'
    resetButton.classList.add('menu__reset-button')

    return resetButton
  }

  public render(
    levels: Level[],
    passedLevelsNumbers: string[],
    currentLevelNumber: string | undefined
  ): void {
    const { document } = window
    const appMenu: Element | null = document.querySelector(
      '.app-menu'
    ) as Element

    appMenu.innerHTML = ''
    appMenu.append(this.createMenuHeader())
    appMenu.append(
      this.createLevelsWrapper(levels, passedLevelsNumbers, currentLevelNumber)
    )
    appMenu.append(this.createResetButton())
  }

  public toggle(): void {
    const { document } = window
    const burgerMenu: Element | null = document.querySelector(
      '.burger-menu'
    ) as Element
    const appMenu: Element | null = document.querySelector(
      '.app-menu'
    ) as Element

    burgerMenu.classList.toggle('burger-menu_opened')
    appMenu.classList.toggle('app-menu_opened')
  }
}

export default Menu
