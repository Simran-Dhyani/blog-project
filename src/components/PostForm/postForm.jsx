import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Button, Input, Select } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate = useNavigate();

  
  const userData = useSelector((state) => state.auth?.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

 
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

 
  const submit = async (data) => {
   
    if (!userData) return;

    try {
      
      if (post) {
        let fileId = post.featuredImage;

        if (data.image?.[0]) {
          const uploadedFile = await service.uploadFile(data.image[0]);
          if (uploadedFile) {
            await service.deleteFile(post.featuredImage);
            fileId = uploadedFile.$id;
          }
        }

        const dbPost = await service.updatePost(post.$id, {
          title: data.title,
         
          content: data.content,
          status: data.status,
          featuredImage: fileId,
        });
       

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }

     
      else {
        const uploadedFile = await service.uploadFile(data.image[0]);
        data.featuredImage = uploadedFile.$id;

        if (uploadedFile) {
          const dbPost = await service.createPost({
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage: uploadedFile.$id,
            userId: userData.$id,
            authorName: userData.name,
          });

          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Post submit error:", error);
    }
  };

  
  if (!userData) {
    return <p className="text-center">Please login to create a post</p>;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* LEFT */}
        <div className="w-1/3 px-2 relative z-10">

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required:true})}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: !post})}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* RIGHT */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFileDownload(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <div className="w-full mt-10">
           

        <Button
         type="submit"
           className="w-full relative z-50 bg-pink-500 hover:bg-pink-600 active:bg-pink-700" >
           {post ? "Update" : "Submit"}
         </Button>
         </div>

      </div>
    </form>
  );
}
