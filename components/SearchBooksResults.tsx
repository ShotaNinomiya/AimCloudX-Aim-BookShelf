type SearchResult = { title: string, thumbnail: string, id: string };

interface SearchResultsProps {
  results: SearchResult[];
  onSelectBook: (book: SearchResult) => void;
}

const SearchBooksResults = (props: SearchResultsProps) => {
  return (
    <div className="mb-4 max-h-40 overflow-y-auto rounded-md border">
      {props.results.map((result) => (
        <div key={result.id} className="p-2 border-b cursor-pointer hover:bg-accent" onClick={() => props.onSelectBook(result)}>
          <p className="font-semibold">{result.title}</p>
          {result.thumbnail && (
            <img src={result.thumbnail} alt={`${result.title} thumbnail`} className="w-16 h-24 object-cover mt-2" />
          )}
        </div>
      ))}
    </div>
  )
}

export default SearchBooksResults;