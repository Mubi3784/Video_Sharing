import React, { useState } from "react";
import SideBar from "../../Components/SideBar";
import { toast } from "sonner";
import backendApi from "../../Api/backendApi";
import { userConfig } from "../../Components/customHooks/userConfigHook";

const UploadVideo: React.FC = () => {

    // interface
    interface FormErrors {
        video?: string;
        title?: string;
    }
    interface UploadVideoResponse {
        success: boolean;
        message: string;
    }

    //form fields

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");


    // ui state
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    const configWithJWT = userConfig();

    // validate function

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!videoFile) {
            newErrors.video = "Please selext a video file to upload";
        }
        if (!title.trim()) {
            newErrors.title = "Title is required"
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // handleSubmit function

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("video", videoFile as File);
            if (thumbnailFile) {
                formData.append("thumbnail", thumbnailFile);

            }
            formData.append("title", title);
            if (description.trim()) {
                formData.append("description", description);
            }

            const { data } = await backendApi.post<UploadVideoResponse>("api/v1/aws/uploadFile",
                formData,
                {
                    headers: {
                        ...configWithJWT.headers,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                setVideoFile(null);
                setThumbnailFile(null);
                setTitle("");
                setDescription("");
                setErrors({});
            } else {
                toast.warning(data.message)
            }



        } catch (error) {
            toast.error("something went wrong while uploading the video ")
        }
        finally {
            setLoading(false);
        }
    }

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setVideoFile(file);
    }
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setThumbnailFile(file);
    }
    return (

        <div className="min-h-screen w-full bg-gray-50">
            <SideBar />
            <main className="flex-1 z-10 md:ml-80 min-h-screen pt-4 text-center">
                <section className="bg-white border border-gray-500 mt-12 rounded-2xl mx-2 p-6 shadow-sm  max-w-full">
                    <h1 className="mt-4 text-2xl font-bold">Upload Video</h1>
                    <p className="text-sm text-gray-500 mt-1 mb-6">Share your video with the World</p>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                        {/*video file   */}
                        <div className=" flex  flex-col pl-4 w-full">
                            <label htmlFor="video" className="font-bold mb-1 text-lg">Video File <span className="text-red-500">*</span></label>
                            <input type="file"
                                id="video"
                                name="video"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="text-sm border rounded-xl pl-3 py-2 outline-none border-gray-200 focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                            {videoFile && (
                                <p className="text-xs text-gray-500 mt-1"> Selected: {videoFile.name}</p>
                            )}
                            {errors.video && (
                                <p className="text-xs text-gray-500 mt-1">{errors.video}</p>
                            )}
                        </div>
                        {/* thumbnail  */}
                        <div className="flex flex-col pl-4 w-full">
                            <label htmlFor="thumbnail" className="font-bold mb-1 text-lg">Thumbnail <span className="text-gray-400 text-sm">(optional)</span></label>
                            <input type="file"
                                id="thumbnail"
                                name="thumbnail"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                className="text-sm border rounded-xl pl-3 py-2 outline-none border-gray-200 
                            focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                            {thumbnailFile && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Selected:{thumbnailFile.name}
                                </p>
                            )}
                        </div>

                        {/* discription  */}
                        <div className="flex flex-col pl-4 w-full">
                            <label htmlFor="description" className="font-bold mb-1 text-lg">Description <span className="text-gray-400 text-sm">(optional)</span></label>

                            <textarea name="description" id="description"
                                placeholder="Write a short description about your video"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-sm pl5 py-5 border rounded-xl outline-none border-gray-200 focus:ring-2 focus:ring-emerald-500 resize-none pl-3"
                            ></textarea>
                        </div>

                        {/* submit button */}
                        <div className="flex justify-end mt-2 pr-5"> <button type="submit"
                        disabled={loading}
                        className="font-mediumtext-white bg-blue-600 h-9 px-6 rounded-sm disabled:opacity-60">
                          {loading ? "Uploading... ": "Upload Video" } </button> </div>
                    </form>
                </section>
            </main>
        </div>


    )
}

export default UploadVideo;