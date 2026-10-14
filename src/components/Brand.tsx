import { Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? 'brand--inverse' : ''}`} to="/" aria-label="stackEnd home">
      <span className="brand__mark"><Layers3 size={19} strokeWidth={2.4} /></span>
      <span>stack<span>End</span></span>
    </Link>
  )
}
