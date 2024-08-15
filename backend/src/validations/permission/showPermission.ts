import PermissionModel from "../../models/permission";
import IPermission from "../../interfaces/permission";
import * as Errors from "../../errors";

export default async (slug: string): Promise<IPermission | null> => {
    if (!slug) {
        throw Errors.missingParam();
    }

    const permission: IPermission | null = await PermissionModel.findOne({ slug: slug }).exec();

    if (!permission) {
        throw Errors.permissionNotFound();
    }

    return permission;
}