import { ReactComponent as Inbox } from "../assets/icons/inbox.svg"
import { ReactComponent as Issues } from "../assets/icons/issues.svg"
import { ReactComponent as Roadmap } from "../assets/icons/roadmap.svg"
import { ReactComponent as Views } from "../assets/icons/views.svg"

export const menuData = [
  {
    title: "Inbox",
    icon: <Inbox />,
    path: "/",
    active: false,
  },
  {
    title: "My Issues",
    icon: <Issues />,
    path: "/",
    active: false,
  },
  {
    title: "Views",
    icon: <Views />,
    path: "/",
    active: false,
  },
  {
    title: "Roadmap",
    icon: <Roadmap />,
    path: "/",
    active: true,
  },
]
