import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // To track the current path
    const [openDailog, setOpenDailog] = useState(false);

    const checkUserLogin = (path) => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true); // Display the dialog if user is not logged in
            return;
        }
        navigate(path);
    };

    const toSalesDetails = () => checkUserLogin('/sales-details');
    const toMagic = () => checkUserLogin('/magic-ai');
    const toDashboard = () => checkUserLogin('/dashboard');

    // Helper function to check active path
    const isActive = (path) => location.pathname === path ? 'bg-[#f56551] text-white' : 'bg-gray-200 text-black'; // Use gray background for inactive buttons

    return (
        <div className="h-full p-4 flex flex-col justify-between w-48">
            {/* Menu Buttons */}
            <div className="flex flex-col gap-4 mt-10">
                <Button 
                    onClick={toDashboard} 
                    className={`w-full ${isActive('/dashboard')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Dashboard
                </Button>
                <Button 
                    onClick={toSalesDetails} 
                    className={`w-full ${isActive('/sales-details')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Add Bill
                </Button>
                <Button 
                    onClick={toMagic} 
                    className={`w-full ${isActive('/magic-ai')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Magic
                </Button>
            </div>
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent>
                    <DialogDescription>
                        <img src="/logo.svg" alt="App Logo" />
                        <h2 className='font-bold text-lg mt-5 items-center'>
                            Please Sign In before creating new bill
                        </h2>
                        <p className='mt-5'>
                            Sign in to the app to save progress of billing information. Thank you.
                        </p>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Sidebar;
