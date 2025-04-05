import React from 'react'
import { MoonLoader } from 'react-spinners'

interface LoadingComponentProps {
    loading?: boolean
    className?: string
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ loading, className }) => {
    return (
        <div className={className}>
            <MoonLoader
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                loading={loading}
            />
            {loading && <p>Loading Chats...</p>}
        </div>
    )
}

export default LoadingComponent