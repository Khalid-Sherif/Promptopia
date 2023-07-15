"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { User } from "@app/profile/page";

export interface Post {
  prompt: string;
  tag: string;
}

// type User = {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
// };

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: (session?.user as User).id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
