import React from 'react'

interface LayoutDefaultProps {
    children: React.ReactNode
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
    return (
        <main className='relative bg-[#333333]'>
            <div className='grid grid-cols-[285px_1fr]'>
                <aside className='border-r-[#F2F2F2] border-r'></aside>
                <section className='min-h-screen'>
                    {/* start:navbar */}
                    <nav className='bg-[#4F4F4F] h-[58px] px-[26px] flex items-center'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7124 10.0629H11.4351L16 14.6369L14.6369 16L10.0629 11.4351V10.7124L9.81589 10.4563C8.77301 11.3528 7.4191 11.8925 5.94625 11.8925C2.66209 11.8925 0 9.23042 0 5.94625C0 2.66209 2.66209 0 5.94625 0C9.23042 0 11.8925 2.66209 11.8925 5.94625C11.8925 7.4191 11.3528 8.77301 10.4563 9.81589L10.7124 10.0629ZM1.82959 5.94554C1.82959 8.22342 3.66835 10.0622 5.94623 10.0622C8.2241 10.0622 10.0629 8.22342 10.0629 5.94554C10.0629 3.66767 8.2241 1.82891 5.94623 1.82891C3.66835 1.82891 1.82959 3.66767 1.82959 5.94554Z" fill="#F2F2F2" />
                        </svg>
                    </nav>
                    {children}
                </section>
            </div>
        </main>
    )
}

export default LayoutDefault