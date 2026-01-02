export default function Loader({
  className = 'h-4 bg-gray-300 rounded',
}: {
  className?: string
}) {
  return (
    <div
      className={`${className} animate-pulse`}
    ></div>
  )
}
