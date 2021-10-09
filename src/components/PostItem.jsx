import React from 'react'
import { useHistory } from 'react-router'
import MyButton from './UI/button/MyButton'

function PostItem({ number, post, remove }) {
  const router = useHistory();

  return (
    <div className="post">
      <div className="post__content">
        <strong>{post.id}. {post.title}</strong>
        <div>
          {post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={e => router.push(`/posts/${post.id}`)}>Открыть</MyButton>
        <MyButton onClick={e => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  )
}

export default PostItem
