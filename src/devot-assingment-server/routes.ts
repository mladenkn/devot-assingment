import { IRouter } from "express";
import { Database } from "./db";
import getHostsWithAvailableRooms from "./getHostsWithAvailableRooms";

export function registerRoutes(router: IRouter, db: Database){

  router.get('/hosts/search', async (req, res) => {
    const params = {
      startDate: new Date(req.query.startDate as string),
      endDate: new Date(req.query.endDate as string),
      guestsCount: parseInt(req.query.guestsCount as string),
      offset: parseInt(req.query.offset as string),
      maxCount: parseInt(req.query.maxCount as string),
    }
    const hosts = await getHostsWithAvailableRooms(db, params)
    res.json(hosts)
  })
  
}