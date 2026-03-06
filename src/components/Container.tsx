export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-5xl mx-auto px-6 sm:px-12 ${className}`}>
      {children}
    </div>
  );
}
