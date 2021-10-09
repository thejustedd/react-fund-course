import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Loader } from 'semantic-ui-react';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';

function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isPostLoading, postError] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id)
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста с ID = {params.id}</h1>
      {isPostLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Комментарии</h1>
      {isCommentsLoading
        ? <Loader />
        : <div>
          {comments.map(comment =>
            <div style={{ marginTop: 15 }} key={comment.id}>
              <h5>{comment.email}}</h5>
              <div>{comment.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default PostIdPage
