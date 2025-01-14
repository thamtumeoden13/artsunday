import Head from "next/head";

export default function MarkupSchema({ path, post, }: { path: string, post?: any, }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post?.title || "Cốc Cốc Studio - Dịch vụ chụp ảnh sản phẩm chuyên nghiệp ở Bình Dương",
    "image": [
      post?.image || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      post?.thumbnail || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    "author": {
      "@type": "Person",
      "name": post?.author?.name || "Phạm Trung Hiếu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CÔNG TY TNHH MTV TRUYỀN THÔNG QUẢNG CÁO COCOC STUDIO",
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
    "articleBody": post?.subtitle || "Chụp Ảnh Sản Phẩm",
    "description": post?.description || "Hiện nay thị trường online đang phát triển mạnh và đó sẽ là xu hướng bán hàng trong những năm tiếp theo tới đây. Vì thế để kênh bán hàng của mình được hiệu quả và tạo độ tin cậy cho khách hàng. Củ Lạc Studio ra mắt dịch vụ chụp hình sản phẩm phục vụ thị trường ở Tp.HCM và lân cận.Củ Lạc Studio cung cấp các gói chụp sản phẩm cho những shop bán hàng online, công ty, doanh nghiệp. Đặc biệt, ngoài việc chụp ảnh, Củ Lạc Studio còn cung cấp dịch vụ thiết kế sản phẩm nhận diện thương hiệu dành cho bạn. Đóng mộc bản quyền để tăng niềm tin đối với khách hàng."
  }

  return (
    <Head>
      <title>{post?.title || "Chụp Ảnh Sản Phẩm"}</title>
      <meta name="description" content={post?.description || "Hướng dẫn chụp ảnh sản phẩm"} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
