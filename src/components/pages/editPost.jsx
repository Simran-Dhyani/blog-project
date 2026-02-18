import React, { useEffect, useState } from "react";
import {PostCard,container} from "../components";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function editPosts(){
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
            <container>
                <PostCard post={post}/>
            </container>
        </div>

    ):null

}
export default editPosts