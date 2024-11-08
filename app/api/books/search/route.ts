import { NextResponse } from 'next/server'
import { searchBooks } from '../../../../lib/googleBooks'
import { SearchParams } from '../../../../lib/types'

export async function POST(request: Request) {
  const searchParams: SearchParams = await request.json()
  try {
    const books = await searchBooks(searchParams.query, searchParams.searchType)
    return NextResponse.json(books)
  } catch (error) {
    console.error('Error searching books:', error)
    return NextResponse.json({ error: 'Failed to search books' }, { status: 500 })
  }
}