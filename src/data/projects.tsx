import dayjs from "dayjs"
// TODO add real _id

import { ReactComponent as PirateIcon } from "../assets/icons/pirate.svg"
const today = dayjs(new Date())

export type Project = {
  _id: number
  title: string
  projLead: string
  startDate: dayjs.Dayjs | string
  endDate: dayjs.Dayjs | string
  order: number
  icon?: any // TODO figure out correct type for icon
}

export const projects: Project[] = [
  {
    _id: 1,
    title: "Collect underpants",
    startDate: today.subtract(72, "day").format("YYYY-MM-DD"),
    endDate: today.subtract(30, "day").format("YYYY-MM-DD"),
    projLead: "Gnome",
    order: 1,
    icon: <PirateIcon />,
  },
  {
    _id: 2,
    title: "???",
    startDate: today.subtract(40, "day").format("YYYY-MM-DD"),
    endDate: today.subtract(15, "day"),
    projLead: "Gnome",
    order: 2,
    icon: <PirateIcon />,
  },
  {
    _id: 3,
    title: "Profit",
    projLead: "Gnome",
    startDate: today.subtract(20, "day").format("YYYY-MM-DD"),
    endDate: today.add(18, "day"),
    order: 3,
    icon: <PirateIcon />,
  },
  {
    _id: 4,
    title: "something",
    projLead: "Gnome",
    startDate: today.subtract(60, "day").format("YYYY-MM-DD"),
    endDate: "2022-08-2",
    order: 4,
    icon: <PirateIcon />,
  },
  {
    _id: 5,
    title: "something",
    projLead: "Gnome",
    startDate: "2022-08-01",
    endDate: "2022-08-31",
    order: 5,
    icon: <PirateIcon />,
  },
  {
    _id: 6,
    title: "something",
    projLead: "Gnome",
    startDate: "2022-09-12",
    endDate: "2022-10-24",
    order: 6,
    icon: <PirateIcon />,
  },
  // {
  //   _id: 7,
  //   title: "something",
  //   projLead: "Gnome",
  //   startDate: "2021-10-4",
  //   endDate: "2022-10-24",
  //   order: 7,
  //   icon: <PirateIcon />,
  // },
]
