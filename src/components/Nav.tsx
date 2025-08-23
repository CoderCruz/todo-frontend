export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black shadow-md">
      {/* 1/5 viewport height */}
      <div className="mx-auto flex h-[20vh] max-w-4xl items-center justify-center">
        {/* Icon-only (your SVG). Add title text if you want, but this matches your Figma centering */}
        <div className="flex items-center justify-center">
          <img
            src="/logo.svg"             // <-- your icon in /public
            alt="Todo App"
            className="h-30 w-70"       // adjust if you want larger
          />
        </div>
      </div>
    </nav>
  );
}

