'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar'
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser: SafeUser | null ;
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
})=>{
    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen,setIsOpen] = useState(false);
    const toggleOpen = useCallback(()=> {
        setIsOpen((value)=>!value);
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){
            return LoginModal.onOpen() //if no user is logged in then show the user model
            //open rent modal        
        }
        rentModal.onOpen()

    },[currentUser,LoginModal,rentModal])

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    "
                >
                    Rent your Home
                </div>
                <div
                onClick={toggleOpen}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                "
                >   
                <div className='flex flex-row font-semibold'>{currentUser?.name}</div> 
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar  src={currentUser?.image}/>
                    </div>
                </div>
            </div>


            {isOpen && (
                <div
                className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4 
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                "
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                             <>
                                <MenuItem
                                    onClick={()=>router.push('/trips')}
                                    label='My Trips'
                                />
                                <MenuItem
                                    onClick={()=>router.push('/favorites')}
                                    label='My Favorites'
                                />
                                 <MenuItem
                                    onClick={()=>router.push('/reservations')}
                                    label='My Reservations'
                                />
                                 <MenuItem
                                    onClick={()=>router.push('/properties')}
                                    label='My Properties'
                                />
                                 <MenuItem
                                    onClick={rentModal.onOpen}
                                    label='Rent my home'
                                />
                                <hr/>
                                <MenuItem
                                    onClick={()=>signOut()}
                                    label='Log out'
                                />
                         </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={LoginModal.onOpen}
                                    label='Login'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Sign up'
                                />
                        </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserMenu;