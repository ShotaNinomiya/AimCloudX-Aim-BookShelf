//アプリケーション全体で使用する型定義
export interface Book {
    id: string;
    title: string;
    authors: string;
    isbn: string;
    location: 'shelf' | 'owner';
    ownerIds: string[];
    thumbnail: string | null;
  }

  // types.ts

export interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

  
  export interface SearchParams {
    query: string;
    searchType: 'title' | 'isbn';
  }