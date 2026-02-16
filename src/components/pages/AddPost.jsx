import React from "react";
import {container,PostForm} from "../components";
function addPost(){
    return(
        <div className="py-8">
            <container>
                <PostForm/>
            </container>
            
        </div>
    )
}
export default addPost;