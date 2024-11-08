'use client';

import { useState} from 'react'
import BookList from '../components/BookList'
import AddBookModal  from '../components/AddBookModal'
import { Book } from '../lib/types'
import Pagination from '../components/Pagination';

export default function Home() {
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
        const existingBook = updatedBooks[existingBookIndex];
        
        // ownerIdが配列であることを確認する
        const ownerIds = Array.isArray(newBook.ownerId) ? newBook.ownerId : [newBook.ownerId]; // 修正: 配列でない場合は配列に変換
  
        // 重複しない場合のみ、所有者IDを追加
        ownerIds.forEach((ownerId) => {
          if (!existingBook.ownerId.includes(ownerId)) {
            existingBook.ownerId.push(ownerId);
          }
        });
  
        return updatedBooks;
      } else {
        // 新規の本を追加
        return [...prevBooks, { ...newBook, owners: Array.isArray(newBook.ownerId) ? newBook.ownerId : [newBook.ownerId] }]; // 修正: 配列に変換
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
