import { TAvailLocale } from '@/config/system'

interface DocumentContainerProps {
  children: React.ReactNode
  lang: TAvailLocale
}

export default function DocumentContainer(props: DocumentContainerProps) {
  return <section className="document-container">{props.children}</section>
}
