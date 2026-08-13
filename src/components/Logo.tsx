export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`brand ${inverse ? 'brand--inverse' : ''}`} aria-label="小东鸭">
      <span className="brand__mark" aria-hidden="true">
        <span className="brand__eye" />
        <span className="brand__bill" />
      </span>
      <span>小东鸭</span>
    </div>
  )
}
