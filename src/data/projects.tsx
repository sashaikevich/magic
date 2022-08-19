import * as dayjs from "dayjs"
// TODO add real _id
import { ReactComponent as PirateIcon } from "../assets/icons/pirate.svg"


export type Project = {
  _id: number
  title: string
  lead: string
  startDate: dayjs.Dayjs | string
  endDate: dayjs.Dayjs | string
  order: number
  icon?: any // TODO figure out correct type for icon
}

export const projects: Project[] = [
  {
    _id: 1,
    title: "Collect underpants",
    startDate: "2022-06-1",
    endDate: "2022-07-17",
    lead: "Gnome",
    order: 1,
    icon: <PirateIcon />
  },
  {
    _id: 2,
    title: "???",
    startDate: "2022-06-10",
    endDate: "2022-07-26",
    lead: "Gnome",
    order: 2,
    icon: <PirateIcon />
  },
  {
    _id: 3,
    title: "Profit",
    lead: "Gnome",
    startDate: "2022-07-2",
    endDate: "2022-08-17",
    order: 3,
    icon: <PirateIcon />
  },
]
