import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export const adminSidebarMenuItem = [
    {
        id: 'dashboard',
        Label: 'dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        Label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        Label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    }
]


function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return <nav className='mt-4 flex-col flex gap-2'>

        {
            adminSidebarMenuItem.map(menuItem => <div key={menuItem.id} onClick={() => { navigate(menuItem.path); setOpen ? setOpen(false) : null; }}
                className="flex items-center text-xl cursor-pointer gap-2 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-200 hover:text-black"
            >
                {menuItem.icon}
                <span>{menuItem.Label}</span>
            </div>)
        }
    </nav>
}

const AdminSideBar = ({ open, setOpen }) => {
    const navigate = useNavigate();
    return (

        <Fragment>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64 '>
                    <div className='flex flex-col h-full'>
                        <SheetHeader className='border-b'>
                            <SheetTitle className='flex gap-2 mt-3  mb-3 cursor-pointer' onClick={() => { navigate('/admin/dashboard'); setOpen ? setOpen(false) : null; }}>
                                <ChartNoAxesCombined size={30} />
                                <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />

                    </div>


                </SheetContent>

            </Sheet>


            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSideBar
