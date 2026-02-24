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
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!slug ) {
      navigate("/");
      return;
    }
        if (!authStatus) {
      navigate("/login");
      return;
    }

    if (!userData?.$id) {
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
  }, [slug, navigate, userData,authStatus]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPosts;


   
