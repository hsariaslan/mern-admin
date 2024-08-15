import * as Errors from "../../errors";
import IPermission from "../../interfaces/permission";
import PermissionModel from "../../models/role";

export default async ({name, slug}: IPermission): Promise<void> => {
    if (!name || !slug) {
        throw Errors.missingParam();
    }

    const existingPermission: IPermission | null = await PermissionModel.findOne({ slug: slug }).exec();

    if (existingPermission) {
        throw Errors.roleAlreadyExists();
    }
}