import { useRef, useState } from 'react'
import { FileText, Trash2, UploadCloud } from 'lucide-react'
import type { UploadFile } from '../types'

const MAX_SIZE = 10 * 1024 * 1024
const allowed = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export function FileUpload({ label, value = [], onChange }: { label: string; value?: UploadFile[]; onChange: (files: UploadFile[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const files = Array.from(list)
    const invalid = files.find((file) => file.size > MAX_SIZE || !allowed.includes(file.type))
    if (invalid) {
      setError(`${invalid.name} is unsupported or larger than 10 MB.`)
      return
    }
    setError('')
    const additions = files.map((file) => ({ id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type, progress: 100 }))
    onChange([...value, ...additions])
  }

  return (
    <div className="upload-field">
      <span className="field__label">{label} <small>Optional</small></span>
      <button type="button" className={`dropzone ${dragging ? 'dropzone--active' : ''}`} onClick={() => inputRef.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files) }}>
        <UploadCloud size={24} />
        <span><strong>Drop files here</strong> or browse</span>
        <small>PNG, JPG, SVG, PDF or DOCX · up to 10 MB</small>
      </button>
      <input ref={inputRef} className="sr-only" type="file" multiple accept=".png,.jpg,.jpeg,.svg,.pdf,.docx" onChange={(event) => addFiles(event.target.files)} />
      {error && <p className="field__error" role="alert">{error}</p>}
      {value.length > 0 && <div className="file-list">{value.map((file) => (
        <div className="file-row" key={file.id}>
          <FileText size={18} /><div><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(1)} MB · {file.progress === 100 ? 'Ready in this browser' : 'Preparing…'}</span><i style={{ width: `${file.progress || 45}%` }} /></div>
          <button type="button" aria-label={`Remove ${file.name}`} onClick={() => onChange(value.filter((item) => item.id !== file.id))}><Trash2 size={17} /></button>
        </div>
      ))}</div>}
      <p className="prototype-note">Prototype only: files remain in browser memory and are not transmitted to stackEnd.</p>
    </div>
  )
}
