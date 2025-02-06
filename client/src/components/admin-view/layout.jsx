import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './sidebar'
import AdminHeader from './header'

const Adminlayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)
    return (
        <div className='flex min-h-screen w-full'>
            {/* admin sidebar */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className='flex flex-1 flex-col'>
                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className='flex-1 flex bg-muted/40 p-4 '>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Adminlayout
