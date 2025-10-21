export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page not found</p>
      <a
        href="/"
        className="text-blue-600 hover:text-blue-800 underline transition"
      >
        Go back home
      </a>
    </div>
  );
}