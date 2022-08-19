import React, {
  createContext,
  SetStateAction,
  useContext,
  useReducer,
} from "react"
import { projects as initialProjects } from "../data/projects"
import { Project } from "../data/projects"

type ProjectActions = {
  type: "CHANGE_PROJECT_START_DATE" | "CHANGE_PROJECT_END_DATE"
  payload: { projID: number; targetDate: string }
}

// type DispatchType = React.Dispatch<React.SetStateAction<typeof initialProjects>>
// type DispatchType = React.Dispatch<React.SetStateAction<ProjectActions>>
type DispatchType = React.Dispatch<ProjectActions>

const reducer = (state: Project[], action: ProjectActions): Project[] => {
  switch (action.type) {
    case "CHANGE_PROJECT_START_DATE":
      return [...state].map(proj => {
        if (proj._id !== action.payload.projID) return proj
        return { ...proj, startDate: action.payload.targetDate }
      })
      case "CHANGE_PROJECT_END_DATE":
      return [...state].map(proj => {
        if (proj._id !== action.payload.projID) return proj
        return { ...proj, endDate: action.payload.targetDate }
      })
  }
  return state
}

const ProjectsState = createContext(initialProjects)
const ProjectsDispatch = createContext<DispatchType>(() => {})

export function useProjectsState() {
  return useContext(ProjectsState)
}

export function useProjectsDispatch() {
  return useContext(ProjectsDispatch)
}

type Props = {
  children: React.ReactNode
}

export const ProjectsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialProjects)

  return (
    <ProjectsState.Provider value={state}>
      <ProjectsDispatch.Provider value={dispatch}>
        {children}
      </ProjectsDispatch.Provider>
    </ProjectsState.Provider>
  )
}
