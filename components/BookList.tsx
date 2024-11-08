'use client'

import { Badge, Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { Book } from '../lib/types'

type BookListProps = {
  books: Book[];
  onDelete: (id: string) => void;
}

const BookList = ({ books, onDelete }: BookListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book.id} className="bg-card text-card-foreground">
          <CardHeader title={book.title} className="text-lg font-semibold" />

          {book.thumbnail && (
            <CardMedia
              component='img'
              image={book.thumbnail}
              className='w-ful h-48 object-cover'
            />
          )}
          <CardContent>
            {book.thumbnail && <img src={book.thumbnail} alt={`${book.title}`} className='w-full h-auto mb-2'/>}
            {/* authorsが存在する場合のみ、表示 */}
            <p className="text-sm text-muted-foreground mb-2">
              {book.authors && book.authors.length > 0 ? book.authors.join(', ') : '著者情報なし'}
            </p>
            <p className="text-sm mb-2">ISBN: {book.isbn}</p>
            <div className="flex justify-between items-center">
              <Badge color={book.location === 'shelf' ? 'default' : 'secondary'}>
                {book.location === 'shelf' ? '本棚' : '所有者'}
              </Badge>
              <span className="text-sm text-muted-foreground">所有者ID: {book.ownerId}</span>
              <Button
                variant='contained'
                color='error'
                onClick={() => onDelete(book.id)}
              >
              削除
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BookList;