'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function CardDemoLogin() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch("http://localhost:3001/usuario")
      const usuarios = await response.json()

      // Verificar se existe usuário com esse email e senha
      const usuarioEncontrado = usuarios.find(
        (user: any) => user.email === email && user.senha === senha
      )

      if (usuarioEncontrado) {
        alert(`Usuário entrou com sucesso! ✅\nBem-vindo: ${usuarioEncontrado.email}`)
      } else {
        alert("Email ou senha inválidos ❌")
      }

    } catch (error) {
      console.error(error)
      alert("Erro ao tentar fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm bg-gray-900 border-none shadow-xl/30 z-2">
      <CardHeader>
        <CardTitle className="text-white">Entrar na sua conta</CardTitle>
        <CardDescription>
          Insira seu email abaixo para entrar na sua conta.
        </CardDescription>
        <CardAction />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                className="text-white"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full hover:bg-gray-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
            </Button>

          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full hover:bg-gray-600 hover:text-white border-none cursor-pointer"
        >
          Login com Google
        </Button>

        <hr className="bg-white w-full" />

        <div className="flex gap-1">
          <span className="text-white">Não tem uma conta?</span>
          <Link
            href="cadastro"
            className="text-blue-500 hover:text-blue-600 transition cursor-pointer hover:underline hover:underline-offset-8"
          >
            Cadastre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
