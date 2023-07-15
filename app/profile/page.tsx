"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { PostType } from "@components/PromptCard";

export type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as User).id}/posts`
      );
      const data = await response.json();

      setPosts(data);
    };

    if ((session?.user as User).id) fetchPosts();
  }, []);

  const handleEdit = (post: PostType): void => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PostType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p: PostType) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {}
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
