import { useEffect, useState } from "react";
import appwriteServices from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteServices.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-[#c1e8ff] shadow-md rounded-lg">
        <Container>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="p-4">
              <h1 className="text-3xl font-bold text-gray-300">
                No Post Loaded
              </h1>
            </div>
            <div className="">
              <p className="text-lg text-gray-400">
                It seems there are no posts available at the moment. Please
                check back later.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-[#c1e8ff]">
        <Container>
          <div className="flex flex-wrap justify-between">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="py-4  transition-transform transform hover:scale-105"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
