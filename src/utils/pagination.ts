import { Post } from "@/models/post";


export const calculatePagination = (posts: Post[], postsPerPage: number, currentPage: number) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;   
  
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);   
  
  
    return { currentPosts, totalPages };
  };