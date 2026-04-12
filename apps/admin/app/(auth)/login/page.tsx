export default function AdminLoginPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white">
            H
          </div>
          <h1 className="text-2xl font-bold text-foreground">Hafan Admin</h1>
          <p className="mt-1 text-muted-foreground">Housing management portal</p>
        </div>

        <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700">
          <svg className="h-5 w-5" viewBox="0 0 21 21" fill="currentColor" aria-hidden="true">
            <path d="M0 0h10v10H0zM11 0h10v10H11zM0 11h10v10H0zM11 11h10v10H11z" />
          </svg>
          Sign in with Microsoft
        </button>
      </div>
    </main>
  );
}
