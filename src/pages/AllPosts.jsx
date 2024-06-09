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
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length === 0 ?  (
            <h1 className="w-full text-center text-2xl font-bold hover:text-gray-500">
              No post...
            </h1>
          ): (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
