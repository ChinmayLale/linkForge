"use client"
import Image from 'next/image'
import React from 'react'
import { SheetTitle } from '@/Components/ui/sheet'
import BioCounts from '../BioCounts'
import { Button } from '@/Components/ui/button'
import { Eye, Share, Share2 } from 'lucide-react'
import { toast } from 'sonner'

function DashBoardUserProfile({ username = "Chinmay Lale" }: { username?: string }) {
    return (
        <div className='w-full h-fit flex md:flex-row justify-center gap-4 p-4 bg-[var(--secondary)] rounded-2xl flex-col'>
            <div className='w-[50%] md:w-[15%] h-full flex flex-row items-center justify-center'>
                <Image
                    src={`https://picsum.photos/1000/1000`}
                    alt='user profile'
                    width={100}
                    height={100}
                    className='w-[80%] rounded-[50%] object-cover'
                />
            </div>
            <div className='w-full flex flex-col items-start'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{username}</h2>
                <p className="leading-7 ">
                    The king, seeing how much happier his subjects were, realized the error of
                    his ways and repealed the joke tax.
                </p>

                <BioCounts />
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
