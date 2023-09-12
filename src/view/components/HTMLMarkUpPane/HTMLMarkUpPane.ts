/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './htmlMarkUpPane.css'
import { Level } from '../../../interfaces/interfaces'

class HTMLMarkUpPane {
  private createMarkup(level: Level): Element {
    const { document } = window
    const markUpWrapper: Element = document.createElement('div')
    const tableOpenTag = document.createTextNode('<div class="table">')
    const tableCloseTag = document.createTextNode('</div>')
    const markUpObject = document.createElement('div')

    markUpObject.innerHTML = level.boardMarkup
    markUpWrapper.innerHTML = ''
    markUpWrapper.append(tableOpenTag)
    for (let i = 0; i < markUpObject.children.length; i += 1) {
      if (markUpObject.children[i].children.length) {
        const tags = markUpObject.children[i].outerHTML.trim().split('\n')
        const tagWrapper = document.createElement('div')
        const innerTagWrapper = document.createElement('div')

        tagWrapper.append(document.createTextNode(tags[0]))
        innerTagWrapper.textContent = tags.at(1) as string
        tagWrapper.append(innerTagWrapper)
        tagWrapper.append(document.createTextNode(tags[2]))
        markUpWrapper.append(tagWrapper)
      } else {
        const tagWrapper = document.createElement('div')

        tagWrapper.textContent = markUpObject.children[i].outerHTML
        markUpWrapper.append(tagWrapper)
      }
    }
    markUpWrapper.append(tableCloseTag)

    return markUpWrapper
  }

  public render(level: Level): void {
    const { document } = window
    const htmlView: Element | null = document.querySelector(
      '.html-markup'
    ) as Element
    const levelMarkUp: Element = this.createMarkup(level)

    htmlView.innerHTML = ``
    htmlView.appendChild(levelMarkUp)
  }
}

export default HTMLMarkUpPane
