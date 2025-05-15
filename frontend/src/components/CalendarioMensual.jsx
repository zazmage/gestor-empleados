import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, Users, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TurnoForm } from "./TurnoForm"


// Datos de ejemplo para los horarios
const initialSchedules = {
  "2025-05-01": {
    id: "1",
    start: "09:00",
    end: "17:00",
    title: "Turno mañana",
    type: "morning",
    employees: ["Ana García", "Carlos López"],
  },
  "2025-05-05": {
    id: "2",
    start: "08:00",
    end: "16:00",
    title: "Turno mañana",
    type: "morning",
    employees: ["María Rodríguez"],
  },
  "2025-05-10": {
    id: "3",
    start: "14:00",
    end: "22:00",
    title: "Turno tarde",
    type: "afternoon",
    employees: ["Juan Pérez", "Laura Martínez"],
  },
  "2025-05-15": {
    id: "4",
    start: "09:00",
    end: "17:00",
    title: "Turno mañana",
    type: "morning",
    employees: ["Pedro Sánchez", "Sofía Fernández"],
  },
  "2025-05-20": {
    id: "5",
    start: "22:00",
    end: "06:00",
    title: "Turno noche",
    type: "night",
    employees: ["Diego Morales"],
  },
  "2025-05-25": {
    id: "6",
    start: "14:00",
    end: "22:00",
    title: "Turno tarde",
    type: "afternoon",
    employees: ["Elena Torres", "Pablo Ruiz"],
  },
}



export function CalendarioMensual({ month }) {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isAddingTurno, setIsAddingTurno] = useState(false)
  const [isEditingTurno, setIsEditingTurno] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  // const { toast } = useToast()

  // Obtener el primer día del mes
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)

  // Obtener el último día del mes
  const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)

  // Obtener el día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
  const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Número total de días en el mes
  const daysInMonth = lastDayOfMonth.getDate()

  // Crear un array con los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Nombres de los días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  // Formatear fecha para buscar en el objeto de horarios
  const formatDateKey = (day) => {
    return `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  // Verificar si un día tiene horarios
  const hasSchedule = (day) => {
    const dateKey = formatDateKey(day)
    return schedules[dateKey] !== undefined
  }

  // Obtener horario para un día específico
  const getScheduleForDay = (day) => {
    const dateKey = formatDateKey(day)
    return schedules[dateKey] || null
  }

  // Obtener color según el tipo de turno
  const getScheduleColor = (type) => {
    switch (type) {
      case "morning":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-300 dark:border-pink-800"
      case "afternoon":
        return "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-300 dark:border-violet-800"
      case "night":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Manejar clic en un día
  const handleDayClick = (day) => {
    const dateKey = formatDateKey(day)
    setSelectedDate(dateKey)
    setDialogOpen(true)
  }

  // Verificar si es el día actual
  const isToday = (day) => {
    const today = new Date()
    return (
      today.getDate() === day && today.getMonth() === month.getMonth() && today.getFullYear() === month.getFullYear()
    )
  }

  // Añadir o actualizar un turno
  const handleSaveTurno = (turno) => {
    if (!selectedDate) return

    const newTurno = {
      ...turno,
      id: schedules[selectedDate]?.id || Date.now().toString(),
    }

    setSchedules((prev) => ({
      ...prev,
      [selectedDate]: newTurno,
    }))

    // toast({
    //   title: isEditingTurno ? "Turno actualizado" : "Turno añadido",
    //   description: `Se ha ${isEditingTurno ? "actualizado" : "añadido"} el turno para el día ${new Date(
    //     selectedDate,
    //   ).getDate()} de ${month.toLocaleDateString("es-ES", { month: "long" })}.`,
    // })

    setIsAddingTurno(false)
    setIsEditingTurno(false)
  }

  // Eliminar un turno
  const handleDeleteTurno = () => {
    if (!selectedDate) return

    setSchedules((prev) => {
      const newSchedules = { ...prev }
      delete newSchedules[selectedDate]
      return newSchedules
    })

    // toast({
    //   title: "Turno eliminado",
    //   description: `Se ha eliminado el turno para el día ${new Date(selectedDate).getDate()} de ${month.toLocaleDateString(
    //     "es-ES",
    //     { month: "long" },
    //   )}.`,
    // })

    setIsDeleteDialogOpen(false)
    setDialogOpen(false)
  }

  // Formatear fecha para mostrar
  const formatDisplayDate = (dateKey) => {
    const date = new Date(dateKey)
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="w-full">
      {/* Cabecera con los días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-medium py-2 text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-2">
        {/* Espacios vacíos para ajustar el primer día del mes */}
        {Array.from({ length: adjustedFirstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square p-1"></div>
        ))}

        {/* Días del mes */}
        {days.map((day) => {
          const dateKey = formatDateKey(day)
          const schedule = getScheduleForDay(day)
          const hasScheduleForDay = schedule !== null
          const today = isToday(day)

          return (
            <div
              key={day}
              className={cn(
                "aspect-square border rounded-md p-1 cursor-pointer transition-all hover:shadow-md",
                today ? "border-pink-500 dark:border-pink-400 ring-2 ring-pink-200 dark:ring-pink-900" : "border-muted",
                hasScheduleForDay
                  ? "bg-gradient-to-br from-pink-50/50 to-violet-50/50 dark:from-pink-950/20 dark:to-violet-950/20"
                  : "hover:bg-muted/50",
              )}
              onClick={() => handleDayClick(day)}
            >
              <div className="h-full flex flex-col">
                <div className={cn("text-right font-medium", today ? "text-pink-600 dark:text-pink-400" : "")}>
                  {day}
                </div>
                {hasScheduleForDay && schedule && (
                  <div className="flex-1 flex flex-col items-center justify-end gap-1 mt-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs w-full justify-center truncate px-1", getScheduleColor(schedule.type))}
                    >
                      {schedule.title}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Diálogo para ver/editar/añadir turno */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedDate && formatDisplayDate(selectedDate)}</DialogTitle>
          </DialogHeader>

          {selectedDate && (
            <>
              {isAddingTurno || isEditingTurno ? (
                <TurnoForm
                  initialData={isEditingTurno ? schedules[selectedDate] : undefined}
                  onSave={handleSaveTurno}
                  onCancel={() => {
                    setIsAddingTurno(false)
                    setIsEditingTurno(false)
                  }}
                />
              ) : (
                <div className="space-y-4 mt-4">
                  {schedules[selectedDate] ? (
                    <div>
                      <div
                        className={cn(
                          "border rounded-md p-4 transition-all hover:shadow-md",
                          getScheduleColor(schedules[selectedDate].type),
                        )}
                      >
                        <div className="font-medium text-lg">{schedules[selectedDate].title}</div>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {schedules[selectedDate].start} - {schedules[selectedDate].end}
                          </span>
                        </div>
                        {schedules[selectedDate].employees && schedules[selectedDate].employees.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-t-muted/30">
                            <div className="flex items-center mb-2 text-sm font-medium">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Personal asignado:</span>
                            </div>
                            <ul className="space-y-1 text-sm">
                              {schedules[selectedDate].employees.map((employee, i) => (
                                <li key={i} className="flex items-center">
                                  <span className="w-2 h-2 rounded-full bg-current mr-2" />
                                  {employee}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setIsEditingTurno(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={() => setIsDeleteDialogOpen(true)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground mb-4">No hay turno asignado para este día.</p>
                      <Button onClick={() => setIsAddingTurno(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir turno
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el turno asignado para el día {selectedDate && new Date(selectedDate).getDate()} de{" "}
              {month.toLocaleDateString("es-ES", { month: "long" })}. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTurno} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
