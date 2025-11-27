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
import { useRouter } from "next/router"

export function CardDemoCad() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // validação simples
    if (senha !== confirmSenha) {
      alert("As senhas não coincidem")
      return
    }

    const novoUsuario = {
      email: email,
      senha: senha
    }

    try {
      setLoading(true)

      const response = await fetch("http://localhost:3001/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar")
      }

      alert("Conta criada com sucesso!")

      // Vá para pagina de Login

      router.push('/')


    } catch (error) {
      console.error(error)
      alert("Erro ao cadastrar usuário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm bg-gray-900 border-none shadow-xl/30 z-2">
      <CardHeader>
        <CardTitle className="text-white">Registrar sua conta</CardTitle>
        <CardDescription>
          Insira seu email abaixo para registrar sua conta.
        </CardDescription>
        <CardAction>
          <Link href="cadastro" className="text-white cursor-pointer hover:underline hover:underline-offset-8"></Link>
        </CardAction>
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

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="text-white"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full hover:bg-gray-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </Button>

          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <hr className="w-full" />
        <div className="flex gap-1">
          <span className="text-white">Já tem uma conta?</span>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 transition cursor-pointer hover:underline hover:underline-offset-8"
          >
            Entre
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
