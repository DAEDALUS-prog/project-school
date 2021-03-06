import React, { FC, useState } from "react";
import { IQuest } from "../lib/loadQuestions";

import "./Main.sass";

interface IProps {
  questsions: IQuest[]
}

export const MainComponent: FC<IProps> = ({ questsions }) => {
  const [qIndex, setQIndex] = useState(-1)
  const [select, setSelect] = useState(-1)
  const [message, setMessage] = useState('')
  

  const repeat = () => {
    setQIndex(0)
  }

  if (qIndex == -1) {
    return (
      <div className="main-component">
        <div className="repeat">
          <div className="img-bg"
            style={{ backgroundImage: `url(${'images/start.jpg' || ''})` }} />
          <p>
            <button onClick={repeat}>
              Начать
          </button>
          </p>
        </div>
      </div>
    )
  }
  const nowQuest = questsions[qIndex]

  if (nowQuest) {
    const { text, variants, image } = nowQuest
    const onClick = () => {
      const vari = variants.find(e =>
        e.index == select)

      setMessage('')

      if (!vari) {
        setMessage('Выберите ответ!')
      }

      else if (!vari.success) {
        setMessage('Ответ не верный. Попробуй еще!')
      }

      else if (vari.success) {
        setSelect(-1)
        setQIndex(qIndex + 1)
      }
    }

    const onChange = (t: number) => {
      setMessage('')
      setSelect(t)
    }

    return (
      <div className="main-component">
        <p className="quest">
          <b>{qIndex + 1}) </b>
          {text}
        </p>

        <div className="img-bg"
          style={{ backgroundImage: `url(${image || ''})` }} />

        <p className="variants">
          {variants.map((vari, i) => {
            const { text, index, success } = vari

            return (
              <label key={`r${i}`} onClick={() => onChange(index)}>
                <input checked={index == select} type="checkbox" />
                {text}
              </label>
            )
          })}
        </p>

        <p>
          <button onClick={onClick}>
            Ответить
          </button>
        </p>

        {message && (
          <p className="message">{message}</p>
        )}

      </div>
    )
  }

  return (
    <div className="main-component">
      <div className="repeat">
        <p className="win-message">
          Вы успешно прошли {questsions.length} вопросов. Хотите повторить?
        </p>
          <div className="img-bg"
            style={{ backgroundImage: `url(${'images/end.jpg' || ''})` }} />
        <p>
          <button onClick={repeat}>
            Повторить
          </button>
        </p>
      </div>
    </div>
  )
}