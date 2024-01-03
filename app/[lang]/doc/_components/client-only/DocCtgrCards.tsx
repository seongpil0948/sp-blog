'use client'

import { TreeSectionProps } from '@/app/_components/client-only/tree-section'
import { CardBasic } from '@/app/_components/server-only/cards'
import { TAvailLocale } from '@/config/system'
import { useRouter } from 'next/navigation'

export default function DocCtgrCards(props: {
  links: TreeSectionProps[]
  lang: TAvailLocale
}) {
  const router = useRouter()
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {props.links.map((item) => {
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
