import { axiosInstance } from ".."

const getAllCategories = async () => {
    let res = [];
    try {
        res = await axiosInstance.get(`category/get/all`);
    } catch(err) {
        console.log(`rj_ getAllCategories - err - ${err}`);
    }

    return res.data.data;
}

export {
    getAllCategories
}