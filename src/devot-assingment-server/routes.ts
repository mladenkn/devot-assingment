import { IRouter } from "express";
import { HostsRepository } from "./HostsRepository";

export function registerRoutes(router: IRouter, hostsRepo: HostsRepository){

  router.get('/hosts/search', async (req, res) => {
    const params = {
      startDate: new Date(req.query.startDate as string),
      endDate: new Date(req.query.endDate as string),
      guestsCount: parseInt(req.query.guestsCount as string)
    }
    const hosts = await hostsRepo.search(params)
    res.json(hosts)
  })
  
}