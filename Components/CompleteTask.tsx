"use client";

import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function CompTask(props:any){
    const router=useRouter();
    const completeTopic=async()=>{
        const confirmed=confirm("Mark this as completed?")

        if (confirmed){
            try{
                const res=await fetch(`http://localhost:3000/api/topics/${props.id}`,{
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({newTitle:props.title,newDescription:props.desc,Completed:true}),
                });
                if (!res.ok){
                    throw new Error("Failed to Update")
                }
                router.push('/')
                router.refresh();
            }
            catch(err){console.log(err)}
        }
    }
    return (
        <button onClick={completeTopic}>
            <IoCheckmarkDoneSharp size={24} className="text-green-600"/>
        </button>
    )
}