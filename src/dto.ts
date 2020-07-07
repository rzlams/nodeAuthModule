type Genre = 'Post-punk' | 'Trip-hop' | 'Rock' | 'Rap' | 'Electronic' | 'Pop';

interface TrackDTO {
  number: number;
  name: string;
  length: string;
}

type TrackCollectionDTO = TrackDTO[];

// Vinyl view model / DTO, this is the format of the response
interface VinylDTO {
  albumName: string;
  label: string;
  country: string;
  yearReleased: number;
  genres: Genre[];
  artistName: string;
  trackList: TrackCollectionDTO;
}






export class GetVinylById extends BaseController {
  private models: any;

  public constructor (models: any) {
    super();
    this.models = models;
  }

  public async executeImpl(): Promise<any> {
    try {
      const { Vinyl, Track, Genre, Label } = this.models;
      const vinylId: string = this.req.params.vinylId;

      const result = await Vinyl.findOne({
        where: {},
        include: [
          { model: User, as: 'Owner', attributes: ['user_id', 'display_name'] },
          { model: Label, as: 'Label' },
          { model: Genre, as: 'Genres' }
          { model: Track, as: 'TrackList' },
        ]
      });

      // Map the ORM object to our DTO
      const dto: VinylDTO = {
        albumName: result.album_name,
        label: result.Label.name,
        country: result.Label.country,
        yearReleased: new Date(result.release_date).getFullYear(),
        genres: result.Genres.map((g) => g.name),
        artistName: result.artist_name,
        trackList: result.TrackList.map((t) => ({
          number: t.album_track_number,
          name: t.track_name,
          length: t.track_length,
        }))
      }

      // Using our baseController, we can specify the return type
      // for readability.
      return this.ok<VinylDTO>(this.res, dto)
    } catch (err) {
      return this.fail(err);
    }
  }
}

