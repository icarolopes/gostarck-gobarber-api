import { uuid } from 'uuidv4'

import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment'
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO'

import { IAppointmentsRepository } from '../IAppointmentsRepository'
import { isEqual } from 'date-fns'

export class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}
