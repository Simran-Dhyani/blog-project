import React, { useEffect, useState } from "react";
import {PostCard,Container} from "..";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPosts(){
    const [post,setPosts]=useState()
    const {slug}=useParams;
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPosts(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })

        }else{
            navigate("/")
        }


    },[slug,navigate])
    return post?(
        <div className="py-8">
            <Container>
                <PostCard post={post}/>
            </Container>
        </div>

    ):null

}
export default EditPosts