interface BubbleLabelProps {
  children: React.ReactNode;
}

export default function BubbleLabel({ children }: BubbleLabelProps) {
  return (
    <span className="inline-block bg-primary-800 dark:bg-primary-500 text-primary-200 rounded-full px-3 py-1 text-sm font-semibold mr-2">
      {children}
    </span>
  );
}
