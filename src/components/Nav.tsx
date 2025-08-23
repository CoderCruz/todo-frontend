export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black shadow-md">
      <div className="mx-auto flex h-[20vh] max-w-4xl items-center justify-center">
        <div className="flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Todo App"
            className="h-30 w-70"
          />
        </div>
      </div>
    </nav>
  );
}

