import React from "react"
import PostDetail from "../src/components/features/post/PostDetail"
import { postDetailAPI, fetchPosts } from "../src/components/features/post/postAPI"

export default function Post({slug, detail}) {
  return <PostDetail slug={slug} detail={detail}/>
}

export async function getStaticProps({params}) {
  const response = await postDetailAPI(params.slug)
  return {
    props: {
      slug: params.slug,
      detail: response
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await fetchPosts()
  return {
    paths: allPosts?.map((post) => `/${post.slug}`) || [],
    fallback: false,
  }
}
