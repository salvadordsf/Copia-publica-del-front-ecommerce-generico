interface CloudinaryLoaderProps {
  src: string;
  width: number;
  quality?: number | string;
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryLoaderProps) {
  const cloudName = "da30ywtkd";

  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
  ].join(",");

  const publicId = src.includes("/upload/")
    ? src.replace(/.*\/upload\/(?:v\d+\/)?/, "")
    : src;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${publicId}`;
}
