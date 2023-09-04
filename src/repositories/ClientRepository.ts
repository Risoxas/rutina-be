import { Client, IClient } from "../models/Client";
import BaseRepository from "./BaseRepository";


class ClientRepository extends BaseRepository<IClient>{
}

export default new ClientRepository(Client);
