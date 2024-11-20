'use client';

import { useState} from 'react'
import BookList from '../components/BookList'
import AddBookModal  from '../components/AddBookModal'
import { Book } from '../lib/types'
import Pagination from '../components/Pagination';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const totalPages = Math.ceil(books.length / booksPerPage);
  const handlePageChange = (page: number) => setCurrentPage(page);

  const paginatedBooks = books.slice(
    (currentPage -1) * booksPerPage,
    currentPage * booksPerPage
  );

  // BookList用のメソッド: 本の削除
  const handleBookDelete = (id: string) => {
    const newBooks = books.filter((b) => b.id !== id);
    setBooks(newBooks);
  };

  // 本の追加メソッド: AddBookModalからの新しい本を追加
  // 本の追加メソッド: 重複をチェックし、重複する場合はownersに追加
  const handleBookAdd = (newBook: Book) => {
    setBooks((prevBooks) => {
      const existingBookIndex = prevBooks.findIndex((book) => book.isbn === newBook.isbn);
  
      if (existingBookIndex !== -1) {
        // 既存の本がある場合
        const updatedBooks = [...prevBooks];
        const existingBook = updatedBooks[existingBookIndex]; //existingBookIndex番目を取得

        // 重複しない場合のみ、所有者IDを追加
        newBook.ownerIds.forEach((ownerId) => {
          if (!existingBook.ownerIds.includes(ownerId)) {
            existingBook.ownerIds.push(ownerId);
          }
        });
  
        return updatedBooks;
      } else {
        // 新規の本を追加
        return [...prevBooks, newBook ]; //prevBooks = [{title: xxx, isbn:...}]
      }
    });
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">図書リスト</h1>
          <AddBookModal onAddBook={handleBookAdd} />
        </header>
        <main>
          <BookList books={paginatedBooks} onDelete={handleBookDelete}/>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  )
}

export default App;