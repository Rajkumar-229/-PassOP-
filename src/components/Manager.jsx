import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    const getPasswords = async() => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      console.log(passwords)
    setPasswordArray(passwords);
    }
    
    

    useEffect(() => {
        getPasswords();
    }, [])

    const copyText = (text) => {
        toast("📝 Copy to clipbord!", {
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



    const changeSvg = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/closeEye.svg")) {
            ref.current.src = 'icons/eye.svg'
            passwordRef.current.type = "text"
        } else {
            ref.current.src = 'icons/closeEye.svg'
            passwordRef.current.type = "password"
        }
    }



    const savePassword = async() => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
                      // If any such id exists in the db, delete it 
                      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

                      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
                      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
          
            setForm({ site: "", username: "", password: "" })
            toast("🔑 Password save!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    const editOne = (id) => {
        setForm({...passwordArray.filter(items => items.id === id)[0] , id:id})
        setPasswordArray(passwordArray.filter(items => items.id != id))
    }

    const deleteOne =async (id) => {
        let c = confirm("Do you really want to delet this URL ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast("🗑️ Delete the URL", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }



    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <div>
            <div className=" fixed  top-0 z-[-2] h-screen w-screen bg-green-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="flex flex-col w-[100%] md:w-[70%] md:mx-auto pb-5  myContainer min-h-[90vh] md:min-h-[83.2vh] ">

                <div className="w-2/4 sm:myContainer pb-2  ">
                    <div className='flex justify-center'>
                        <span className='text-2xl font-bold'>&lt;Pass</span><span className='text-green-500 text-2xl font-bold'>OP/&gt;</span>
                    </div>
                    <div className='flex justify-center font-bold'>Your own Password Manager</div>
                </div>

                <div className='w-[100%] mx-auto'>
                    <input value={form.site} onChange={handleChange} className='w-[100%] my-3 px-3 border border-gray-500 rounded-full py-1 text-sm' placeholder='Enter Website URL' name='site' type="text" />
                    <div className="flex gap-4 md:flex-row flex-col">
                        <input value={form.username} onChange={handleChange} className='w-[72%] md:my-3 px-3 border border-gray-500  rounded-full py-1 text-sm' placeholder='Enter Username' name='username' type="text" />
                        <div className="relative md:w-[25%]">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='md:w-[100%] w-[70%]  md:my-3 px-3 border border-gray-500 rounded-full py-1 text-sm' placeholder='Enter Password' name='password' type="password" />
                            <span className='absolute md:right-[0.6rem]  md:top-4 right-[118px] top-1 cursor-pointer'><img ref={ref} onClick={changeSvg} src="./icons/closeEye.svg" alt="eye" /></span>
                        </div>
                    </div>
                </div>
                <div className='text-center flex justify-center md:mt-0 md:mb-0 mt-3 mb-3'>
                    <button onClick={savePassword} className='bg-green-300 hover:bg-green-200 font-bold border px-5 py-2 border-black rounded-full gap-1 flex w-fit'  >
                        <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json" className='' trigger="hover">
                        </lord-icon>
                        <span className='py-1'> Save</span>
                    </button>
                </div>
                {passwordArray.length === 0 && <div>No password present</div>}
                {passwordArray.length != 0 &&
                    <div className="passwords mt-5">
                        <h2 className='mb-4 font-bold text-xl text-gray-600'>Your Password</h2>

                        <table className="md:space-x-5 md:w-[93%] sm:myContainer rounded-lg overflow-hidden  text-xl">
                            <thead className='bg-green-500 text-white font-medium'>
                                <tr>
                                    <th className='p-1 w-48'>Site URL</th>
                                    <th className='p-1 w-48'>UserName</th>
                                    <th className='p-1 w-48'>Password</th>
                                    <th className='p-1 w-48'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='p-4 bg-white pb-3 w-[70vh]'>
                                {passwordArray.map((items, index) => {
                                    return <tr key={index} className='bg-green-200 border-white border py-2 text-wrap'>
                                        <td className='md:w-56 text-center md:p-1 text-wrap'>
                                            <div className='flex justify-center items-center gap-3'><a href={items.site} target='_blank'>{items.site}  </a>
                                                <div className="cursor-pointer" onClick={() => { copyText(items.site) }}>
                                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g className="copy-icon" stroke="black" strokeWidth="2">
                                                            <rect x="9" y="4" width="11" height="14" rx="2" ry="2" fill="none" />
                                                            <rect x="4" y="7" width="11" height="14" rx="2" ry="2" fill="none" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-32 text-center p-1'><div className='flex gap-2 items-center justify-center'><span>{items.username}</span>
                                            <div className="cursor-pointer" onClick={() => { copyText(items.username) }}> <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g className="copy-icon" stroke="black" strokeWidth="2">
                                                    <rect x="9" y="4" width="11" height="14" rx="2" ry="2" fill="none" />
                                                    <rect x="4" y="7" width="11" height="14" rx="2" ry="2" fill="none" />
                                                </g>
                                            </svg>
                                            </div>
                                        </div>
                                        </td>
                                        <td className='w-32 text-center p-1 '>
                                            <div className='flex gap-2 items-center justify-center'><span>{items.password}</span>
                                                <div className="cursor-pointer" onClick={() => { copyText(items.password) }}>
                                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g className="copy-icon" stroke="black" strokeWidth="2">
                                                            <rect x="9" y="4" width="11" height="14" rx="2" ry="2" fill="none" />
                                                            <rect x="4" y="7" width="11" height="14" rx="2" ry="2" fill="none" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>


                                        <td className='md:w-32 text-center p-1 '>
                                            <div className='flex justify-center items-center md:gap-8'>
                                                <div className="cursor-pointer" onClick={() => { editOne(items.id) }}>
                                                    <span className="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </div>
                                                <div className="cursor-pointer" onClick={() => { deleteOne(items.id) }}>
                                                    <lord-icon className="w-7"
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>}
            </div>


        </div>
    </>
    )
}

export default Manager

