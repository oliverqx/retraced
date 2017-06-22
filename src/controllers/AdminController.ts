import {
    Get, Post, Delete, Route, Body, Query, Header, Path, SuccessResponse,
    Controller, Put, Request,
} from "tsoa";
import * as express from "express";

import deleteTemplate from "../handlers/admin/deleteTemplate";
import deleteEnvironment from "../handlers/admin/deleteEnvironment";
import createDeletionRequest, { CreateDelReqRequestBody, CreateDelReqReport } from "../handlers/admin/createDeletionRequest";
import getDeletionRequest, { GetDelReqReport } from "../handlers/admin/getDeletionRequest";
import approveDeletionConfirmation from "../handlers/admin/approveDeletionConfirmation";
import updateApiToken from "../handlers/admin/updateApiToken";
import { ApiTokenValues } from "../models/api_token";
import { audit } from "../headless";

@Route("admin/v1")
export class AdminAPI extends Controller {

    /**
     * Delete a template. An overview of Template usage in Retraced can be found at
     *
     * https://preview.retraced.io/documentation/advanced-retraced/display-templates/
     *
     *
     * @param auth          Base64 ecoded JWT authentication
     * @param projectId     The project id
     * @param templateId    The id of the template to delete
     * @param environmentId The environment
     */
    @Delete("project/{projectId}/templates/{templateId}")
    @SuccessResponse("204", "Deleted")
    public async deleteTemplate(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("templateId") templateId: string,
        @Query("environment_id") environmentId: string,
    ): Promise<void> {
        await deleteTemplate(auth, projectId, templateId, environmentId);
        this.setStatus(204);
    }

    /**
     * Delete an environment and all of its dependents.
     * This is only allowed if
     * 1) the environment is empty (i.e. it lacks any recorded events), or
     * 2) an outstanding "deletion request" has been approved.
     *
     *
     * @param auth          Base64 ecoded JWT authentication
     * @param projectId     The project id
     * @param environmentId The environment to be deleted
     */
    @Delete("project/{projectId}/environment/{environmentId}")
    @SuccessResponse("204", "Deleted")
    public async deleteEnvironment(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("environmentId") environmentId: string,
    ): Promise<void> {
        await deleteEnvironment(auth, projectId, environmentId);
        this.setStatus(204);
    }

    /**
     * Create a resource deletion request and associated confirmation
     * requirements (as necessary).
     *
     *
     * @param auth          Base64 ecoded JWT authentication
     * @param projectId     The project id
     * @param environmentId The environment
     */
    @Post("project/{projectId}/environment/{environmentId}/deletion_request")
    @SuccessResponse("201", "Created")
    public async createDeletionRequest(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("environmentId") environmentId: string,
        @Body() requestBody: CreateDelReqRequestBody,
    ): Promise<CreateDelReqReport> {
        const result = await createDeletionRequest(
            auth, projectId, environmentId, requestBody,
        );
        this.setStatus(201);
        return result;
    }

    /**
     * Get the current status of an outstanding deletion request.
     *
     *
     * @param auth              Base64 ecoded JWT authentication
     * @param projectId         The project id
     * @param environmentId     The environment
     * @param deletionRequestId The id of the deletion request to look up
     */
    @Get("project/{projectId}/environment/{environmentId}/deletion_request/{deletionRequestId}")
    @SuccessResponse("200", "OK")
    public async getDeletionRequest(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("environmentId") environmentId: string,
        @Path("deletionRequestId") deletionRequestId: string,
    ): Promise<GetDelReqReport> {
        const result = await getDeletionRequest(
            auth, projectId, environmentId, deletionRequestId,
        );
        this.setStatus(200);
        return result;
    }

    /**
     * Mark a deletion confirmation as received (i.e. approve it).
     *
     *
     * @param auth              Base64 ecoded JWT authentication
     * @param projectId         The project id
     * @param environmentId     The environment
     * @param code              The confirmation code
     */
    @Post("project/{projectId}/environment/{environmentId}/deletion_confirmation/{code}")
    @SuccessResponse("200", "OK")
    public async approveDeletionConfirmation(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("environmentId") environmentId: string,
        @Path("code") code: string,
    ): Promise<void> {
        await approveDeletionConfirmation(
            auth, projectId, environmentId, code,
        );
        this.setStatus(200);
    }

    /**
     * Update an API token's fields.
     *
     *
     * @param auth              Base64 encoded JWT authentication
     * @param projectId         The project id
     * @param apiToken          The token to update
     */
    @Put("project/{projectId}/api_token/{apiToken}")
    @SuccessResponse("200", "OK")
    public async updateApiToken(
        @Header("Authorization") auth: string,
        @Path("projectId") projectId: string,
        @Path("apiToken") apiToken: string,
        @Body() requestBody: Partial<ApiTokenValues>,
        @Request() req: express.Request,
    ): Promise<void> {
        await audit(req, "api_token.update", "u", {
            target: {
                id: apiToken,
            },
        });

        await updateApiToken(
            auth, projectId, apiToken, requestBody,
        );

        this.setStatus(200);
    }
}
