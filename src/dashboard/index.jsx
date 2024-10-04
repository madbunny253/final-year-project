import { Button } from '@/components/ui/button';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function DashboardDetails() {
    const [openDailog, setOpenDailog] = useState(false);
    const navigate = useNavigate();

    const toSalesDetails= () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true); 
            return;
        }
        setOpenDailog(false);
        navigate('/sales-details');
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
            toDashboard();
        }).catch((error) => {
            console.error(error);
        });
    };
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1
                className='font-bold text-[60px] text-center mt-60'
            >
                Nothing to show here for the moment . . .<br/><span className='text-[#f56551]'>Try creating new bills</span> 
            </h1>
            <p
                className='text-xl text-gray-500 text-center'
            >
                Your personal sales dashboard will be shown here after creating bills for some time.<br/><span className='text-[#f56551] font-semibold'>Sign in to start creating Bills</span> 
            </p>
            <Button onClick={toSalesDetails}>Create a new bill here</Button>
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent>
                        <DialogDescription>
                            <img src="/logo.svg" alt="" />
                            <h2 className='font-bold text-lg mt-5 items-center'>Please Sign In before creating new bill</h2>
                            <p className='mt-5'>Sign in to the app to save progress of billing information , Thank You.</p>
                        </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DashboardDetails;
