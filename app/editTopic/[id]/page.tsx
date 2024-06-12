import EditTopicForm from "@/Components/EditTopicForm";

const getTopicByID=async(id:any)=>{
    try{
        const res=await fetch(`http://localhost:3000/api/topics/${id}`,{cache: "no-store",});
        if (!res.ok){
            throw new Error ("Failed to get task")
        }
        return res.json();
    }catch(err){console.log("Error:",err)}
}

export default async function EditTopic({params}:any){
    const {id}=params;
    const {topic}=await getTopicByID(id);
    const {title,description}=topic[0];
    return (<div>
        <EditTopicForm id={id} title={title} description={description}/>
    </div>)
}