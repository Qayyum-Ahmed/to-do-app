"use client";
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function EditTopicForm(params:any){
    const [ntitle,setNtitle]=useState(params.title)
    const [ndesc, setNdesc]=useState(params.description)

    const router=useRouter();
    const handleSubmit=async (e:any)=>{
        e.preventDefault();
        try{
            const res=await fetch(`http://localhost:3000/api/topics/${params.id}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newTitle:ntitle,newDescription:ndesc,Completed:params.Completed}),
            });
            if (!res.ok){
                throw new Error("Failed to Update")
            }
            router.push('/')
        }
        catch(err){console.log(err)}
    }
    return( <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setNtitle(e.target.value)} value={ntitle} className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Title">
        </input>
        <input onChange={(e)=>setNdesc(e.target.value)} value={ndesc} className="border border-slate-500 px-8 py-2" type="text" placeholder="Task Description"></input>
        <button type='submit' className="bg-green-600 font-bold py-3 px-6 w-fit text-white"> Update Task</button>
    </form>)
}