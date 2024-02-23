import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const j: SearchRequest = await request.json()
  // extract query from request
  const searchParams = request.nextUrl.searchParams
  const word = searchParams.get('word') || ''
  const results = await search(word)
  return NextResponse.json<SearchResponse>(
    { results },
    {
      status: 200,
    },
  )
}

async function search(word: string): Promise<ResultInfo[]> {
  console.log('searching for', word)
  return [
    { title: 'Hello', url: 'https://example.com1' },
    { title: 'World', url: 'https://example.com2' },
  ]
}

export interface SearchResponse {
  results: ResultInfo[]
}

export interface ResultInfo {
  title: string
  url: string
}
