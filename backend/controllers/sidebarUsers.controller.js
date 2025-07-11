import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getSidebarUsers = asyncHandler(async (req, res) => {
    try {

        const loggedInUser = req.user._id
        const filteredUsers = await User.find({
            _id: {                      //this will fetch all the users except the loggedIn user 
                $ne: loggedInUser
            }
        }).select("-password")

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    filteredUsers,
                    "All users fetched successfully"
                )
            )

    } catch (error) {
        console.error(error.message)
        throw new ApiError(500, "Internal Server Error")
    }
})

export {
    getSidebarUsers
}
