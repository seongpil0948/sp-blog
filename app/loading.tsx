import { Spinner } from '@nextui-org/spinner'
import DocumentContainer from './[lang]/doc/_components/server-only/DocumentContainer'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <DocumentContainer lang="en">
      <Spinner label="Loading..." color="primary" labelColor="primary" />
    </DocumentContainer>
  )
}
