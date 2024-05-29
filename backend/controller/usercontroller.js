import User from '../models/User.js'

export const createUser = async (req,res)=>{
    try {
        const { name, password } = req.body;
        const newUser = new User({ name, password });
        await newUser.save();
        res.status(201).json({newUser,success:true});
    } catch (error) {
        return res.status(400).json({ message: error.message,success:false });
    }
}

export const Login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const oldUser = await User.findOne({ name });
        console.log(name,password)
        if (!oldUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (oldUser.password === password) {
            return res.status(200).json({ success: true, message: "User found" , oldUser});
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
        // console.log( name, password )
        // return res.status(200)
    } catch (error) {
        console.error("Error during login usercontroller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}