interface CardBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardBackground({
  children,
  className,
}: CardBackgroundProps) {
  return (
    <div
      className={`bg-primary-200 dark:bg-primary-700 p-2 rounded-md md:p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
