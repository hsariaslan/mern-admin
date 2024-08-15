import PermissionModel from "../../models/permission";
import IPermission from "../../interfaces/permission";
import * as Errors from "../../errors";

export default async (slugParam: string, {name, slug}: IPermission): Promise<IPermission | null> => {
    if (!slugParam || !name || !slug) {
        throw Errors.missingParam();
    }

    const permission: IPermission | null = await PermissionModel.findOne({ slug: slugParam }).exec();

    if (!permission) {
        throw Errors.permissionNotFound();
    }

    if (name !== permission.name) {
        const existingName: IPermission | null = await PermissionModel.findOne({ _id: {$ne: permission._id}, name: name }).exec();

        if (existingName) {
            throw Errors.permissionAlreadyExists();
        }
    }

    if (slug !== permission.slug) {
        const existingSlug: IPermission | null = await PermissionModel.findOne({ _id: {$ne: permission._id}, slug: slug }).exec();

        if (existingSlug) {
            throw Errors.permissionAlreadyExists();
        }
    }

    return await PermissionModel.findOne({ _id: permission._id }).exec();
}