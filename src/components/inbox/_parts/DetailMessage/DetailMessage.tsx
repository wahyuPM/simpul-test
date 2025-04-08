import React, { useMemo } from 'react';
import { floatButtonMode, selectedIdMessage } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import messagesService from '@/http/messages';
import { useAtomValue } from 'jotai';
import LoadingComponent from '@/components/loading/LoadingComponent';
import Dropdown from './Dropdown/Dropdown';

interface DetailMessageProps {
    onClickBack: (value: boolean) => void;
}

const DetailMessage: React.FC<DetailMessageProps> = ({ onClickBack }) => {
    const setBtnMode = useSetAtom(floatButtonMode);
    const idMessage = useAtomValue(selectedIdMessage);

    const closeMessageMenu = () => {
        setBtnMode(null);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['detailedMessage', idMessage],
        queryFn: async ({ signal }) => {
            return await messagesService.getDetailedMessage(idMessage ?? '', signal);
        },
        enabled: !!idMessage,
    });


    // Define a color map for senders
    const senderColorMap = useMemo(() => {
        const bubbleColors = ['#FCEED3', '#D2F2EA', '#FFD700', '#ADFF2F', '#FF69B4'];
        const textColors = ['#E5A443', '#43B78D'];
        const map: { [key: string]: { bubbleColor: string; textColor: string } } = { 'You': { bubbleColor: '#EEDCFF', textColor: '#9B51E0' } };
        let colorIndex = 0;

        // Iterate over all messages to assign colors
        Object.values(data?.groupedMessages || {}).forEach((messages) => {
            messages.forEach((message) => {
                if (message.sender !== 'You' && !map[message.sender]) {
                    map[message.sender] = {
                        bubbleColor: bubbleColors[colorIndex % bubbleColors.length],
                        textColor: textColors[colorIndex % textColors.length],
                    };
                    colorIndex++;
                }
            });
        });

        return map;
    }, [data?.groupedMessages]);

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        const today = new Date().toLocaleDateString('en-US', options);
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        return today === formattedDate ? `Today ${formattedDate}` : formattedDate;
    };


    if (isLoading) {
        return <div className='relative h-full w-full'><LoadingComponent loading={isLoading} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4' /></div>;
    }

    if (error) {
        return <div>Error loading message details</div>;
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='bg-white py-[20px] px-[34px] flex justify-between items-center'>
                <div className='flex items-center'>
                    <button onClick={() => onClickBack(false)} type='button' aria-label='back-button' className='cursor-pointer mr-3.5'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#333333" />
                        </svg>
                    </button>
                    <div className='box-border'>
                        <p className='text-[#2F80ED] text-base font-bold leading-3'>{data?.subject}</p>
                        <span className='text-xs text-[#333333]'>{data?.participants.length} participants</span>
                    </div>
                </div>
                <button onClick={closeMessageMenu} aria-label='close-button' className='cursor-pointer'>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333" />
                    </svg>
                </button>
            </div>
            <hr className='border-[#BDBDBD]' />
            <div className='p-4 overflow-y-scroll flex-1 h-full'>
                {Object.entries(data?.groupedMessages || {}).map(([date, messages]) => (
                    <div key={date}>
                        <div className='flex items-center my-4'>
                            <hr className='flex-grow border-t border-gray-300' />
                            <span className='mx-4 text-sm font-bold text-gray-600'>{formatDate(date)}</span>
                            <hr className='flex-grow border-t border-gray-300' />
                        </div>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className='flex flex-col'>
                                    <p className={`${message.sender === 'You' ? 'ml-auto' : ''}`} style={{ color: senderColorMap[message.sender].textColor }}>{message.sender}</p>
                                    <div className='flex items-start gap-2'>
                                        <div className={`${message.sender === 'You' ? 'order-1' : 'order-2'}`}>
                                            <Dropdown />
                                        </div>
                                        <div
                                            className={`${message.sender === 'You' ? 'order-2' : 'order-1'} p-2 rounded-lg max-w-xs`}
                                            style={{ backgroundColor: senderColorMap[message.sender].bubbleColor }}
                                        >
                                            <p className='text-base text-[#4F4F4F]'> {message.content}</p>
                                            <span className='text-xs text-[#4F4F4F]'>{message.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='bg-white py-[20px] px-4 flex gap-3'>
                <input type="text" placeholder='Type a new message' className='ring-[#828282] ring-1 flex-1 px-[16px] py-[10px] text-sm rounded' />
                <button className='bg-[#2F80ED] rounded w-[76px] text-white cursor-pointer hover:bg-[#2f65ed]'>Send</button>
            </div>
        </div>
    );
};

export default DetailMessage;