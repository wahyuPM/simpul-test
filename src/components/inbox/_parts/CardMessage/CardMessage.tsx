import React from 'react';
import { MessageThread } from '@/http/messages';

interface CardMessageProps {
    data: MessageThread
    onClick: () => void
}

const CardMessage: React.FC<CardMessageProps> = ({ data, ...props }) => {
    const reversedMessages = [...data.messages].reverse();
    return (
        <div className='flex gap-[17px] px-[34px] pt-[22px] cursor-pointer hover:bg-gray-100 w-full box-border' {...props}>
            <div className='flex w-full gap-[17px] border-b border-[#828282]'>
                {/* start: icon user */}
                <svg width="51" height="34" viewBox="0 0 51 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34 17C34 26.3888 26.3888 34 17 34C7.61116 34 0 26.3888 0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17Z" fill="#E0E0E0" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 11C15.3425 11 14 12.3425 14 14C14 15.6575 15.3425 17 17 17C18.6575 17 20 15.6575 20 14C20 12.3425 18.6575 11 17 11ZM18.5 14C18.5 13.175 17.825 12.5 17 12.5C16.175 12.5 15.5 13.175 15.5 14C15.5 14.825 16.175 15.5 17 15.5C17.825 15.5 18.5 14.825 18.5 14ZM21.5 21.5C21.35 20.9675 19.025 20 17 20C14.9825 20 12.6725 20.96 12.5 21.5H21.5ZM11 21.5C11 19.505 14.9975 18.5 17 18.5C19.0025 18.5 23 19.505 23 21.5V23H11V21.5Z" fill="black" fillOpacity="0.54" />
                    <path d="M51 17C51 26.3888 43.3888 34 34 34C24.6112 34 17 26.3888 17 17C17 7.61116 24.6112 0 34 0C43.3888 0 51 7.61116 51 17Z" fill="#2F80ED" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M34 11C32.3425 11 31 12.3425 31 14C31 15.6575 32.3425 17 34 17C35.6575 17 37 15.6575 37 14C37 12.3425 35.6575 11 34 11ZM35.5 14C35.5 13.175 34.825 12.5 34 12.5C33.175 12.5 32.5 13.175 32.5 14C32.5 14.825 33.175 15.5 34 15.5C34.825 15.5 35.5 14.825 35.5 14ZM38.5 21.5C38.35 20.9675 36.025 20 34 20C31.9825 20 29.6725 20.96 29.5 21.5H38.5ZM28 21.5C28 19.505 31.9975 18.5 34 18.5C36.0025 18.5 40 19.505 40 21.5V23H28V21.5Z" fill="white" />
                </svg>
                {/* end: icon user */}
                <div className='box-border mb-[22px]'>
                    <div className='flex gap-2'>
                        <p className='text-[#2F80ED] text-base font-bold'>{data.subject}</p> <span className='text-[#4F4F4F] font-light'>{data.date}</span>
                    </div>
                    <p className='text-sm font-bold text-[#4F4F4F]'>{reversedMessages[0].sender} :</p>
                    <p className='text-sm font-light text-[#4F4F4F]'>{reversedMessages[0].content}</p>
                </div>
            </div>
        </div>
    );
}

export default CardMessage;