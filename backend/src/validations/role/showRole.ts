import RoleModel from "../../models/role";
import IRole from "../../interfaces/role";
import * as Errors from "../../errors";

export default async (slug: string): Promise<IRole | null> => {
    if (!slug) {
        throw Errors.missingParam();
    }

    const role: IRole | null = await RoleModel.findOne({ slug: slug }).exec();

    if (!role) {
        throw Errors.roleNotFound();
    }

    return role;
}