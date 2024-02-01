import { Image } from '@nextui-org/image'
import { mdiApple, mdiAndroid, mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { IProject, TProjType } from '../../types'

export function ProjectUsing(props: { p: IProject }) {
  const { p } = props

  return (
    <div className="flex gap-2">
      {p.using.map((icon, i) =>
        p.usingPubIdx?.includes(i) ? (
          <Image
            key={p.title + icon}
            width={30}
            alt={'icon using project'}
            src={icon}
          />
        ) : (
          <Icon key={p.title + icon} path={icon} size={1} />
        ),
      )}
    </div>
  )
}

export function ProjectTypeIcon(p: { projType: TProjType }) {
  return p.projType === 'app' ? (
    <div className="flex min-w-unit-12 justify-around">
      <Icon path={mdiApple} size={1} />
      <Icon path={mdiAndroid} size={1} />
    </div>
  ) : (
    <Icon path={mdiWeb} size={1} />
  )
}
