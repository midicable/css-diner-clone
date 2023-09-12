/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import AppStorage from '../../appStorage/appStorage'

class MenuController {
  private handleLevelButtonClick(
    levelElement: Element,
    appStorage: AppStorage,
    toggleMenu: () => void
  ): void {
    const { document } = window
    const levelNumberElement: Element | null = levelElement.querySelector(
      '.level-number'
    ) as Element
    const levelNumberJSON: string | null =
      levelNumberElement.textContent as string
    const levelNumber = JSON.stringify(JSON.parse(levelNumberJSON) - 1)

    toggleMenu()
    appStorage.setArbitraryLevel(levelNumber)
    document.dispatchEvent(new Event('renderTrigger'))
  }

  private handleResetButtonClick(
    appStorage: AppStorage,
    toggleMenu: () => void
  ): void {
    const { document } = window

    toggleMenu()
    appStorage.resetGameProgress()
    appStorage.setArbitraryLevel('0')
    document.dispatchEvent(new Event('renderTrigger'))
  }

  public handleMenuClick(
    event: Event,
    appStorage: AppStorage,
    toggleMenu: () => void
  ): void {
    const eventTarget: Element | null = event.target as Element

    if (eventTarget.classList.contains('level')) {
      this.handleLevelButtonClick(eventTarget, appStorage, toggleMenu)
    }
    if (eventTarget.classList.contains('menu__reset-button')) {
      this.handleResetButtonClick(appStorage, toggleMenu)
    }
  }
}

export default MenuController
