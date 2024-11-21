import PostCard from "@/components/PostCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { getBlogPosts } from "@/lib/posts";
import { GetStaticProps } from "next";
import { calculatePagination } from "@/utils/pagination";
import { Post } from "@/models/post";
import FetchingError from "@/components/FetchingError";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts: Post[] = await getBlogPosts();
    return {
      props: { posts },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        error: "Failed to fetch posts. Please try again later.",
      },
    };
  }
};

const PostsPage = ({
  posts,
  error,
}: {
  posts: Post[] | null;
  error?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const { currentPosts, totalPages } = calculatePagination(
    posts || [],
    postsPerPage,
    currentPage
  );

  const handlePostsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPostsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) {
    return <FetchingError error={error} />;
  }

  return (
    <div className="container mx-auto p-4 md:px-24 lg:px-44 xl:px-44 mt-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0.1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Mapping posts array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
      </motion.div>

      {/* Pagination Controls */}
      <div className="mb-4">
        <label
          htmlFor="postsPerPage"
          className="mr-2 text-gray-800 dark:text-gray-200"
        >
          Posts per page:
        </label>
        <select
          id="postsPerPage"
          value={postsPerPage}
          onChange={handlePostsPerPageChange}
          className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center mt-4 gap-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            } transform transition-transform duration-300 hover:scale-110 hover:shadow-lg`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
