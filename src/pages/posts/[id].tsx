import { getBlogPost, getBlogPosts } from "@/lib/posts";
import { Post } from "@/models/post";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FetchingError from "@/components/FetchingError";

export async function getStaticPaths() {
  const posts: Post[] = await getBlogPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const post: Post = await getBlogPost(params.id);
    return {
      props: { post },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        error: "Failed to fetch posts. Please try again later.",
      },
    };
  }
}

const PostDetail = ({ post, error }: { post: Post | null; error?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%" });

  if (error) {
    return <FetchingError error={error} />;
  }
  if (!post) {
    return <FetchingError error={`No post found!`} />;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className=" bg-white dark:bg-gray-900 rounded-lg px-10">
        <div className="flex items-center justify-center">
          <div className="w-full sm:w-96 md:w-8/12 lg:w-8/12 py-6">
            <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4   text-gray-600 dark:text-gray-300">
              <span>Home / </span>
              <Link href={`/posts`}>
                <span className="underline">posts </span>
              </Link>
              <span>/ {post.id}</span>
            </p>
            <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-gray-100 mt-4">
              {post.title}
            </h2>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-300 mt-7">
              {post.body}
            </p>
            <p className="font-semibold  text-sm lg:leading-6 leading-5 mt-6 text-gray-800 dark:text-gray-100">
              Date: {new Date().toLocaleDateString()}
            </p>
            <hr className="bg-gray-200 dark:bg-gray-600 w-full my-2" />
            <Link href={`/posts`}>
              <button className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 rounded-md text-white bg-gray-700 w-20 py-4 lg:mt-12 mt-6">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
