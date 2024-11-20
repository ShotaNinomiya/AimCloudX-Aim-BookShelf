'use client';

import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Book } from '../lib/types';
import { PlusCircle, Search } from 'lucide-react';
import SearchBooksResults from './SearchBooksResults';
import BookForm from './BookForm';

const AddBookModal = ({ onAddBook }: { onAddBook: (book: Book) => void }) => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<Partial<Book>>({
    title: '',
    isbn: '',
    location: 'shelf',
    ownerIds: [],
  });
  const [searchResults, setSearchResults] = useState<{ title: string; thumbnail: string; id: string }[]>([]);

  const handleSearch = async () => {
    if (!book.title && !book.isbn) {
      alert('タイトルまたはISBNを入力してください。');
      return;
    }

    try {
      const query = book.title || book.isbn;
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();

      const results = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching book data:', error);
      alert('本の検索中にエラーが発生しました。');
    }
  };

  const handleSelectBook = (selectedBook: { title: string; thumbnail: string; id: string }) => {
    setBook({
      title: selectedBook.title,
      isbn: book.isbn,
      location: book.location,
      ownerIds: book.ownerIds,
      id: selectedBook.id,
      thumbnail: selectedBook.thumbnail
    });
    setSearchResults([]);
  };



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (book.title || book.isbn) {
    onAddBook({...book} as Book); //本を実際に追加
    setOpen(false);
    setBook({ title: '', isbn: '', location: 'shelf', ownerIds: [] }); //編集するための本の情報を初期化
    setSearchResults([]);
  } else {
    alert('タイトルまたはISBNを入力してください。');
  }
};

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        本を追加
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>本を追加</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <BookForm book={book} onChange={(updatedBook) => setBook(updatedBook)} />
            <Button type="button" onClick={handleSearch} variant="contained" className="w-full mb-4">
              <Search className="mr-2 h-4 w-4" />
              検索
            </Button>
            {searchResults.length > 0 && (
              <SearchBooksResults results={searchResults} onSelectBook={handleSelectBook} />
            )}
            <DialogActions>
              <Button type="submit">追加</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBookModal; 
