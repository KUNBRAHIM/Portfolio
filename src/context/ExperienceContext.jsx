import { createContext, useContext, useState, useEffect } from "react"

const ExperienceContext = createContext(null)

export const ExperienceProvider = ({ children }) => {
  const [expCards, setExpCards] = useState([])
  const [abilities, setAbilities] = useState([])

  useEffect(() => {
    fetch("/data/experience.json")
      .then((res) => res.json())
      .then((data) => {
        setExpCards(data.expCards || [])
        setAbilities(data.abilities || [])
      })
      .catch(() => {
        setExpCards([])
        setAbilities([])
      })
  }, [])

  return (
    <ExperienceContext.Provider value={{ expCards, abilities }}>
      {children}
    </ExperienceContext.Provider>
  )
}

export const useExperience = () => {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error("useExperience must be used within an ExperienceProvider")
  return ctx
}
