import acceptInvite from "./handlers/acceptInvite";
import createApiToken from "./handlers/createApiToken";
import createEnvironment from "./handlers/createEnvironment";
import createEvent from "./handlers/createEvent";
import createInvite from "./handlers/createInvite";
import createProject from "./handlers/createProject";
import createToken from "./handlers/createToken";
import deepSearch from "./handlers/deepSearch";
import getAction from "./handlers/getAction";
import getActor from "./handlers/getActor";
import getDashboard from "./handlers/getDashboard";
import getEvent from "./handlers/getEvent";
import getEventsBulk from "./handlers/getEventsBulk";
import getInvite from "./handlers/getInvite";
import getProject from "./handlers/getProject";
import listActions from "./handlers/listActions";
import listActors from "./handlers/listActors";
import listObjects from "./handlers/listObjects";
import listProjects from "./handlers/listProjects";
import listTeam from "./handlers/listTeam";
import searchEvents from "./handlers/searchEvents";
import updateAction from "./handlers/updateAction";
import userCreate from "./handlers/userCreate";
import userLogin from "./handlers/userLogin";
import viewerDeepSearch from "./handlers/viewerDeepSearch";
import viewerEvents from "./handlers/viewerEvents";
import viewerGetEventsBulk from "./handlers/viewerGetEventsBulk";
import viewerSession from "./handlers/viewerSession";
import viewerToken from "./handlers/viewerToken";

const routes = {
  userCreate: {
    path: "/v1/user/signup",
    method: "post",
    handler: userCreate,
  },
  userLogin: {
    path: "/v1/user/login",
    method: "post",
    handler: userLogin,
  },
  listProjects: {
    path: "/v1/projects",
    method: "get",
    handler: listProjects,
  },
  createProject: {
    path: "/v1/project",
    method: "post",
    handler: createProject,
  },
  getProject: {
    path: "/v1/project/:projectId",
    method: "get",
    handler: getProject,
  },
  searchEvents: {
    path: "/v1/project/:projectId/events/search",
    method: "post",
    handler: searchEvents,
  },
  deepSearch: {
    path: "/v1/project/:projectId/events/search/deep",
    method: "post",
    handler: deepSearch,
  },
  getEventsBulk: {
    path: "/v1/project/:projectId/events/bulk",
    method: "post",
    handler: getEventsBulk,
  },
  listTeam: {
    path: "/v1/project/:projectId/team",
    method: "get",
    handler: listTeam,
  },
  createEvent: {
    path: "/v1/project/:projectId/event",
    method: "post",
    handler: createEvent,
  },
  createEnvironment: {
    path: "/v1/project/:projectId/environment",
    method: "post",
    handler: createEnvironment,
  },
  createApiToken: {
    path: "/v1/project/:projectId/token",
    method: "post",
    handler: createApiToken,
  },
  viewerSession: {
    path: "/v1/viewersession",
    method: "post",
    handler: viewerSession,
  },
  viewerEvents: {
    path: "/v1/viewer/:projectId/events/search",
    method: "get",
    handler: viewerEvents,
  },
  viewerGetEventsBulk: {
    path: "/v1/viewer/:projectId/events/bulk",
    method: "post",
    handler: viewerGetEventsBulk,
  },
  viewerDeepSearch: {
    path: "/v1/viewer/:projectId/events/search/deep",
    method: "post",
    handler: viewerDeepSearch,
  },
  listObjects: {
    path: "/v1/project/:projectId/objects",
    method: "get",
    handler: listObjects,
  },
  listActors: {
    path: "/v1/project/:projectId/actors",
    method: "get",
    handler: listActors,
  },
  createInvite: {
    path: "/v1/project/:projectId/invite",
    method: "post",
    handler: createInvite,
  },
  getInvite: {
    path: "/v1/invite",
    method: "get",
    handler: getInvite,
  },
  acceptInvite: {
    path: "/v1/invite/accept",
    method: "post",
    handler: acceptInvite,
  },
  getEvent: {
    path: "/v1/project/:projectId/event/:eventId",
    method: "get",
    handler: getEvent,
  },
  listActions: {
    path: "/v1/project/:projectId/actions",
    method: "get",
    handler: listActions,
  },
  getActor: {
    path: "/v1/project/:projectId/actor/:actorId",
    method: "get",
    handler: getActor,
  },
  getAction: {
    path: "/v1/project/:projectId/action/:actionId",
    method: "get",
    handler: getAction,
  },
  updateAction: {
    path: "/v1/project/:projectId/action/:actionId",
    method: "put",
    handler: updateAction,
  },
  getDashboard: {
    path: "/v1/project/:projectId/dashboard",
    method: "get",
    handler: getDashboard,
  },
  viewerToken: {
    path: "/v1/project/:projectId/viewertoken",
    method: "get",
    handler: viewerToken,
  },
};

export default routes;