import React, { useEffect, useState } from "react";

import { Container, PostForm } from "..";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function EditPosts() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    if (!slug || !userData?.$id) {
      navigate("/");
      return;
    }
       service
      .getPost(slug)
      .then((fetchedPost) => {
        if (!fetchedPost || fetchedPost.userId !== userData.$id) {
          navigate("/");
          return;
        }
 setPost(fetchedPost);
      })
      .catch(() => navigate("/"));
  }, [slug, navigate, userData]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPosts;


   
