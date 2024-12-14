import Head from "next/head";

export default function MarkupSchema({ path, post, }: { path: string, post?: any, }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post?.title || "Hướng dẫn xây dựng nhà phố hiện đại",
    "image": [
      post?.image || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      post?.thumbnail || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    "author": {
      "@type": "Person",
      "name": post?.author?.name || "Lê Hoàng Vũ"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Công ty Xây dựng ArtSunday",
      "logo": {
        "@type": "ImageObject",
        "url": post?.thumbnail || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      }
    },
    "datePublished": "2024-12-01",
    "dateModified": "2024-12-08",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cococstudio.com/${path}`
    },
    "articleBody": post?.description || "Bài viết mô tả các bước xây dựng nhà phố từ khâu thiết kế đến hoàn thiện nội thất.",
    "description": post?.description || "Hướng dẫn chi tiết các bước xây dựng nhà phố từ thiết kế đến hoàn thiện."
  }

  return (
    <Head>
      <title>{post?.title || "Hướng dẫn xây dựng nhà phố hiện đại"}</title>
      <meta name="description" content={post?.description || "Hướng dẫn chi tiết các bước xây dựng nhà phố từ thiết kế đến hoàn thiện."} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
