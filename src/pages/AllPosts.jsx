import { useState, useEffect } from "react";
import { PostCard, Container } from "../components";
import appwriteServices from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteServices.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-16 bg-[#1e1e1e] text-[#c1e8ff]">
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.length === 0 ? (
            <h1 className="w-full text-center text-3xl font-bold text-gray-500">
              No post loaded...
            </h1>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
