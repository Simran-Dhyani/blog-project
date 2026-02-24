import React, { useEffect, useState } from "react";
import { Container, PostCard } from "..";
import service from "../../appwrite/config";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
   const userData = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    service
      .getPosts([Query.equal("status", "active"), Query.equal("userId", userData.$id)])
      .then((res) => {
        
        if (res && res.documents) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        console.error("GET POSTS ERROR ❌", error);
      });
  }, [userData]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              {/* spread props correctly */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;