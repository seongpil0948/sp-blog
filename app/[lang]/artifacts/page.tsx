import { AVAIL_LOCALES, TAvailLocale } from '@/config/system'
import styles from './styles.module.css'

export async function generateStaticParams() {
  return AVAIL_LOCALES.map((lang) => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <div className={styles.paperInner}>
          <div className={styles.wrinkle}></div>
        </div>
      </div>
      <div className={styles.flag}></div>
    </div>
  )
}
