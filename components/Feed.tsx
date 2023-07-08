"use client";
import { useState, useEffect } from "react";

import PromptCard, { PostType } from "./PromptCard";
type PromptCardListProps = {
  data: PostType[];
  handleTagClick: () => void;
};

const PromptCardList: React.FC<PromptCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

type Props = {};

const Feed: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<[]>([]);

  const handleSearchChange = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);
  // };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
