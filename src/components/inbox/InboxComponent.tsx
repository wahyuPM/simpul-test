import React, { useState, useEffect } from 'react'
import { floatButtonMode } from '@/atoms';
import { useAtomValue } from 'jotai';

import { ListMessage, DetailMessage } from './_parts';


const InboxComponent: React.FC = () => {
    const btnMode = useAtomValue(floatButtonMode);
    const [detailMessageMode, setDetailMessageMode] = useState(false)

    const toggleDetailMessage = (value: boolean) => {
        setDetailMessageMode(value)
    }

    useEffect(() => {
        setDetailMessageMode(false)
    }, [btnMode])

    return (
        <div className={`fixed bottom-[110px] right-[34px] bg-white box-border rounded transition-all overflow-hidden flex flex-col ${btnMode === 'Inbox' ? 'h-[737px] w-[734px] visible' : 'h-0 w-0 invisible '}`}>
            {detailMessageMode && <DetailMessage onClickBack={toggleDetailMessage} />}
            {
                !detailMessageMode && <ListMessage btnMode={btnMode} onClickDetailMessage={toggleDetailMessage} />
            }
        </div>
    )
}

export default InboxComponent