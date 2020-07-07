interface Repo<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<any>;
  save(t: T): Promise<any>;
}

export interface IVinylRepo extends Repo<Vinyl> {
  getVinylById(vinylId: string): Promise<Vinyl>;
  findAllVinylByArtistName(artistName: string): Promise<VinylCollection>;
  getVinylOwnedByUserId(userId: string): Promise<VinylCollection>;
}

import { Op } from "sequelize";
import { IVinylRepo } from "./IVinylRepo";
import { VinylMap } from "./VinyMap";

class VinylRepo implements IVinylRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createQueryObject(): any {
    const { Vinyl, Track, Genre, Label } = this.models;
    return {
      where: {},
      include: [
        {
          model: User,
          as: "Owner",
          attributes: ["user_id", "display_name"],
          where: {},
        },
        { model: Label, as: "Label" },
        { model: Genre, as: "Genres" },
        { model: Track, as: "TrackList" },
      ],
    };
  }

  public async exists(vinyl: Vinyl): Promise<boolean> {
    const VinylModel = this.models.Vinyl;
    const result = await VinylModel.findOne({
      where: { vinyl_id: vinyl.id.toString() },
    });
    return !!result === true;
  }

  public delete(vinyl: Vinyl): Promise<any> {
    const VinylModel = this.models.Vinyl;
    return VinylModel.destroy({
      where: { vinyl_id: vinyl.id.toString() },
    });
  }

  public async save(vinyl: Vinyl): Promise<any> {
    const VinylModel = this.models.Vinyl;
    const exists = await this.exists(vinyl.id.toString());
    const rawVinylData = VinylMap.toPersistence(vinyl);

    if (exists) {
      const sequelizeVinyl = await VinylModel.findOne({
        where: { vinyl_id: vinyl.id.toString() },
      });

      try {
        await sequelizeVinyl.update(rawVinylData);
        // scaffold all of the other related tables (VinylGenres, Tracks, etc)
        // ...
      } catch (err) {
        // If it fails, we need to roll everything back this.delete(vinyl);
      }
    } else {
      await VinylModel.create(rawVinylData);
    }

    return vinyl;
  }

  public getVinylById(vinylId: string): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObject.where = { vinyl_id: vinyl.id.toString() };
    const vinyl = await VinylModel.findOne(queryObject);
    if (!!vinyl === false) return null;
    return VinylMap.toDomain(vinyl);
  }

  public findAllVinylByArtistName(
    artistName: string
  ): Promise<VinylCollection> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObjectp.where = { [Op.like]: `%${artistName}%` };
    const vinylCollection = await VinylModel.findAll(queryObject);
    return vinylCollection.map((vinyl) => VinylMap.toDomain(vinyl));
  }

  public getVinylOwnedByUserId(userId: string): Promise<VinylCollection> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObject.include[0].where = { user_id: userId };
    const vinylCollection = await VinylModel.findAll(queryObject);
    return vinylCollection.map((vinyl) => VinylMap.toDomain(vinyl));
  }
}
