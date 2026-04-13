export function BronAfonLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 shadow-sm">
        {/* Stylized "BA" with leaf/hill motif */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden="true"
        >
          {/* Welsh hills silhouette */}
          <path
            d="M2 18C4 16 5 14 7 14C9 14 10 16 12 16C14 16 15 13 17 13C19 13 20 15 22 15V20H2V18Z"
            fill="currentColor"
            opacity="0.3"
          />
          {/* Stylized tree/leaf */}
          <path
            d="M12 4C12 4 9 7 9 11C9 13.2091 10.3431 14 12 14C13.6569 14 15 13.2091 15 11C15 7 12 4 12 4Z"
            fill="currentColor"
          />
          <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-sidebar-foreground">
          Bron Afon
        </span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Community Housing
        </span>
      </div>
    </div>
  );
}

export function BronAfonLogoCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 shadow-md ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-white"
        aria-hidden="true"
      >
        <path
          d="M2 18C4 16 5 14 7 14C9 14 10 16 12 16C14 16 15 13 17 13C19 13 20 15 22 15V20H2V18Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M12 4C12 4 9 7 9 11C9 13.2091 10.3431 14 12 14C13.6569 14 15 13.2091 15 11C15 7 12 4 12 4Z"
          fill="currentColor"
        />
        <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
