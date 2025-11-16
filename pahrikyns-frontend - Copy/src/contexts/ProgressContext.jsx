import React, { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'pahrikyns_progress_v1'
const defaultState = { // sample structure
  completedTests: {}, // { 'devops:github': true }
  scores: {}, // { 'devops:github': 45 }
}

const ProgressContext = createContext(null)

export function useProgress(){ return useContext(ProgressContext) }

export default function ProgressProvider({ children }){
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || defaultState } catch { return defaultState }
  })

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state])

  function markPassed(courseKey, score){
    setState(s => ({
      ...s,
      scores: { ...s.scores, [courseKey]: score },
      completedTests: { ...s.completedTests, [courseKey]: (score >= 43) }
    }))
  }

  function resetProgress(){
    setState(defaultState)
  }

  function isUnlocked(courseKey){
    return !!state.completedTests[courseKey]
  }

  return (
    <ProgressContext.Provider value={{ state, markPassed, resetProgress, isUnlocked }}>
      {children}
    </ProgressContext.Provider>
  )
}
