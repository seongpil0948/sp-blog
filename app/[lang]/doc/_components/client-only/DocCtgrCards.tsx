'use client'

import { CardBasic } from '@/app/_components/server-only/cards'
import { NAV_ITEMS_DOC } from '@/config/site'
import { TAvailLocale } from '@/config/system'
import { useRouter } from 'next/navigation'

export default function DocCtgrCards(props: { lang: TAvailLocale }) {
  const router = useRouter()
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {NAV_ITEMS_DOC.map((item) => {
        return (
          <CardBasic
            key={item.href}
            body={item.label}
            cardProps={{
              isPressable: true,
              isHoverable: true,
              isBlurred: true,
              onClick: () => {
                router.push(`/${props.lang}/${item.href}`)
              },
            }}
          />
        )
      })}
    </div>
  )
}
