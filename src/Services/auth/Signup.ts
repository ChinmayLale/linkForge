import { BASE_URL } from "@/Constants/Endpoints";

const SignupWithGoogle = async({email,username,name,pfp}:{email:string,username:string,name:string,pfp:string}):Promise<boolean> => {
    try {
        if(!email || !username || !name || !pfp) {
            throw new Error("All fields are required");
        }

        const response =await axios.post(`${BASE_URL}/auth/signup`,{
            email,
            username,
            name,
            pfp
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status === 201) {
            console.log("Signup successful:", response.data);
            return response.data !== null;
        } else {
            throw new Error(`Signup failed with status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error during Google signup:", error);
        throw error;
    }
}


export {SignupWithGoogle}