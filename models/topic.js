import mongoose, {Schema} from "mongoose";

const topicSchema=new Schema(
    {
        title:String,
        description: String, 
        Completed: Boolean,   }
);

const Topic=mongoose.models.Topic || mongoose.model("Topic",topicSchema)

export default Topic;