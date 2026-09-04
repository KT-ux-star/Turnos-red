import { Request, Response } from 'express';
import * as turnosService from '../services/turnos.services.js';
import { TurnoCrudo, Turno } from '../models/turnos.models.js';

export function obtenerTodos(req: Request, res: Response): void {
  const turnos = turnosService.obtenerTodos();
  res.status(200).json(turnos);
}

export function obtenerPorId(req: Request, res: Response): void {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  const turno = turnosService.obtenerPorId(id);
  
  if (!turno) {
    res.status(404).json({ error: 'Turno no encontrado' });
    return;
  }

  res.status(200).json(turno);
}


export function crearTurno(req: Request, res: Response): void {
  const turnoCrudo: TurnoCrudo = req.body;

  const turno = turnosService.crearTurno(turnoCrudo);
  
  if (!turno) {
    res.status(400).json({ error: 'No se pudo crear el turno. Datos inválidos.' });
    return;
  }

  res.status(201).json(turno);
}


export function actualizarTurno(req: Request, res: Response): void {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  const datosActualizados: Partial<TurnoCrudo> = req.body;
  
  const turno = turnosService.actualizarTurno(id, datosActualizados);
  
  if (!turno) {
    res.status(404).json({ error: 'Turno no encontrado o datos inválidos' });
    return;
  }

  res.status(200).json(turno);
}

export function eliminarTurno(req: Request, res: Response): void {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  const eliminado = turnosService.eliminarTurno(id);
  
  if (!eliminado) {
    res.status(404).json({ error: 'Turno no encontrado' });
    return;
  }

  res.status(204).send();
}
