export const RestartButton: React.FC = () => {
  const handleRestartButton = (): void => {
    location.reload()
  }
  return (
    <div>
      <button onClick={handleRestartButton}>restart</button>
    </div>
  )
}
