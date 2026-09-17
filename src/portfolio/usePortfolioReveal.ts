import { useEffect } from 'react'

export function usePortfolioReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return
    const observed = Array.from(document.querySelectorAll<HTMLElement>('.hh-section, .hh-cta'))
      .filter(element => element.getBoundingClientRect().top >= window.innerHeight)
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!preference.matches) entry.target.classList.add('portfolio-reveal')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
    observed.forEach(element => observer.observe(element))
    return () => { observer.disconnect(); observed.forEach(element => element.classList.remove('portfolio-reveal')) }
  }, [])
}
