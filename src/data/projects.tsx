import * as dayjs from "dayjs"
// TODO add real uuid

export type Project = {
  title: string
  lead: string
  uuid: number
  startDate: dayjs.Dayjs | string
  endDate: dayjs.Dayjs | string
  order: number
}
export const projects: Project[] = [
  {
    title: "Collect underpants",
    startDate: "2022-06-1",
    endDate: "2022-07-17",
    lead: "Gnome",
    order: 1,
    uuid: 1,
  },
  {
    title: "???",
    startDate: "2022-06-10",
    endDate: "2022-07-26",
    lead: "Gnome",
    order: 2,
    uuid: 2,
  },
  {
    title: "Profit",
    lead: "Gnome",
    startDate: "2022-07-2",
    endDate: "2022-08-17",
    order: 3,
    uuid: 3,
  },
]
