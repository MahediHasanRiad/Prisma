import { prisma } from "../lib/prisma.js";
export const CreateController = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email)
            throw new Error("email required !!");
        if (!name)
            throw new Error("name required !!");
        const createUser = await prisma.user.create({
            data: {
                email,
                name
            }
        });
        res.status(200).json({ createUser });
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=create.controller.js.map