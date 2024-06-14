import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";
import {NextResponse} from "next/server"

export async function POST(request){
    const {title, description,Completed}=await request.json();
    console.log(Completed)
    await connectMongoDB();

    await Topic.create({title,description,Completed});
    return new Response(JSON.stringify(), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function GET(request){
    // await connectMongoDB();
    // const topics=await Topic.find();
    // return new Response(JSON.stringify({ topics }), {
    //     status:201,
    //     headers: { 'Content-Type': 'application/json' },
    // });
    const url = new URL(request.url, `http://${request.headers.get('host')}`);
    const Completed = url.searchParams.get("Completed");

    await connectMongoDB();

    if (Completed) {
        const topics = await Topic.find({ Completed });
        return new Response(JSON.stringify({ topics }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        const topics = await Topic.find({Completed:false});
        return new Response(JSON.stringify({ topics }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request){
    const id=request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Topic.findByIdAndDelete(id)
    return new Response(JSON.stringify(), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}