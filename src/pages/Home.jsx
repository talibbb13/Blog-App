import { useEffect, useState } from "react";
import appwriteServices from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ddd
    appwriteServices.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 mt-8 text-center bg-[#1e1e1e] text-[#c1e8ff] shadow-md rounded-lg">
        <Container>
          <div className="flex justify-center items-center h-full">
            <div className="p-4">
              <h1 className="text-3xl font-bold text-gray-500">
                No Post loaded
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-16 bg-[#1e1e1e] text-[#c1e8ff]">
        <Container>
          <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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
