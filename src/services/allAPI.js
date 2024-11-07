
const { BASE_URL } = require("./baseUrl")
const { commonAPI } = require("./commonAPI")

//register api
 export const registerAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

//login
export const loginAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//add project
export const uploadPropertyAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${BASE_URL}/property/add`,reqBody,reqHeader)
}

//all property
export const allPropertyAPI = async (searchKey,reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/property/all?search=${searchKey}`,"",reqHeader)
}

//userproperty
export const userPropertyAPI = async (reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/user/all-property`,"",reqHeader)
}

//edit property
export const editPropertyAPI = async (propertyId,reqBody,reqHeader) => {
    return await commonAPI("PUT",`${BASE_URL}/property/edit/${propertyId}`,reqBody,reqHeader)
}

//delete property
export const deletePropertyAPI = async(propertyId,reqHeader) => {
    return await commonAPI("DELETE",`${BASE_URL}/property/remove/${propertyId}`,{},reqHeader)

}

//add to whishlist
export const AddToWishlistAPI = async (property_id,reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/wishlist/add/${property_id}`, {},reqHeader)
}

//userwishlistproperties
export const WishlistPropertyAPI = async (reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/user/all-wishlist`,"",reqHeader)
}

//cancel property
export const RemoveFromWishlistAPI = async(wishlist_id,reqHeader) => {
    return await commonAPI("DELETE",`${BASE_URL}/wishlist/remove/${wishlist_id}`,{},reqHeader)

}

//Book from wishlist
export const BookFromWishlistAPI = async (wishlist_id,reqBody, reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/booking/add/${wishlist_id}`, reqBody, reqHeader);
};



//Booking
export const BookingAPI = async (property_id,reqBody,reqHeader) => {
    return await commonAPI("POST",`${BASE_URL}/booking/add/${property_id}`,reqBody,reqHeader)
}
//userBookedproperty
export const userBookedPropertyAPI = async (reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/user/all-booking`,"",reqHeader)
}

//cancel property
export const cancelBookingAPI = async(booking_id,reqHeader) => {
    return await commonAPI("DELETE",`${BASE_URL}/booking/remove/${booking_id}`,{},reqHeader)

}

