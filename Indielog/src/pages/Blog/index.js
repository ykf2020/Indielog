import { useState, useEffect } from "react";
import Post from "../../components/Post";
import {
  getTopics,
  getPostsAmount,
  getSeedPosts,
  getChangePagePosts,
} from "../../utils/firebase";
import { useLocation } from "react-router-dom";
import {
  BlogPageContainer,
  PostsContainer,
  TopicsContainer,
  Title,
  TopicsWrap,
  Topic,
  PostLink,
  PaginatorContainer,
  PageBtn,
} from "./BlogElements.js";

const Blog = () => {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get("topic");

  useEffect(() => {
    getTopics(setTopics);
  }, []);

  useEffect(() => {
    getPostsAmount(currentTopic, 5, setTotalPages);
    getSeedPosts(currentTopic, 5, setPosts);
    setCurrentPage(1);
  }, [currentTopic]);

  function nextPage() {
    if (currentPage === totalPages) return;
    const lastRefPlace = 5 * currentPage;
    getChangePagePosts(currentTopic, 5, setPosts, lastRefPlace);
    setCurrentPage(currentPage + 1);
  }
  function prevPage() {
    if (currentPage === 1) return;
    const lastRefPlace = 5 * (currentPage - 2);
    getChangePagePosts(currentTopic, 5, setPosts, lastRefPlace);
    setCurrentPage(currentPage - 1);
  }

  return (
    <BlogPageContainer>
      <TopicsContainer>
        <Title>分類</Title>
        <TopicsWrap>
          <Topic to="/blog" active={!currentTopic}>
            全部文章
          </Topic>
          {topics.map((topic) => {
            return (
              <Topic
                key={topic.id}
                to={`/blog?topic=${topic.name}`}
                active={currentTopic === topic.name}
              >
                {topic.name}
              </Topic>
            );
          })}
        </TopicsWrap>
      </TopicsContainer>
      <PostsContainer>
        {posts.map((post) => {
          return (
            <PostLink key={post.id} to={`/blogpost/${post.id}`}>
              <Post
                key={post.id}
                createdAt={post.createdAt
                  .toDate()
                  .toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                imageUrl={post.imageUrl}
                topic={post.topic}
                title={post.title}
              />
            </PostLink>
          );
        })}
        <PaginatorContainer>
          {totalPages > 1 && currentPage !== 1 && (
            <PageBtn onClick={prevPage}>＜</PageBtn>
          )}
          {totalPages > 1 && currentPage !== totalPages && (
            <PageBtn onClick={nextPage}>＞</PageBtn>
          )}
        </PaginatorContainer>
      </PostsContainer>
    </BlogPageContainer>
  );
};

export default Blog;
