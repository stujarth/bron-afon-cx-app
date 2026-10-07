const ALT = 'Bron Afon Community Housing';

export function BronAfonLogo({
  className = '',
  variant = 'colour',
}: {
  className?: string;
  variant?: 'colour' | 'white';
}) {
  const src =
    variant === 'white' ? '/brand/bron-afon-logo-white.svg' : '/brand/bron-afon-logo.svg';
  return <img src={src} alt={ALT} width={180} height={48} className={`h-12 w-auto ${className}`} />;
}

export function BronAfonLogoCompact({ className = '' }: { className?: string }) {
  return (
    <img
      src="/brand/bron-afon-logo.svg"
      alt={ALT}
      width={120}
      height={32}
      className={`h-8 w-auto ${className}`}
    />
  );
}
