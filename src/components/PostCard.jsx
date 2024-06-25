import appwriteServices from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImages }) {
  return (
      <div className="postCards w-full sm:w-64 bg-zinc-900 text-white rounded-xl shadow-md overflow-hidden">
        <img
          src={appwriteServices.getFilePreview(featuredImages)}
          className="w-full h-52 object-cover"
          alt={title}
        />
        <div className="p-4">
          <h2 className="text-sm sm:text-lg font-semibold mb-4">{title}</h2>
          <Link
            to={`/post/${$id}`}
            className="inline-block px-2 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 hover:text-black transition-colors duration-300"
            style={{ maxWidth: "fit-content" }}
          >
            <span className="text-xs md:text-sm">Read more...</span>
          </Link>
        </div>
      </div>
  );
}

export default PostCard;
