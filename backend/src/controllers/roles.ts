import {NextFunction, RequestHandler} from "express";
import RoleModel from "../models/role";
import createRoleValidation from "../validations/role/createRole";
import showRoleValidation from "../validations/role/showRole";
import updateRoleValidation from "../validations/role/updateRole";
import IRole from "../interfaces/role";
import * as Errors from "../errors";

export const index: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const userRoles: string[] | undefined = req.session.roles;
        let roles: IRole[];

        if (userRoles?.includes("admin")) {
            roles = await RoleModel.find().exec();
        } else {
            const userRoles: string[] | undefined = req.session.roles;
            roles = await RoleModel.find({slug: {"$in": userRoles}}).exec();
        }

        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

export const create: RequestHandler<unknown, unknown, IRole, unknown> = async (req, res, next: NextFunction): Promise<void> => {
    try {
        await createRoleValidation(req.body);

        const newRole: IRole = new RoleModel({
            name: req.body.name,
            slug: req.body.slug,
            order: req.body.order,
            permissions: req.body.permissions
        });

        await newRole.save();

        res.status(201).json(newRole);
    } catch (error) {
        next(error);
    }
}

export const show: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const role: IRole | null = await showRoleValidation(req.params.slug);

        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}

export const update: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const role: IRole | null = await updateRoleValidation(req.params.slug, req.body);

        if (!role) {
            throw Errors.roleNotFound();
        }

        role.name = req.body.name;
        role.slug = req.body.slug;
        role.order = req.body.order;
        role.permissions = req.body.permissions;
        const updatedRole: IRole = await role.save();

        res.status(200).json(updatedRole);
    } catch (error) {
        next(error);
    }
}

export const deleteRole: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const role: IRole | null = await showRoleValidation(req.params.slug);

        if (!role) {
            throw Errors.roleNotFound();
        }

        await RoleModel.deleteOne({ _id: role._id }).exec();

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}