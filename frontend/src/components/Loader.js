export default function Loader() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="relative flex items-center justify-center h-40 w-40 scale-150">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span>
          <i>Loading...</i>
        </span>
      </span>
    </div>
  );
}
