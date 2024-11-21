import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /posts when the homepage is accessed
    router.push("/posts");
  }, [router]);

  return null;
};

export default Home;
