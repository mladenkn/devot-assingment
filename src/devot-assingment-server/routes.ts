import { IRouter } from "express";
import { HostsRepository } from "./HostsRepository";
import { deserialize } from "../devot-assingment-shared/SearchHostsRequest";

export function registerRoutes(router: IRouter){

  router.get('/hosts/search', async (req, res) => {
    const params = deserialize(req.query)
    const repo = new HostsRepository()
    const hosts = await repo.search(params)
    res.json(hosts)
  })
  
}