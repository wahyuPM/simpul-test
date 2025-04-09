import React, { useState, useEffect } from 'react'
import { floatButtonMode } from '@/atoms';
import { useAtomValue } from 'jotai';
import TaskAccordion from './_parts/TaskAccordion';

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    daysLeft: number;
}

const TaskComponent: React.FC = () => {
    const btnMode = useAtomValue(floatButtonMode);
    const [, setDetailTaskMode] = useState(false)

    // const toggleDetailTask = (value: boolean) => {
    //     setDetailTaskMode(value)
    // }

    useEffect(() => {
        setDetailTaskMode(false)
    }, [btnMode])

    const [tasks,] = useState<Task[]>([
        {
            id: 1,
            title: 'Close off Case #012920- RODRIGUES, Amiguel',
            description: 'Closing off this case since this application has been cancelled...',
            dueDate: '12/06/2021',
            daysLeft: 2,
        },
        {
            id: 2,
            title: 'Set up documentation report for several Cases',
            description: 'All Cases must include all payment transactions...',
            dueDate: '14/06/2021',
            daysLeft: 4,
        },
    ]);

    return (
        <div className={`fixed bottom-[110px] right-[34px] bg-white box-border rounded transition-all overflow-hidden flex flex-col ${btnMode === 'Task' ? 'h-[737px] w-[734px] visible' : 'h-0 w-0 invisible '}`}>
            <div className="px-[28px] py-[19px] space-y-[22px]">
                <div className="header flex justify-between h-[40px]">
                    <select className="ring-1 rounded w-[119px] px-3">
                        <option>My Tasks</option>
                        <option>All Tasks</option>
                    </select>
                    <button className="bg-[#2F80ED] rounded w-[101px] text-white cursor-pointer hover:bg-[#2f65ed]">New Task</button>
                </div>
                <div className="accordion space-y-[19.5px] [&>*:last-child]:border-b-0">
                    {tasks.map(task => (
                        <TaskAccordion key={task.id} data={task} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TaskComponent