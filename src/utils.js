export function asset(path) {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\//, '')
  return `${base}${cleanPath}`
}
