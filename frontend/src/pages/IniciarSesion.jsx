import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { useToast } from "@/components/ui/use-toast"

export default function IniciarSesion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  // const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aquí iría la lógica de autenticación real
      // Por ahora simulamos un inicio de sesión exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // toast({
      //   title: "Inicio de sesión exitoso",
      //   description: "Redirigiendo al dashboard...",
      // })

      navigate("/dashboard")
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
      // toast({
      //   title: "Error al iniciar sesión",
      //   description: "Por favor verifica tus credenciales e intenta nuevamente.",
      //   variant: "destructive",
      // })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-black bg-opacity-80 backdrop-blur-sm text-white items-center justify-center p-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">← Volver</Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>
        <Card className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-xl shadow-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-300">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-gray-800 bg-opacity-50 placeholder-gray-500 text-white border-gray-600 focus:border-pink-500 focus:ring-pink-500 focus:ring focus:ring-opacity-40"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
                    <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="bg-gray-800 bg-opacity-50 placeholder-gray-500 text-white border-gray-600 focus:border-pink-500 focus:ring-pink-500 focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 shadow-md hover:shadow-pink-500/50 transition-transform"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
              <p className="mt-4 text-center text-sm text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link to="/registrarse" className="underline underline-offset-4 hover:text-pink-400">
                  Regístrate
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
