import { Link } from "react-router-dom";

export function ErrorElement() {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-4 items-center">
      <h1 className="text-3xl font-bold">Opa, página não encontrada :/</h1>
      <p>Voltar para a <Link to={'/'} className="text-purple-400 hover:underline hover:underline-offset-2">Home</Link></p>
    </div>
  )
}