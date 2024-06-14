import Link from "next/link"
import RemoveBtn from "./RemoveBtn"
import CompTask from "./CompleteTask"
import {HiPencilAlt} from "react-icons/hi"
import { IoMdArrowRoundBack } from "react-icons/io";

import Navbar from "./Navbar";



const getTopics=async()=>{
    try{
        const res=await fetch('http://localhost:3000/api/topics',{cache:"no-store"});
        if (!res.ok){
            throw new Error("Failed to fetch")
        }

        return res.json();
    }catch(err){
        console.log(err)
    }
}

const getCompleteTopics=async()=>{
    try{
        const res=await fetch('http://localhost:3000/api/topics/?Completed=true',{cache:"no-store"});
        if (!res.ok){
            throw new Error("Failed to fetch")
        }

        return res.json();
    }catch(err){
        console.log(err)
    }
}

export default async function TopicsList(){
    const {topics}=await getTopics();
    const comTopics=await getCompleteTopics();
    return (
        <>
        {topics.map((t:any)=>(
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">
                    {t.title}
                </h2>
                <div>{t.description}</div>
            </div>
            <div className="flex gap-2">
                <CompTask id={t._id} title={t.title} desc={t.description}/>
                <RemoveBtn id={t._id}/>
                <Link href={`/editTopic/${t._id}`}>
                    <HiPencilAlt size={24}/>
                </Link>
            </div>
        </div>))}
        {comTopics.topics && <div className="flex justify-between items-center bg-red-700 px-8 py-3 text-white font-bold">
            Completed Tasks
        </div>}
        {comTopics.topics.map((t:any)=>(
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">
                    {t.title}
                </h2>
                <div>{t.description}</div>
            </div>
            <div className="flex gap-2">
                <RemoveBtn id={t._id}/>
                {/* <IoMdArrowRoundBack size={24}/> */}
            </div>
        </div>
        ))}
        </>
    )
}