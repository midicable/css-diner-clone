interface Level {
  number: string
  helpTitle: string
  selectorName: string
  doThis: string
  selector: string
  syntax: string
  help: string
  examples: string[]
  boardMarkup: string
  passed: boolean
}

interface AppEnv {
  CURRENT_LEVEL_NUMBER: string | undefined
  LEVEL_CORRECT_ANSWER: string | undefined
  IS_LEVEL_PASSED: boolean
}

export { Level, AppEnv }
