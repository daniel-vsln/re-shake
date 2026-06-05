import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const s = styles as Record<string, string>

const IMAGES = [
  1, 2, 221, 222, 223, 3, 4, 5, 55, 56, 566, 567, 57, 58, 6, 661, 662, 663, 664, 665, 666, 667, 61,
  7, 8, 9,
]

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
