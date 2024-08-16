import {NextFunction, RequestHandler} from "express";
import PermissionModel from "../models/permission";
import createPermissionValidation from "../validations/permission/createPermission";
import showPermissionValidation from "../validations/permission/showPermission";
import updatePermissionValidation from "../validations/permission/updatePermission";
import IPermission from "../interfaces/permission";
import * as Errors from "../errors";

export const index: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const userRoles: string[] | undefined = req.session.roles;
        let permissions: IPermission[];

        if (userRoles?.includes("admin")) {
            permissions = await PermissionModel.find().exec();
        } else {
            const userPermissions: string[] | undefined = req.session.permissions;
            permissions = await PermissionModel.find({slug: {"$in": userPermissions}}).exec();
        }

        res.status(200).json(permissions);
    } catch (error) {
        next(error);
    }
}

export const create: RequestHandler<unknown, unknown, IPermission, unknown> = async (req, res, next: NextFunction): Promise<void> => {
    try {
        await createPermissionValidation(req.body);

        const newPermission: IPermission = new PermissionModel({
            name: req.body.name,
            slug: req.body.slug
        });

        await newPermission.save();

        res.status(201).json(newPermission);
    } catch (error) {
        next(error);
    }
}

export const show: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const permission: IPermission | null = await showPermissionValidation(req.params.slug);

        res.status(200).json(permission);
    } catch (error) {
        next(error);
    }
}

export const update: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const permission: IPermission | null = await updatePermissionValidation(req.params.slug, req.body);

        if (!permission) {
            throw Errors.permissionNotFound();
        }

        permission.name = req.body.name;
        permission.slug = req.body.slug;
        const updatedPermission: IPermission = await permission.save();

        res.status(200).json(updatedPermission);
    } catch (error) {
        next(error);
    }
}

export const deletePermission: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const permission: IPermission | null = await showPermissionValidation(req.params.slug);

        if (!permission) {
            throw Errors.permissionNotFound();
        }

        await PermissionModel.deleteOne({ _id: permission._id }).exec();

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}