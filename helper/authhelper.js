import bcypt from "bcrypt"

export const hashpassword = async (password) => {
    try {
        const saltround = 5
        const hashedPassword = await bcypt.hash(password , saltround)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password , hashedPassword) => {
    return bcypt.compare( password , hashedPassword )
}