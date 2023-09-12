/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Level } from '../../../interfaces/interfaces'
import './htmlRenderWindow.css'

class HTMLRenderWindow {
  public render(level: Level): void {
    const { document } = window
    const table: Element | null = document.querySelector('.table') as Element

    table.innerHTML = level.boardMarkup
  }
}
export default HTMLRenderWindow
