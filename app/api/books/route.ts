import { NextResponse } from 'next/server'
import { Book } from '../../../lib/types'

// 仮のデータストア（実際のアプリケーションではデータベースを使用します）
let books: Book[] = []

export async function GET() {
  return NextResponse.json(books)
}

export async function POST(request: Request) {
  const book: Book = await request.json()
  book.id = Date.now().toString() // 簡易的なID生成
  books.push(book)
  return NextResponse.json(book, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedBook: Book = await request.json()
  books = books.map(book => book.id === updatedBook.id ? updatedBook : book)
  return NextResponse.json(updatedBook)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  books = books.filter(book => book.id !== id)
  return NextResponse.json({ message: 'Book deleted successfully' })
}