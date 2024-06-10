import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteServices from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteServices.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteServices.deleteFile(post.featuredImages);
      }
      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImages: file ? file.$id : undefined,
        if(dbPost) {
          navigate(`/post/${dbPost.$id}`);
        },
      });
    } else {
      const file = data.image[0]
        ? await appwriteServices.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImages = fileId;
        const dbPost = await appwriteServices.createPost({
          ...data,
          userId: userData.$id,
          });
          if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else "";
  }, []);

  // ddd
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

return (
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Title :
        </label>
        <input
          id="title"
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
          {...register("title", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="slug"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Slug :
        </label>
        <input
          id="slug"
          placeholder="Slug"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
      </div>
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
        className="mb-4 border border-gray-700 bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
      />
    </div>
    <div className="w-1/3 px-2">
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Featured Image :
        </label>
        <input
          id="image"
          type="file"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] appearance-none file:bg-gray-700 file:border-none file:mr-3 file:py-2 file:px-4 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-gray-600"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
      </div>
      {post && (
        <div className="w-full mb-4">
          <img
            src={appwriteServices.getFilePreview(post.featuredImages)}
            alt={post.title}
            className="rounded-lg shadow-md"
          />
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Status :
        </label>
        <select
          id="status"
          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
          {...register("status", { required: true })}
        >
          {["active", "inactive"].map((option) => (
            <option
              key={option}
              value={option}
              className="bg-gray-800 text-white"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="submit"
        bgColor={post && "bg-green-500"}
        className="w-full py-2 bg-[#007acc] text-black font-medium rounded-lg shadow-md hover:bg-gray-800 hover:text-white transition-colors duration-300"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  </form>
)}

export default PostForm;