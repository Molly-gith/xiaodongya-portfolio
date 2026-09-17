import { useEffect, useRef, useState } from 'react'
import { Image, type ImageProps } from 'antd'
import manifest from './image-manifest.json'
import './portfolio-loading.css'

type ImageVariant = '480' | '960' | '1440' | 'full'
type ImageInfo = { width: number; height: number; variants: Record<ImageVariant, string> }
const images: Record<string, ImageInfo> = manifest
const imageInfo = (src: string) => images[src.split('assets/')[1]]
const url = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

export function thumbnail(src: string, variant: ImageVariant = '480') {
  const info = imageInfo(src)
  return info ? url(info.variants[variant]) : src
}

/** Mount the preview component only near the viewport: its internal validator otherwise preloads every image. */
export function PortfolioImage({ src = '', alt, preview, variant = '960' }: Pick<ImageProps, 'src' | 'alt' | 'preview' | 'width' | 'loading'> & { variant?: ImageVariant }) {
  const container = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const info = imageInfo(src)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setReady(true); return }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setReady(true); observer.disconnect() }
    }, { rootMargin: '480px 0px' })
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  const imageSrc = thumbnail(src, variant)
  return <div ref={container} className={`portfolio-image${loaded ? ' is-loaded' : ''}${failed ? ' has-error' : ''}`} style={{ aspectRatio: info ? `${info.width} / ${info.height}` : undefined }}>
    {!loaded && !failed && <div className="portfolio-image-placeholder" role="status" aria-label={`${alt ?? '图片'}正在加载`}><span>图片加载中</span></div>}
    {failed ? <button className="portfolio-image-retry" onClick={() => { setFailed(false); setLoaded(false); setAttempt(value => value + 1) }}>图片暂未加载，点击重试</button> : ready && <Image
      key={attempt}
      src={imageSrc}
      alt={alt}
      width="100%"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      preview={preview === false ? false : { ...(typeof preview === 'object' ? preview : {}), src: thumbnail(src, 'full') }}
    />}
  </div>
}
