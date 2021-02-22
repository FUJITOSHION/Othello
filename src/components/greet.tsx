import React from "react"

interface GreetProps {
  name: string
}

export const Greet: React.FC<GreetProps> = ({ name }: GreetProps) => {
  return <div>Hello! {name}</div>
}
