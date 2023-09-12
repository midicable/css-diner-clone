import './cssEditorPane.css'

/* eslint-disable class-methods-use-this */
class CSSEditorPane {
  public changeInputFieldState(isStrobe: boolean): void {
    const { document } = window
    const answerInputField: HTMLInputElement | null =
      document.querySelector('.answer-input')

    if (isStrobe) {
      answerInputField?.classList.remove('input-strobe')
    } else {
      answerInputField?.classList.add('input-strobe')
    }
  }

  public changeEnterButtonState(isClicked: boolean): void {
    const { document } = window
    const enterButton: Element | null = document.querySelector('.enter-button')

    if (isClicked) {
      enterButton?.classList.add('enter-button_hit')
    } else {
      enterButton?.classList.remove('enter-button_hit')
    }
  }
}

export default CSSEditorPane
