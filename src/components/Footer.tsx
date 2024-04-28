import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="text-center bg-muted py-1 z-[1] relative">
      <p className="text-primary font-medium text-xs">
        © 2024 -{' '}
        <Link
          to={'https://github.com/lheerme'}
          target="_blank"
          className="underline"
        >
          Guilherme Souza
        </Link>
        . Todos os direitos reservados.
      </p>
    </footer>
  )
}
