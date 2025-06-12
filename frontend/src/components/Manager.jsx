import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:8000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords);
    }

    useEffect(() => {
        getPasswords()

    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPass = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/hidden.png";
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "text"
        }
    }

    const savePass = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const isEdit = !!form.id;
            const id = isEdit ? form.id : uuidv4(); // reuse id in edit, or generate new
            const newEntry = { ...form, id };

            if (isEdit) {
                await fetch("http://localhost:8000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
            }

            setPasswordArray([...passwordArray, newEntry]);

            await fetch("http://localhost:8000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry)
            });

            setForm({ site: "", username: "", password: "" });

            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!');
        }
    };


    const deletePass = async (id) => {
        let c = confirm("Do you want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:8000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // console.log([...passwordArray, form]);

    }
    const editPass = async (id) => {

        setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="mx-auto p-3 my-10 max-w-4xl overflow-x-hidden ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-blue-500'>&lt;</span>
                    Pass
                    <span className='text-blue-500'>OP/&gt;</span>

                </h1>
                <p className='text-lg text-center'>Your own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-4 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPass}>
                                <img ref={ref} className='p-1' width={26} src="icons/hidden.png" alt="" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePass} className='flex justify-center items-center bg-blue-400 rounded-full gap-2 px-5 py-2 w-fit hover:bg-blue-300 cursor-pointer border-1 border-x-blue-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className={`passwords ${passwordArray.length !== 0 ? "overflow-auto" : ""}`}>
                    <h2 className='font-bold text-2xl py-4 '>Your Passwords</h2>
                    {passwordArray.length === 0 && (
                        <div className="text-center text-gray-500 py-4">No passwords to show</div>
                    )}

                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-blue-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank' rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-500">{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password?.length || 0)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>


                                        <span className='cursor-pointer mx-1' onClick={() => { deletePass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div >
        </>
    )

}

export default Manager