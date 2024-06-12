"use client";

import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation";

export default function RemoveBtn(props:any){
    const router=useRouter();
    const removeTopic=async()=>{
        const confirmed=confirm("Are you sure?")

        if (confirmed){
            const res=await fetch(`http://localhost:3000/api/topics?id=${props.id}`,{
                method: "DELETE",
            });
            if (res.ok){
                router.refresh();
            }
        }
    }
    return (
        <button onClick={removeTopic}>
            <HiOutlineTrash size={24} className="text-red-400"/>
        </button>
    )
}