import React from "react";
import { render } from "react-dom";
import { MainComponent } from "./components/Main";

import "./index.sass";
import { loadQuestions } from "./lib/loadQuestions";


const app = document.getElementById('app')

async function main() {
  const questions = await loadQuestions()

  console.log(questions)

  for(let {variants} of questions)
    variants.sort(() => Math.random() > 0.5 ? 1 : -1)

  render(<MainComponent questsions={questions} />, app)
}

main().catch(console.error)