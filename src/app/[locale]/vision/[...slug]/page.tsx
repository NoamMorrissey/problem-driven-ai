import { ContentPageRenderer } from "@/components/content/content-page";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ContentPageRenderer section="vision" slug={slug} />;
}
