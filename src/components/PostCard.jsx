// ddd
import React from "react";
import appwriteServices from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImages }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteServices.getFilePreview(featuredImages)}
            className="rounded-xl max-h-52 w-full object-cover bg-center"
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold text-black">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
