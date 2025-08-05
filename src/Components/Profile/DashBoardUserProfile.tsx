"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
// import { SheetTitle } from '@/Components/ui/sheet'
import BioCounts from '../BioCounts'
import { Button } from '@/Components/ui/button'
import { Eye, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { userThunks } from '@/store/thunks/user'
import { Skeleton } from '../ui/skeleton'

function DashBoardUserProfile({ user = "Chinmay" }: { user?: string }) {

    const { username, name, bio, avatarUrl, loading, error, totalClicks = 0, totalLinks = 0, ctr = 0.0 } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!username && !name) {

        }
        dispatch(userThunks.getUserProfileThunk(user))
    }, [username]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (!loading && !username) {
        return null; // Don't render anything until we fetch something
    }
    if (loading) {
        return (
            <div className="w-full h-fit flex md:flex-row justify-center gap-4 p-4 bg-sidebar rounded-2xl flex-col">
                {/* Avatar Skeleton */}
                <div className="w-[50%] md:w-[15%] h-full flex flex-row items-center justify-center">
                    <Skeleton className="w-[80px] h-[80px] rounded-full" />
                </div>

                {/* Name + Bio Skeleton */}
                <div className="w-full flex flex-col items-start gap-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>

                {/* Buttons Skeleton */}
                <div className="w-[25%] h-full flex md:flex-col flex-row items-center justify-around gap-4">
                    <Skeleton className="h-10 w-[120px]" />
                    <Skeleton className="h-10 w-[120px]" />
                </div>
            </div>
        )
    }



    return (
        <div className='w-full h-fit flex md:flex-row justify-center gap-4 p-4 bg-sidebar rounded-2xl flex-col'>

            <div className='w-[50%] md:w-[15%] h-full flex flex-row items-center justify-center'>
                <Image
                    src={avatarUrl || `https://avatar.iran.liara.run/username?username=${username}`}
                    alt='user profile'
                    width={100}
                    height={100}
                    className='w-[80%] rounded-[50%] object-cover'
                    unoptimized
                />
            </div>
            <div className='w-full flex flex-col items-start'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">@ {username}<span className="ml-4 text-muted-foreground text-lg font-medium">{name}</span></h2>
                <p className="leading-7 ">
                    {bio || "This user has not set a bio yet. You can add one in the settings."}
                </p>

                <BioCounts links={totalLinks} clicks={totalClicks} ctr={ctr} />
            </div>
            <div className='w-[25%] h-full flex md:flex-col flex-row items-center justify-around gap-4'>
                <Button variant="outline" size="sm" className='cursor-pointer' onClick={() => toast.info("Previewing Profile")}>
                    <Eye />   Preview Page
                </Button>
                <Button variant="outline" size="sm" className='cursor-pointer' onClick={() => toast.info("Link Copied to Clipboard")}>
                    <Share2 />  Share Profile
                </Button>
            </div>
        </div>
    )
}

export default DashBoardUserProfile
