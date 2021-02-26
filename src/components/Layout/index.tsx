import React, { PropsWithChildren } from "react"
import Head from "next/head"

import styles from "./Layout.module.scss"
import { Navigation } from "./Navigation"

type LayoutProps = PropsWithChildren<{
  title?: string
}>

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
}: LayoutProps) => {
  const siteTitle = "Othello"

  return (
    <>
      <html lang="ja" />
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="l-page-wrapper">
        <Navigation />
        <div className={`l-content ${styles.container}`}>{children}</div>
      </div>
    </>
  )
}
