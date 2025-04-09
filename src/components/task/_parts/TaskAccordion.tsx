import React, { useState, useEffect, useRef } from 'react'

interface Task {
    data: {
        id: number;
        title: string;
        description: string;
        dueDate: string;
        daysLeft: number;
    }
}

const TaskAccordion: React.FC<Task> = ({ data }) => {
    const [toggleAccordion, setToggleAccordion] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = toggleAccordion ? `${contentRef.current.scrollHeight + 20}px` : '0px';
            contentRef.current.style.maxHeight = contentHeight;
        }
    }, [toggleAccordion]);

    return (
        <div key={data.id} className="flex gap-4 items-start pb-[22px] border-b">
            <input type="checkbox" className='mt-[4.5px]' />
            <div className='flex flex-col flex-1'>
                <div className="flex justify-between">
                    <div>
                        <span className="task-title font-semibold text-[#4F4F4F]">{data.title}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className="days-left text-red-500">{data.daysLeft} Days Left</span>
                        <span className="due-date text-[#4F4F4F]">{data.dueDate}</span>
                        <button className={`btn-accordion cursor-pointer ${toggleAccordion ? 'rotate-0' : 'rotate-180'}`} onClick={() => setToggleAccordion(prev => !prev)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="expand_more_24px">
                                    <path id="icon/navigation/expand_more_24px" d="M6.175 13.0875L10 9.27083L13.825 13.0875L15 11.9125L10 6.9125L5 11.9125L6.175 13.0875Z" fill="#4F4F4F" />
                                </g>
                            </svg>
                        </button>
                        <button>
                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5 1.75C10.5 2.7125 11.2875 3.5 12.25 3.5C13.2125 3.5 14 2.7125 14 1.75C14 0.7875 13.2125 -3.44227e-08 12.25 -7.64949e-08C11.2875 -1.18567e-07 10.5 0.7875 10.5 1.75ZM8.75 1.75C8.75 0.7875 7.9625 -2.63908e-07 7 -3.0598e-07C6.0375 -3.48052e-07 5.25 0.7875 5.25 1.75C5.25 2.7125 6.0375 3.5 7 3.5C7.9625 3.5 8.75 2.7125 8.75 1.75ZM1.75 -5.35465e-07C2.7125 -4.93392e-07 3.5 0.7875 3.5 1.75C3.5 2.7125 2.7125 3.5 1.75 3.5C0.7875 3.5 -1.18567e-07 2.7125 -7.64949e-08 1.75C-3.44227e-08 0.787499 0.7875 -5.77537e-07 1.75 -5.35465e-07Z" fill="#828282" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div ref={contentRef} className={`task-details overflow-hidden duration-300 ease`}
                    style={{
                        maxHeight: '0px',
                        paddingTop: toggleAccordion ? '16px' : '0'
                    }}>
                    <div className='box-border space-y-[13px]'>
                        <div className='flex gap-3 items-center'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.99181 1.66663C5.39181 1.66663 1.66681 5.39996 1.66681 9.99996C1.66681 14.6 5.39181 18.3333 9.99181 18.3333C14.6001 18.3333 18.3335 14.6 18.3335 9.99996C18.3335 5.39996 14.6001 1.66663 9.99181 1.66663ZM10.0003 16.6666C6.31697 16.6666 3.33364 13.6833 3.33364 9.99996C3.33364 6.31662 6.31697 3.33329 10.0003 3.33329C13.6836 3.33329 16.667 6.31662 16.667 9.99996C16.667 13.6833 13.6836 16.6666 10.0003 16.6666ZM9.16681 5.83329H10.4168V10.2083L14.1668 12.4333L13.5418 13.4583L9.16681 10.8333V5.83329Z" fill="#2F80ED" />
                            </svg>
                            <input type="date" className='ring-1 rounded h-[40px] w-[193px]' />
                        </div>
                        <div className='flex gap-3 items-start'>
                            <svg className='mt-[4.5px]' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.2165 0C12.0082 0 11.7915 0.0833333 11.6332 0.241667L10.1082 1.76667L13.2332 4.89167L14.7582 3.36667C15.0832 3.04167 15.0832 2.51667 14.7582 2.19167L12.8082 0.241667C12.6415 0.075 12.4332 0 12.2165 0ZM9.21667 5.01667L9.98333 5.78333L2.43333 13.3333H1.66667V12.5667L9.21667 5.01667ZM0 11.875L9.21667 2.65833L12.3417 5.78333L3.125 15H0V11.875Z" fill="#2F80ED" />
                            </svg>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskAccordion