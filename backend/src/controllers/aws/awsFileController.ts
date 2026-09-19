import { RequestHandler } from "express";
import dotenv from "dotenv";
import { sendResponse } from "../../utils/sendResponse";
import path from "path";
import User from "../../model/userSchema";
import Video from "../../model/videoSchema";
import { send } from "process";

export const uploadFile: RequestHandler = async (req, res) => {
  try {
    if (req.files && (req.files as any).video) {
      let { title, description } = req.body;
      let baseName;
      const videoFile = (req.files as any).video[0];
      const thumbNailFile = (req.files as any).thumbnail
        ? (req.files as any).thumbnail[0]
        : null;

      if (!title) {
        const extension = path.extname(videoFile.originalname);
        baseName = path.basename(videoFile.originalname, extension);
      }
      if (req.user instanceof User) {
        const newVideo: any = await Video.create({
          title: title || baseName,
          description: description ? description : undefined,
          uploadedBy: req.user._id as any,
          videoUrl: videoFile.path,
          cloudinaryId: videoFile.filename,
          thumbNail: thumbNailFile ? thumbNailFile.path : undefined,
        });
        const user: any = await User.findById(req.user._id);
        if (user) {
          user.uploadCount += 1;
          await user.save();
        }

        return sendResponse(res, 200, true, "Video Uploaded successfully", {
          video: {
            _id: (newVideo as any)._id,
            videoUrl: (newVideo as any).videoUrl,
            title: newVideo.title,
            description: (newVideo as any).description,
            thumbNail: (newVideo as any).thumbNail,
            uploadedBy: { email: user?.email },
          },
        });
      }
      return sendResponse(
        res,
        400,
        false,
        "Not authorized to upload the video ",
      );
    }
    return sendResponse(res, 400, false, "No video file provided");
  } catch (error) {
    console.error(`Error in uploading video ${error}`);
    return sendResponse(res, 500, false, "internal server issue");
  }
};

// read all videos
export const fetechVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "email");
    sendResponse(res, 200, true, "Fetched videos successfully ", { videos });
  } catch (error) {
    console.error(` Error in fetching videos ${error}`);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

//  read a single video
export const fetchSingleVideo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, 404, false, "id not found");
    const video = await Video.findById(id).populate("uploadedBy", "email");

    if (!video) return sendResponse(res, 404, false, "Video not found ");
    sendResponse(res, 200, true, "Found Your video", { video });
  } catch (error) {
    console.error(`Error in fetching single video ${error}`);
    sendResponse(res, 500, false, "Internal server error");
  }
};

// download video

export const downloadVideo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    if (!id) return sendResponse(res, 404, false, "id not found ");

    const video = await Video.findById(id);
    if (!video) return sendResponse(res, 404, false, "Video not found ");

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.downloadCount += 1;
        await user.save();
      }
    }
  } catch (error) {
    console.error(`Error in downloading video ${error}`);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

//update video
export const updateVideo: RequestHandler = async (req, res) => {
  try {
  const {id}=req.params;
  if(!id) return sendResponse(res ,404 ,false,"Id not found");

  const video = await Video.findById(id);
  if(!video) return sendResponse(res , 404 , false, "Video not found ");

  Object.assign(video,req.body);

  if ( req.files &&(req.files as any ).video ){
    const videoFile=(req.files as any ).video[0];
    video.videoUrl= videoFile.path;
    video.cloudinaryId= videoFile.filename;
  }
  if(req.files && (req.files as any ).thumbnail){
    const thumbNailFile =(req.files as any).thumbnail[0];
    video.thumbNail= thumbNailFile.path;
  }
  await video.save();
  sendResponse(res, 200, true, "Video updated successfully ", {video});



  } catch (error) {
    console.error(`Error in updating video ${error}`);
    sendResponse(res, 500, false, "Internal server error");
  }
};


//videos for logged-in user

export const fetchVideosForLoggedInUser: RequestHandler= async (req , res)=>{
    try {
        if(req.user instanceof User){
            const userId= req.user._id;
            if(!userId) return sendResponse(res, 404 ,false, "User id is not found ")
          
        const videos = await Video.find({ uploadedBy: userId as any }).populate(
          "uploadedBy",
          "email",
        );
        return sendResponse(res,200, true, "found your video ",{videos})       

        }
        
    } catch (error) {
        console.error(`Error in fetching videos for logged in users ${error}`);
    return sendResponse(res, 500, false, "Internal server error");
    }
}