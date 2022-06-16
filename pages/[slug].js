import React from "react"
import PostDetail from "../src/components/features/post/PostDetail"
import {
  postDetailAPI,
  fetchPosts,
} from "../src/components/features/post/postAPI"
import Head from "next/head"

export default function Post({slug, detail}) {
  return (
    <>
      <Head>
        <title>{detail?.title}</title>
        <meta name="title" content={detail?.title} />
        <meta name="description" content={detail?.synopsis} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={detail?.title} key="title" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SITE_URL}
          key="url"
        />
        <meta property="og:type" content="website" key="title" />
        <meta
          property="og:description"
          content={detail?.synopsis}
          key="description"
        />
        <meta property="og:image" content={detail?.coverImage} key="image" />

        <meta name="twitter:card" content="summary" key="summary" />
        <meta name="twitter:title" content={detail?.title} key="title" />
        <meta
          name="twitter:description"
          content={detail?.synopsis}
          key="description"
        />
        <meta
          name="twitter:url"
          content={process.env.NEXT_PUBLIC_SITE_URL}
          key="url"
        />
        <meta name="twitter:image" content={detail?.coverImage} key="image" />
      </Head>
      <PostDetail slug={slug} detail={detail} />
    </>
  )
}

export async function getStaticProps({params}) {
  const response = await postDetailAPI(params.slug)
  return {
    props: {
      slug: params.slug,
      detail: response,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await fetchPosts()
  return {
    paths: allPosts?.map(post => `/${post.slug}`) || [],
    fallback: false,
  }
}
