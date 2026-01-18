import { Request, Response, NextFunction } from "express";
import { ProviderRelations, ProvidersFilters, ProviderWithRelations } from "./provider.types.js";
import { providerRepository } from "./provider.repository.js";
import ApiResponse from "../../types/apiResponse.types.js";
import { WorkingSchedule, Booking, Provider, Service } from "@prisma/client";
import { ServiceCreationPayload } from "../service/service.types.js";
import { serviceRepository } from "../service/service.repository.js";
import { WorkingScheduleCreationPayload } from "../workingSchedule/workingSchedule.types.js";
import { workingScheduleRepository } from "../workingSchedule/workingSchedule.repository.js";
import { bookingRepository } from "../booking/booking.repository.js";
import { BookingTime } from "../booking/booking.types.js";

export const getProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = req.queryParams as ProvidersFilters

        console.log(filters)

        const providers = await providerRepository.getProviders(filters)

        const response: ApiResponse<Provider[]> = {
            success: true,
            message: "Providers retrieved successfully",
            data: providers
        }

        res.status(200).json(response)

    } catch(err) {
        next(err)
    }
}

export const addService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providerId = req.provider?.id as number
        const servicePayload = req.body as ServiceCreationPayload

        const serviceData = {
            ...servicePayload,
            providerId
        }

        const service = await serviceRepository.createService(serviceData)

        if(!service)
            throw new Error(`Service for provider with id: ${providerId}, could not be added`)

        const response: ApiResponse<Service> = {
            success: true,
            message: `Service added successfully to provider with id: ${providerId}`,
            data: service
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const addWorkingSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providerId = req.provider?.id as number
        const workingSchedulePayload = req.body as WorkingScheduleCreationPayload

        const startTime = new Date(`1970-01-01T${workingSchedulePayload.startTime}:00Z`)
        const endTime = new Date(`1970-01-01T${workingSchedulePayload.endTime}:00Z`)

        const workingScheduleData = {
            weekDay: workingSchedulePayload.weekDay,
            providerId,
            startTime,
            endTime
        }

        const newWorkingSchedule = await workingScheduleRepository.createWorkingSchedule(workingScheduleData)

        if(!newWorkingSchedule)
            throw new Error(`WorkingSchedule for provider with id: ${providerId}, could not be added`)

        const relations: ProviderRelations = {
            workingSchedule: true
        }

        const providerWorkingSchedule = await workingScheduleRepository.getAllWorkingScheduleByProviderId(providerId)

        const response: ApiResponse<WorkingSchedule[]> = {
            success: true,
            message: `WorkingSchedule added successfully to provider with id: ${providerId}`,
            data: providerWorkingSchedule
        }

        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

export const getProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string)
        const relationsFilters = req.queryParams as ProviderRelations

        const provider = await providerRepository.getProviderById(id, relationsFilters)

        if(!provider)
            throw new Error("Provider could not be retrieved")

        const response: ApiResponse<ProviderWithRelations> = {
            success: true,
            message: "Provider retrieved successfully",
            data: provider
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

export const getBookingAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const servicesIds = req.body.servicesId as number[]
        const providerId = req.provider?.id as number

        const services = await serviceRepository.getMultipleServicesByIds(servicesIds)
        const provider = await providerRepository.getProviderById(providerId, {bookings: true, workingSchedule: true})

        const totalPay = services.reduce((sum, service) => sum + service.price, 0)
        const totalTime = services.reduce((sum, service) => sum + service.duration, 0)

        if(!totalTime)
            throw new Error("Selected services unavailable")

        if(!provider || !provider.workingSchedule)
            throw new Error("Provider availability could not be fetched")

        const todaysDate = new Date()

        const workingSchedule = getFirstAvailableDateFrom(todaysDate, provider.workingSchedule)

        if(!workingSchedule)
            throw new Error("Provider not active")

        const providerBookings = await bookingRepository.getBookingsByProviderIdAndDate(providerId, todaysDate)

        const availability = computeAvailability(services, providerBookings, workingSchedule)

        const response: ApiResponse<Date[]> = {
            success: true,
            message: "Availability for selected services computed successfully",
            data: availability
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

const computeAvailability = (services: Service[], providerBookings: Booking[], workingSchedule:WorkingSchedule): Date[] => {
    const servicesTime = services.reduce((sum, service) => sum + service.duration, 0)

    const bookingTimes = providerBookings.map((booking: Booking): BookingTime => {
        return {
            startTime: booking.startTime,
            endTime: booking.endTime
        }
    })

    if(bookingTimes.length === 0)
        return []

    const firstBooking = bookingTimes[0]
    const lastBooking = bookingTimes[bookingTimes.length -1]

    if(!firstBooking || !lastBooking)
        return []

    if(workingSchedule.startTime.getTime() !== firstBooking.startTime.getTime())
        bookingTimes.splice(0, 0, {startTime: workingSchedule.startTime, endTime: firstBooking.startTime})

    if(workingSchedule.endTime.getTime() !== lastBooking.endTime.getTime())
        bookingTimes.splice(bookingTimes.length - 1, 0, {startTime: lastBooking.endTime, endTime: workingSchedule.endTime})

    const availability = []

    for (let i = 0; i < bookingTimes.length - 1; i++) {
        const nextBookingStartTime = bookingTimes[i+1]!.startTime
        const currentBookingEndTime = bookingTimes[i]!.endTime

        const timeDifferenceInMinutes = (nextBookingStartTime.getTime() - currentBookingEndTime.getTime()) / 1000 / 60

        if(timeDifferenceInMinutes >= servicesTime){
            const availableTime = new Date(currentBookingEndTime)

            while(availableTime.getTime() + servicesTime * 60 * 100 <= nextBookingStartTime.getTime()) {
                availability.push(new Date(availableTime))
                availableTime.setMinutes(availableTime.getMinutes() + servicesTime)
            }
        }
    }

    return availability
}

const getFirstAvailableDateFrom = (startDate: Date, workingSchedule: WorkingSchedule[]): WorkingSchedule | undefined => {
    const nextDate = new Date(startDate)
    let maxIterations = 7

    while(maxIterations > 0){
        const nextWorkingSchedule = workingSchedule.find(avb => avb.weekDay === nextDate.toLocaleDateString('en-US', { weekday: 'long'}).toUpperCase())

        if(nextWorkingSchedule)
            return nextWorkingSchedule

        nextDate.setDate(nextDate.getDate() + 1)
        maxIterations --
    }

    return undefined
}