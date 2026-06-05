import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const s = styles as Record<string, string>

const IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Home() {
  return (
    <main className={s.root}>
      {IMAGES.map((n) => (
        <Image
          key={n}
          src={`/${n}.jpg`}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          priority={n <= 2}
          className={s.img}
        />
      ))}

      <Link href="/library" className={s.cta}>
        re:shake
      </Link>
    </main>
  )
}
