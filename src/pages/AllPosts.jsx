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
    <div className="w-full py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-[#c1e8ff]">
      <Container>
        <div className="flex flex-wrap justify-center gap-8">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-gray-300 mb-4">
                No posts loaded...
              </h1>
              <p className="text-lg text-gray-400">
                It seems there are no posts available at the moment. Please
                check back later.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition duration-300 ease-in-out transform hover:scale-105"
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
