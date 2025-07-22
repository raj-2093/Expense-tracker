import { axiosInstance } from ".."
import { getExpenseById } from "../expense/expense.api"

/**
 * Login user API call
 * @param {string} userId 
 * @param {string} password 
 */
const login = async (userId, password)=>{
    // Validate userId, password
    let res = ""
    try {
        res = await axiosInstance.post("user/login", {
            email: userId,
            password
        })

    } catch (err) {
        console.log(`rj_ login - err - ${err}`)
    }
    return res;
}

/**
 * Register User API call
 * @param {string} fullName 
 * @param {string} email 
 * @param {string} userName 
 * @param {string} password 
 * @returns 
 */
const registerUser = async (fullName, email, userName, password) => {
    // validate fullName, email, userName, password
    let res = ""
    try {
        res = await axiosInstance.post("user/register", {
            fullName, email, userName, password
        })
    } catch (err) {
        console.log(`rj_ registerUser - err - ${err}`)
    }
    return res;
}

export {
    login
}