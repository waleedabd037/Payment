export default function Timer({ timeLeft }: any) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="timer">
      Order will be closed in: <b>{minutes}:{seconds}</b>
    </div>
  );
}
