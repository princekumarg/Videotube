import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //uplode to cloudnary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfull
        console.log("file is uploded on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the locally saved themoray file
        return null;
    }
};
const deleteFromCloudinary = async (filePath) => {
    try {
        if (!filePath) null;

        await cloudinary.uploader.destroy(
            filePath.split("/").pop().split(".")[0],
            (error) => {
                if (error) {
                    throw new APIError(404, error, "Image not found");
                }
            }
        );
    } catch (error) {
        console.log("error from cloudinay :", error);
    }
};

export { uploadOnCloudinary, deleteFromCloudinary }