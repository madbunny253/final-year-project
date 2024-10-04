import React from 'react'
import { useState } from 'react';
import { Button } from '../button'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Header() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [openDailog, setOpenDailog] = useState(false);
    const navigate = useNavigate(); 

    const toLogin = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

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
            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.clear();
        setUser(null); // Update the user state to null
        navigate('/',{ replace: true }); // Redirect to home page
    };
    

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <img src="/logo.svg" />
            <div>
                {user ?
                    <div className='flex items-center gap-4'>
                        <Button variant='outline' className='rounded-full'>My Bills</Button>
                        <Button onClick={handleLogout} >Logout</Button>
                    </div> : <Button onClick={()=>{setOpenDailog(true);}}>Sign In</Button>}
            </div>
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent>
                        <DialogDescription>
                            <img src="/logo.svg" alt="" />
                            <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                            <p>Sign in to the app using Goole authentication securely</p>
                            <Button onClick={toLogin} className='w-full mt-5 flex gap-3 items-center'> <FcGoogle className='h-6 w-6' /> Sign in with Google</Button>
                        </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header