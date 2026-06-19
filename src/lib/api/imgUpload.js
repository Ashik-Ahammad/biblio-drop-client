export const imageUpload = async (imageFile) => {
  if (!imageFile || imageFile.size === 0) return null;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error("Image upload failed from imgBB");
    }
  } catch (error) {
    console.error("Image Upload Error:", error);
    throw error;
  }
};