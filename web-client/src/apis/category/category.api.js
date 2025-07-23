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

const createCategory = async (title, description) => {
    let res = [];
    try {
        res = await axiosInstance.post(`category/create`, {
            title, description
        });
    } catch(err) {
        console.log(`rj_ createCategory - err - ${err}`);
    }

    return res;
}

const editCategory = async (title, categoryId, description) => {
    let res = [];
    try {
        res = await axiosInstance.patch(`category/update`, {
            title, categoryId, description
        });
    } catch(err) {
        console.log(`rj_ getAllCategories - err - ${err}`);
    }

    return res;
}

const deleteCategory = async (categoryId) => {
    let res = [];
    try {
        res = await axiosInstance.delete(`category/delete?categoryId=${categoryId}`);
    } catch(err) {
        console.log(`rj_ getAllCategories - err - ${err}`);
    }

    return res;
}



export {
    getAllCategories,
    editCategory,
    deleteCategory
}