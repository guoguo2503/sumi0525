export function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
          Sumi (诉秘) — Your artistic digital diary
        </p>
        <p className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-2">
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </div>
    </footer>
  );
}