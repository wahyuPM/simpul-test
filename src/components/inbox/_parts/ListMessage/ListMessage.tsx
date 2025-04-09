import React from 'react'
import { useQuery } from '@tanstack/react-query';
import messagesService from '@/http/messages';
import LoadingComponent from '@/components/loading/LoadingComponent';
import CardMessage from '../CardMessage/CardMessage';
import { floatButtonModeType, selectedIdMessage } from '@/atoms';
import { useSetAtom } from 'jotai';

interface ListMessageProps {
    btnMode: floatButtonModeType
    onClickDetailMessage: (value: boolean) => void
}

const ListMessage: React.FC<ListMessageProps> = ({ btnMode, onClickDetailMessage }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: async ({ signal }) => {
            return await messagesService.getMessageThreads(signal)
        },
        enabled: btnMode === 'Inbox'
    })

    const setIdMessage = useSetAtom(selectedIdMessage)

    const handleClickDetailMessage = (value: string) => {
        onClickDetailMessage(true)
        setIdMessage(value)
    }

    return (
        <>
            <div className='bg-white py-[20px] px-[34px]'>
                <div className='relative h-[32px] w-full border border-[#828282] rounded  bg-white'>
                    <input type="text" className='absolute inset-0 w-full h-full focus:ring-0 active:ring-0 focus-visible:ring-0 outline-0 px-[58px]' placeholder='Search' />
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute right-[58px] top-1/2 transform -translate-1/2'>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.21143 7.54717H8.75345L12.1771 10.9777L11.1548 12L7.72429 8.57633V8.03431L7.53905 7.8422C6.75688 8.51458 5.74145 8.91938 4.63682 8.91938C2.17369 8.91938 0.177124 6.92281 0.177124 4.45969C0.177124 1.99657 2.17369 0 4.63682 0C7.09994 0 9.09651 1.99657 9.09651 4.45969C9.09651 5.56432 8.6917 6.57976 8.01932 7.36192L8.21143 7.54717ZM1.54933 4.4597C1.54933 6.16811 2.92841 7.54718 4.63681 7.54718C6.34522 7.54718 7.72429 6.16811 7.72429 4.4597C7.72429 2.7513 6.34522 1.37222 4.63681 1.37222C2.92841 1.37222 1.54933 2.7513 1.54933 4.4597Z" fill="#333333" />
                    </svg>
                </div>
            </div>
            <LoadingComponent loading={isLoading} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4' />
            {
                !isLoading && data && <div className='flex flex-col overflow-auto flex-1 [&>*:last-child>*]:border-b-0'>
                    {
                        data?.map((value, index) => {
                            return <CardMessage data={value} key={index} onClick={() => handleClickDetailMessage(value.id)} />
                        })
                    }
                </div>
            }
        </>
    )
}

export default ListMessage

/**
 * ListMessage is a React functional component that displays a list of message threads.
 * It uses React Query to fetch message data and displays a loading indicator while data is being fetched.
 * 
 * Props:
 * - btnMode: Determines if the component should fetch messages based on the 'Inbox' mode.
 * - onClickDetailMessage: Callback function triggered when a message is clicked to view details.
 * 
 * The component includes a search input and renders a list of CardMessage components for each message thread.
 * It also manages the selected message ID using Jotai atoms.
 */