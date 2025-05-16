export default function getPages(
  currentPage: number,
  pagesLength: number,
  lastPage: number,
) {
  const pages: number[] = [];
  const initialPage =
    currentPage % pagesLength === 0
      ? currentPage - pagesLength + 1
      : currentPage - (currentPage % pagesLength) + 1;

  for (
    let i = initialPage;
    i < initialPage + pagesLength && i <= lastPage;
    i += 1
  ) {
    pages.push(i);
  }

  return pages;
}
