type Props = {
  index: string
  eyebrow: string
  title: string
  copy?: string
}

export function SectionTitle({ index, eyebrow, title, copy }: Props) {
  return (
    <header className="section-title">
      <div className="section-title__meta"><span>{index}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  )
}
