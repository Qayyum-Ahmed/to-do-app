import connectMongoDB from "../../../../libs/mongodb"
import Topic from "../../../../models/topic"
import {NextResponse} from "next/server" 

export async function PUT(request,{params}){
    const{id}=params;
    const {newTitle:title, newDescription:description,Completed}=await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title,description,Completed})
    return new Response(JSON.stringify(), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });

}

export async function GET(request,{params}){
    const {id}=params;
    await connectMongoDB();
    const topic = await Topic.findById(id);

    return new Response(JSON.stringify({topic}), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}