import React, { useEffect, useRef, useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import PostsFilter from "../components/PostsFilter";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import '../styles/Posts.css';
import { usePosts } from '../hooks/usePosts.js';
import PostService from "../API/PostService";
import SemanticLoader from "../components/UI/loader/SemanticLoader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => { setPage(page + 1) });
  useEffect(() => fetchPosts(limit, page), [limit, page]);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  function changePage(page) {
    setPage(page);
  }

  function changeLimit(limit) {
    if (~limit) setPage(1); //! Не доработанное решение
    setLimit(limit);
  }

  return (
    <div className="Posts">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostsFilter filter={filter} setFilter={setFilter} />
      <MySelect
        style={{ marginTop: 5 }}
        value={limit}
        onChange={changeLimit}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {postsError &&
        <h1>Произошла ошибка {postsError}</h1>
      }
      {isPostsLoading &&
        <div style={{ position: 'relative', marginTop: 50 }}><SemanticLoader /></div>
      }
      <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Посты про JS" />
      <div style={{ height: 20, backgroundColor: 'red' }} ref={lastElement} />
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
