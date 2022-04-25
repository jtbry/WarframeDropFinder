function BubbleLabel({ children }: { children: any }) {
  return (
    <span className="inline-block bg-primary-800 text-primary-200 rounded-full px-3 py-1 text-sm font-semibold mr-2">
      {children}
    </span>
  );
}

export default BubbleLabel;
