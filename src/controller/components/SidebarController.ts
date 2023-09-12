/* eslint-disable class-methods-use-this */

class SidebarController {
  public handleButtonClick(event: Event, toggleAppMenu: () => void): void {
    const { document } = window
    const eventTarget: Element | null = event.target as Element

    if (eventTarget.classList.contains('button-prev')) {
      document.dispatchEvent(new Event('prevLevelTrigger'))
    }
    if (eventTarget.classList.contains('button-next')) {
      document.dispatchEvent(new Event('nextLevelTrigger'))
    }
    if (
      eventTarget.classList.contains('burger-menu-wrapper') ||
      eventTarget.classList.contains('burger-menu')
    ) {
      toggleAppMenu()
    }
  }
}

export default SidebarController
