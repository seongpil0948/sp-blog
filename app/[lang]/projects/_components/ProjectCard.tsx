'use client'

import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { IProject } from '../types'

import { ProjectTypeIcon, ProjectUsing } from './server-only/icons'
import { useRouter } from 'next/navigation'

export default function ProjectCard(props: { p: IProject }) {
  const { p } = props
  const router = useRouter()
  return (
    <Card
      isBlurred
      className="max-w-[610px] border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
      isPressable={!!p.to}
      isHoverable={!!p.to}
      onPress={() => {
        if (!p.to) return
        router.push(p.to)
      }}
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Project title image"
              className="object-cover"
              height={200}
              shadow="md"
              src={p.titleImg ?? '/image/try-on.png'}
              width="100%"
            />
          </div>

          <div className="col-span-6 flex flex-col md:col-span-8">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{p.title}</h3>
                <p className="text-small text-foreground/80">{p.desc}</p>
                <h1 className="mt-2 text-large font-medium">{}</h1>
              </div>
              <div className="flex justify-end">
                <ProjectTypeIcon projType={p.projType} />
              </div>
              {/* className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2" */}
            </div>

            <div className="flex w-full items-end justify-end">
              <ProjectUsing p={p} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
