import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "../index";
import appwriteServices from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
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
      const file =
        data.image[0] && (await appwriteServices.uploadFile(data.image[0]));

      if (file) {
        await appwriteServices.deleteFile(post.featuredImages);
      }

      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImages: file && file.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file =
        data.image[0] && (await appwriteServices.uploadFile(data.image[0]));

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
    } else return "";
  }, []);

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
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row bg-gray-900 text-white p-4 rounded-lg shadow-lg space-y-4 lg:space-y-0 lg:space-x-4"
    >
      <div className="flex flex-col w-full lg:w-1/2 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Title :
          </label>
          <Input
            id="title"
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Slug :
          </label>
          <Input
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
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Featured Image :
          </label>
          <Input
            id="image"
            type="file"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] appearance-none file:bg-gray-700 file:border-none file:mr-3 file:py-2 file:px-4 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-gray-600"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </div>
        {post && (
          <div>
            <img
              src={appwriteServices.getFilePreview(post.featuredImages)}
              alt={post.title}
              className="rounded-lg shadow-md w-full"
            />
          </div>
        )}
        <div>
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
          className={`w-full py-2 text-black font-medium rounded-lg shadow-md transition-colors duration-300 ${
            post
              ? "bg-green-500 hover:bg-green-400"
              : "bg-blue-500 hover:bg-blue-400"
          } `}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
      <div className="w-full lg:w-1/2">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="mb-4 border border-gray-700 bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] h-full"
        />
      </div>
    </form>
  );
}

export default PostForm;
