export default function BestArticlesLoading() {
  return (
    <div className="flex w-full gap-5 [&&]:max-md:gap-4">
      <div className="h-55 [&&]:max-sm:h-44.5 w-full animate-pulse rounded-xl border border-border-primary bg-background-secondary" />
      <div className="h-55 [&&]:max-sm:h-44.5 w-full animate-pulse rounded-xl border border-border-primary bg-background-secondary [&&]:max-sm:hidden" />
      <div className="h-55 [&&]:max-sm:h-44.5 w-full animate-pulse rounded-xl border border-border-primary bg-background-secondary [&&]:max-md:hidden" />
    </div>
  );
}
