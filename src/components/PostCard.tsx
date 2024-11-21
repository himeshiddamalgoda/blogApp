import { useRef } from "react";
import { getFirstTwoSentences, trimText } from "@/utils/text";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import { motion, useInView } from "framer-motion";
import { Post } from "@/models/post";

const PostCard: React.FC<Post> = ({ id, title, body }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex w-full items-center dark:bg-gray-950 justify-center">
        <div>
          <div className="max-w-xs h-64 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 px-4 py-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div>
              <Link href={`/posts/${id}`}>
                <h4 className="text-gray-800 dark:text-gray-100 font-bold underline mb-3">
                  {trimText(title, 50)}
                </h4>
              </Link>
              <p className="text-gray-800 dark:text-gray-100 text-sm py-2">
                {getFirstTwoSentences(body)}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-800">
                <p className="text-sm dark:text-gray-100">
                  {new Date().toLocaleDateString()}
                </p>
                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                  <Link href={`/posts/${id}`}>
                    <CgDetailsMore />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
