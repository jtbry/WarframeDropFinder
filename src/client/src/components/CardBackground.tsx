function CardBackground({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={`bg-primary-200 p-2 rounded-md md:p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default CardBackground;
