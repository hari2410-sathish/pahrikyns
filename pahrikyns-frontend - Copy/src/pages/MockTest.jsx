import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Paper, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useProgress } from '../contexts/ProgressContext'

// This is a demo mock-test with generated simple questions. Replace with real questions from DB.
function makeQuestions(){
  const qs = []
  for(let i=1;i<=5;i++){
    qs.push({ id:i, q:`Sample MCQ ${i}`, choices:['A','B','C','D'], answer: 'A' })
  }
  // For demo we use 5 questions; production uses 50.
  return qs
}

export default function MockTest(){
  const { category, tool } = useParams()
  const nav = useNavigate()
  const { markPassed } = useProgress()
  const courseKey = `${category}:${tool}`

  const [questions] = useState(makeQuestions())
  const [answers, setAnswers] = useState({})

  function setAnswer(qid, val){
    setAnswers(a => ({ ...a, [qid]: val }))
  }

  function submit(){
    // compute score - demo: 1 point per correct (since demo 5 q)
    let score = 0
    questions.forEach(q => { if (answers[q.id] === q.answer) score++ })
    // convert to percentage of 50 scale: score50 = Math.round(score / questions.length * 50)
    const score50 = Math.round(score / questions.length * 50)
    markPassed(courseKey, score50)
    alert(`You scored ${score50} / 50. ${score50 >= 43 ? 'Passed' : 'Failed'}`)
    if (score50 >= 43) nav(-1)
  }

  return (
    <Container sx={{ py:6 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant='h5'>Mock Test - {tool.toUpperCase()}</Typography>
        <Box sx={{ mt:2 }}>
          {questions.map(q => (
            <Box key={q.id} sx={{ mb:2 }}>
              <Typography>{q.id}. {q.q}</Typography>
              <RadioGroup value={answers[q.id] || ''} onChange={(e)=>setAnswer(q.id, e.target.value)}>
                {q.choices.map(c => <FormControlLabel key={c} value={c} control={<Radio />} label={c} />)}
              </RadioGroup>
            </Box>
          ))}
        </Box>

        <Button variant='contained' onClick={submit}>Submit Test</Button>
      </Paper>
    </Container>
  )
}
