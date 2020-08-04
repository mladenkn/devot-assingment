import { IRouter } from "express";
import { HostsRepository } from "./HostsRepository";
import { deserialize } from "../devot-assingment-shared/SearchHostsRequest";

export function registerRoutes(router: IRouter, hostsRepo: HostsRepository){

  router.get('/hosts/search', async (req, res) => {
    const params = deserialize(req.query)
    const hosts = await hostsRepo.search(params)
    res.json(hosts)
  })
  
}