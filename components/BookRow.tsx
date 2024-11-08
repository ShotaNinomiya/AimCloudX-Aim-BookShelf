import React from 'react';
import { Book } from '../lib/types';

type BookRowProps = {
  book: Book;
  onDelete: (id: string) => void;
}

const BookRow = (props: BookRowProps) => {
  const { title, authors } = props.book;
  const joinedAuthors = authors.join(",");

  const handleDeleteClick = () => {
    props.onDelete(props.book.id);
  }

  return (
    <div className="book-row">
      <div title={title} className="title">
        {title}
      </div>
      <div title={joinedAuthors} className="authors">
        {authors}
      </div>
      <div className="delete-row" onClick={handleDeleteClick}>
        削除
      </div>
    </div>
  )
}

export default BookRow;