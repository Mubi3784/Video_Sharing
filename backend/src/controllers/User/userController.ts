import User from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import { AuthenticatedRequest, AuthenticatedRequestHandler } from "../../config/passportJwtStrategy";


export const getUserDetails: AuthenticatedRequestHandler = async (req, res) => {
    try {
        if (req.user instanceof User) {
            const userId = req.user._id;
            if (!userId) {
                return sendResponse(res, 404, false, "Please SignUp to continue");
            }
            const user = await User.findById(userId).select("-password");
            if (!user) {
                return sendResponse(res, 400, false, "User not found");
            }
            sendResponse(res, 200, true, "User details found ", {
                user: {
                    _id: user.id,
                    email: user.email,
                    name: user.name,
                    uploadCount: user.uploadCount,
                    downloadCount: user.downloadCount,
                }
            })
        }
    } catch (error) {
        console.error(`error Occur ${error}`)
        sendResponse(res, 500, false, "Some issues in backend")
    }
}

export const updateUser: AuthenticatedRequestHandler = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name) {
            return sendResponse(res, 400, false, "Name is required");
        }
        if (req.user instanceof User) {
            const userId = req.user._id;
            if (!userId) {
                return sendResponse(res, 400, false, " User is not found");
            }
            const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
            if (!user) {
                return sendResponse(res, 400, false, 'User not found ');

            }
            sendResponse(res, 200, true, "successfully update the user", { name, email })


        }

    } catch (error) {
        console.log(` error in updating user ${error}`);
        sendResponse(res, 500, false, "internal server error ");
    }
}