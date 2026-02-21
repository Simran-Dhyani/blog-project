import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
function PostCard({
    $id,title,featuredImage
}){
    return(
        <Link to={`/post/${$id}`}>
            <div className="bg-gray-100 w-full rounded-lg p-4">
                <div className="w-full justify-center mb-4">
              {featuredImage ? (
              <img
              src={service.getFileDownload(featuredImage)}
              alt={title}
              className="rounded-xl"
              />
              ) : (
              <div className="h-40 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
              No Image
              </div>
             )}

                  
                </div>
                <h2>{title}</h2>

            </div>
        </Link>
    )}
    export default PostCard;


                