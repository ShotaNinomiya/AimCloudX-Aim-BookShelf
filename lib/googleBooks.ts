import axios from 'axios';
import { Book, GoogleBookItem } from './types'; // GoogleBookItemをインポート

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string, searchType: 'title' | 'isbn'): Promise<Book[]> {
  const searchTerm = searchType === 'isbn' ? `isbn:${query}` : `intitle:${query}`;
  
  try {
    const response = await axios.get<{ items: GoogleBookItem[] }>(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`);
    
    if (response.data.items) {
      return response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '',  
        isbn: item.volumeInfo.industryIdentifiers?.find((id) => id.type === 'ISBN_13')?.identifier || 
              item.volumeInfo.industryIdentifiers?.find((id) => id.type === 'ISBN_10')?.identifier || 
              'N/A',
        location: 'shelf', // Default location
        ownerIds: [], // Default ownerId
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
      }));
    } else {
      console.error("No items found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
