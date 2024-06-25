import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteServices from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteServices.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteServices.deleteFile(post.featuredImages);
        navigate("/");
      }
    });
  };

  return (
    post && (
      <div className="py-4 px-2 sm:px-4">
        <Container>
          <div className="w-full flex flex-col items-center mb-4 relative border rounded-xl p-2 sm:p-4">
            <img
              src={appwriteServices.getFilePreview(post.featuredImages)}
              alt={post.title}
              className="rounded-xl w-full object-cover max-h-96"
            />
            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="text-[5vw] sm:text-base px-2 py-1"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={deletePost}
                  className="text-[5vw] sm:text-base px-2 py-1"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-center">
              {post.title}
            </h1>
          </div>
          <div className="browser-css w-full text-sm sm:text-base leading-relaxed">
            {parse(post.content)}
          </div>
        </Container>
      </div>
    )
  );
}
