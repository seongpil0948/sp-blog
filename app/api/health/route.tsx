import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value || ''
  const userAgent = headers().get('user-agent') || ''
  const clientIp = headers().get('x-real-ip') || ''
  console.log({ session, userAgent, clientIp })
  return NextResponse.json(
    { cookies: request.cookies, headers: request.headers },
    {
      headers: {
        'set-cookie': 'hello=world',
      },
      status: 200,
    },
  )
}
