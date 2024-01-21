import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    listingId?: string
}

export async function DELETE(
    request: Request,
    {params}:{params:IParams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;
    if(!listingId  || typeof listingId !== 'string'){
        throw new Error("Invalid ID")
    }

    const listing = await prisma.listing.deleteMany({ //only those who made the reservation or the owner of the listing can delete
        where:{ 
            id:listingId,
            userId: currentUser.id
        }


    });
    return NextResponse.json(listing);
}