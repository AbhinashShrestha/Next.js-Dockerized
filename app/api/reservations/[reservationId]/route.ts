import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    reservationId?: string
}

export async function DELETE(
    request: Request,
    {params}:{params:IParams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {reservationId} = params;
    if(!reservationId  || typeof reservationId !== 'string'){
        throw new Error("Invalid ID")
    }

    const reservation = await prisma.reservation.deleteMany({ //only those who made the reservation or the owner of the listing can delete
        where:{ 
            id:reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }


    });
    return NextResponse.json(reservation);
}