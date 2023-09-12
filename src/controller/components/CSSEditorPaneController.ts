/* eslint-disable class-methods-use-this */
class CSSEditorPaneController {
  private validateUserAnswer(correctAnswer: string | undefined): void {
    const { document } = window
    const answerInputField: HTMLInputElement | null = document.querySelector(
      '.answer-input'
    ) as HTMLInputElement

    const userAnswer: string = answerInputField.value

    answerInputField.value = ''
    answerInputField.dispatchEvent(new Event('input'))

    if (userAnswer === correctAnswer) {
      document.dispatchEvent(new Event('correctAnswer'))
      document.dispatchEvent(new Event('nextLevelTrigger'))
    } else {
      document.dispatchEvent(new Event('incorrectAnswer'))
    }
  }

  public handleInputFieldChange(
    changeInputFieldState: (isChanged: boolean) => void
  ): void {
    const { document } = window
    const answerInputField: HTMLInputElement | null = document.querySelector(
      '.answer-input'
    ) as HTMLInputElement

    if (answerInputField.value) {
      changeInputFieldState(true)
    } else {
      changeInputFieldState(false)
    }
  }

  public handleEnterButtonClick(
    e: KeyboardEvent,
    changeEnterButtonState: (isClicked: boolean) => void,
    correctAnswer: string | undefined
  ): void {
    if (e.code === 'Enter') {
      changeEnterButtonState(true)
      this.validateUserAnswer(correctAnswer)
    }
  }

  public handleEnterButtonRelease(
    e: KeyboardEvent,
    changeEnterButtonState: (isClicked: boolean) => void
  ): void {
    if (e.code === 'Enter') {
      changeEnterButtonState(false)
    }
  }
}

export default CSSEditorPaneController
