import React from "react"
import Link from "next/link"
import GitHubIcon from "@material-ui/icons/GitHub"

import { pagesPath } from "@path"
import styles from "./Layout.module.scss"

const routes = [
  {
    href: pagesPath.$url(),
    text: "ゲームをプレイする",
  },
]
const outerLinks = [
  {
    href: "https://github.com/FUJITOSHION/Othello",
    text: <GitHubIcon />,
  },
]

export const Navigation: React.FC = () => {
  return (
    <nav role="navigation" className={styles.navigation}>
      <ul className={styles.navList}>
        {routes.map((route) => (
          <li key={route.href.pathname} className={styles.navItem}>
            <Link href={route.href}>
              <a className={styles.link}>{route.text}</a>
            </Link>
          </li>
        ))}

        {outerLinks.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <a href={link.href} className={styles.link}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
