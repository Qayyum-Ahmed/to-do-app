"use client";
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function AddTopic(){
    const [title, setTitle]=useState("")
    const [description,setDescription]=useState("")

    const router=useRouter();

    const handleSubmit=async (e:any)=>{
        e.preventDefault();
        if(!title || !description){
            alert("Title and Description are required");
            return;
        }

        try{
            const res=await fetch('http://localhost:3000/api/topics',{
                method: "POST",
                headers: {
                    "Content-type":"Application/json",
                },
                body: JSON.stringify({title,description})
            });

            if (res.ok){
                router.push('/')
                router.refresh();
            }else{
                throw new Error("Failed to create a task")
            }
        }catch(err){}
    }

    return( <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setTitle(e.target.value)} value={title} className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Title">
        </input>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Description"></input>
        <button type="submit" className="bg-green-600 font-bold py-3 px-6 w-fit text-white"> Add Task</button>
    </form>)
}