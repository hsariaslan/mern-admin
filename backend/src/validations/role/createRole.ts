import * as Errors from "../../errors";
import IRole from "../../interfaces/role";
import RoleModel from "../../models/role";

export default async ({name, slug, order, permissions}: IRole): Promise<void> => {
    if (!name || !slug || !order || !permissions) {
        throw Errors.missingParam();
    }

    const existingRole: IRole | null = await RoleModel.findOne({ slug: slug }).exec();

    if (existingRole) {
        throw Errors.roleAlreadyExists();
    }
}