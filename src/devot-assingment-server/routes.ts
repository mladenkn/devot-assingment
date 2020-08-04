import { IRouter } from "express";
import { HostsRepository } from "./HostsRepository";
import { deserializeGetHostsRequest } from "../devot-assingment-shared";

export function registerRoutes(router: IRouter){

  router.get('/hosts/search', async (req, res) => {
    const params = deserializeGetHostsRequest(req.query)
    const repo = new HostsRepository()
    const hosts = await repo.search(params)
    res.json(hosts)
  })
  
}