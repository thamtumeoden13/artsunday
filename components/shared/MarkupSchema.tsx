import MarkdownIt from "markdown-it";
import Head from "next/head";

export default function MarkupSchema({
  path,
  post,
}: {
  path: string;
  post?: any;
}) {
  const registerImage: { src: string; alt: string }[] = [];

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options));

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    console.log("Image Token generateMetadata:", token.attrs);
    const srcIndex = token.attrIndex("src");
    const src = token.attrs?.[srcIndex][1] || "";
    const altIndex = token.attrIndex("alt");
    console.log("Image Alt Index:", altIndex);
    const alt = token.attrs?.[altIndex]?.[1];
    const finalAlt =
      !alt || alt.trim().toLowerCase() === "image" ? token.content : alt;

    // Register this image with the gallery context
    registerImage.push({ src, alt: finalAlt });

    // Render the image with the default renderer
    const defaultHtml = defaultRender(tokens, idx, options, env, self);

    // Wrap the image in a div with a click handler
    return `<div class="inline-block cursor-pointer" data-gallery-image="${src}">${defaultHtml}</div>`;
  };

  // Parse the pitch markdown to extract images
  if (post?.pitch) {
    md.render(post.pitch);
  }

  // Remove duplicate images (optional)
  const uniqueImages = Array.from(
    new Map(registerImage.map((img) => [img.src, img])).values()
  );

  const imageSchema = uniqueImages.map((img) => ({
    "@type": "ImageObject",
    contentUrl: img.src,
    description: img.alt,
    name: img.alt,
  }));

  if (post?.image) {
    imageSchema.push({
      "@type": "ImageObject",
      contentUrl: post.image,
      description: post.title || "Art Sunday",
      name: post.title || "Art Sunday",
    });
  }
  if (post?.thumbnail) {
    imageSchema.push({
      "@type": "ImageObject",
      contentUrl: post.thumbnail,
      description: post.title || "Art Sunday",
      name: post.title || "Art Sunday",
    });
  }


  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title || "Kiến Trúc, Xây Dựng Bình Dương | ART SUNDAY",
    image: imageSchema,
    author: {
      "@type": "Person",
      name: "Vũ Văn Vinh",
    },
    publisher: {
      "@type": "Organization",
      name: "CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG ART SUNDAY",
      logo: {
        "@type": "ImageObject",
        url:
          post?.thumbnail ||
          "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    datePublished: "2024-12-01",
    dateModified: "2024-12-08",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://artsunday.vn/${path}`,
    },
    articleBody:
      post?.subtitle || "Kiến Trúc, Xây Dựng Bình Dương | ART SUNDAY",
    description:
      post?.description ||
      "Thiết Kế Và Thi Công Kiến Trúc: Nhà Phố, Biệt Thự, Khách Sạn, Nhà Thờ, Nhà Giáo Lý Và Nội Thất Chuyên Nghiệp",
  };

  console.log("Article Schema:", articleSchema);

  return (
    <Head>
      <title>
        {post?.title || "Kiến Trúc, Xây Dựng Bình Dương | ART SUNDAY"}
      </title>
      <meta
        name="description"
        content={
          post?.description ||
          "Thiết Kế Và Thi Công Kiến Trúc: Nhà Phố, Biệt Thự, Khách Sạn, Nhà Thờ, Nhà Giáo Lý Và Nội Thất Chuyên Nghiệp."
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
