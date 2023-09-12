/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import { Level } from '../interfaces/interfaces'
import levels from '../levels/data'

const LEVELS_LENGTH = levels.length

class AppStorage {
  private getCurrentLevelNumber(): string {
    const { localStorage } = window
    const currentLevelNumber: string | null =
      localStorage.getItem('currentLevel')

    if (!currentLevelNumber) {
      localStorage.setItem('currentLevel', JSON.stringify(0))
      return JSON.stringify(0)
    }
    return currentLevelNumber
  }

  private normalizeLevelNumber(nonNormalizedNumber: string): string {
    return JSON.stringify(Number.parseInt(nonNormalizedNumber, 10) + 1)
  }

  public loadCurrentLevel(): Level {
    const currentLevelNumberJSON: string = this.getCurrentLevelNumber()
    const currentLevelNumber: number = JSON.parse(currentLevelNumberJSON)

    return levels[currentLevelNumber]
  }

  public loadAllLevels(): Level[] {
    return levels
  }

  public getPassedLevelsNumbers(): string[] {
    const { localStorage } = window
    const passedLevelsJSON: string | null = localStorage.getItem('passedLevels')

    if (!passedLevelsJSON) {
      return []
    }
    return JSON.parse(passedLevelsJSON)
  }

  public setArbitraryLevel(levelNumber: string): void {
    const { localStorage } = window

    localStorage.setItem('currentLevel', levelNumber)
  }

  public setNextLevel(): void {
    const { localStorage } = window
    const currentLevelNumber: number | null = Number.parseInt(
      localStorage.getItem('currentLevel') as string,
      10
    )

    if (currentLevelNumber !== LEVELS_LENGTH - 1) {
      const nextLevelNumber = currentLevelNumber + 1
      localStorage.setItem('currentLevel', JSON.stringify(nextLevelNumber))
    }
  }

  public setPrevLevel(): void {
    const { localStorage } = window
    const currentLevelNumber: number | null = Number.parseInt(
      localStorage.getItem('currentLevel') as string,
      10
    )

    if (currentLevelNumber !== 0) {
      const prevLevelNumber = currentLevelNumber - 1
      localStorage.setItem('currentLevel', JSON.stringify(prevLevelNumber))
    }
  }

  public markCurrentLevelAsPassed(): void {
    const { localStorage } = window
    const currentLevelNumber: string | null = this.getCurrentLevelNumber()
    const passedLevelsJSON: string | null = localStorage.getItem('passedLevels')

    if (!passedLevelsJSON) {
      localStorage.setItem(
        'passedLevels',
        JSON.stringify([this.normalizeLevelNumber(currentLevelNumber)])
      )
    } else {
      const passedLevels: string[] = JSON.parse(passedLevelsJSON)

      if (!passedLevels.includes(this.normalizeLevelNumber(currentLevelNumber)))
        passedLevels.push(this.normalizeLevelNumber(currentLevelNumber))
      localStorage.setItem('passedLevels', JSON.stringify(passedLevels))
    }
  }

  public resetGameProgress(): void {
    const { localStorage } = window

    localStorage.removeItem('passedLevels')
  }
}

export default AppStorage
