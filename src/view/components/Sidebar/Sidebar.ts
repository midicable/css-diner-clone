/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Level } from '../../../interfaces/interfaces'
import levels from '../../../levels/data'
import './sidebar.css'

const LEVELS_LENGTH = levels.length

class Sidebar {
  private createExamplesMarkup(examples: string[]): string {
    let examplesMarkup = ''

    for (let i = 0; i < examples.length; i += 1) {
      examplesMarkup += `
        <div class="example">${examples[i]}</div>\n
      `
    }

    return examplesMarkup
  }

  public render(level: Level, isLevelPassed: boolean): void {
    const { document } = window
    const sidebarHeader: Element | null = document.querySelector(
      '.app-sidebar__header'
    ) as Element
    const sidebarSelectorName: Element | null = document.querySelector(
      '.selector-name'
    ) as Element
    const sidebarLevelTitle: Element | null = document.querySelector(
      '.title'
    ) as Element
    const sidebarLevelSyntax: Element | null = document.querySelector(
      '.syntax'
    ) as Element
    const sidebarLevelHint: Element | null = document.querySelector(
      '.hint'
    ) as Element
    const sidebarLevelExamples: Element | null = document.querySelector(
      '.examples'
    ) as Element

    sidebarHeader.innerHTML = `
      <span class="level-text">Level ${level.number} of ${LEVELS_LENGTH}</span>
      <span class="checkmark"></span>
    `
    if (isLevelPassed) {
      sidebarHeader.classList.add('completed')
    } else {
      sidebarHeader.classList.remove('completed')
    }
    sidebarSelectorName.textContent = level.selectorName
    sidebarLevelTitle.textContent = level.helpTitle
    sidebarLevelSyntax.innerHTML = level.syntax
    sidebarLevelHint.innerHTML = level.help
    sidebarLevelExamples.innerHTML = this.createExamplesMarkup(level.examples)
  }
}

export default Sidebar
