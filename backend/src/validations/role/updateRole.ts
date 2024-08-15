import RoleModel from "../../models/role";
import IRole from "../../interfaces/role";
import * as Errors from "../../errors";

export default async (slugParam: string, {name, slug, order, permissions}: IRole): Promise<IRole | null> => {
    if (!slugParam || !name || !slug || !order || !permissions) {
        throw Errors.missingParam();
    }

    const role: IRole | null = await RoleModel.findOne({ slug: slugParam }).exec();

    if (!role) {
        throw Errors.roleNotFound();
    }

    if (name !== role.name) {
        const existingName: IRole | null = await RoleModel.findOne({ _id: {$ne: role._id}, name: name }).exec();

        if (existingName) {
            throw Errors.roleAlreadyExists();
        }
    }

    if (slug !== role.slug) {
        const existingSlug: IRole | null = await RoleModel.findOne({ _id: {$ne: role._id}, slug: slug }).exec();

        if (existingSlug) {
            throw Errors.roleAlreadyExists();
        }
    }

    return await RoleModel.findOne({ _id: role._id }).exec();
}