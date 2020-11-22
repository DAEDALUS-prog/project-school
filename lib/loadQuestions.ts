export interface IQuest {
  index: number
  text: string
  variants: IQuestVariant[]

  image?: string
}

export interface IQuestVariant {
  index: number
  text: string
  success: boolean
}

export async function loadQuestions() {
  const questions: IQuest[] = []
  const response = await fetch(require('../questions.txt').default)
  const body = await response.text()
  
  let lastQuest: IQuest = null

  for(let line of body.split('\n')) {
    line = line.trim()

    if(!line.length)
      continue

    if(/^(\+|\-)/.test(line) && lastQuest) {
      const {variants} = lastQuest

      variants.push({
        index: variants.length,
        text: line.substr(1),
        success: line[0]=='+'
      })
    }
    else if(line[0] == '!') {
      lastQuest.image = line.substr(1)
    }
    else {
      questions.push(lastQuest = {
        index: questions.length,
        text: line,
        variants: []
      })
    }


  }

  return questions
}