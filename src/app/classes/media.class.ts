
export class Media {
    public name: string;
    public id: string;
    public hasSubtitles: boolean;
    public container: string;
    public premiereDate: Date;
    public channelId: string;
    public communityRating: number;
    public runTimeTicks: number;
    public productionYear: number;

    public type: string;
    public userData: UserData;
   
    public videoType: string;
    public imageTags: ImageTags;
    public privateBackdropImageTags: string[];
    
    public imageBlurHashes: ImageBlurHashes;
    public locationType:string;
    public mediaType:string;

    constructor(media: any) {
        this.name = media.Name;
        this.id = media.Id;
        this.hasSubtitles = media.HasSubtitles;
        this.container = media.Container;
        this.premiereDate = new Date(media.PremiereDate);
        this.channelId = media.ChannelId;
        this.communityRating = media.CommunityRating;
        this.runTimeTicks = media.RunTimeTicks;
        this.productionYear = media.ProductionYear;
        this.type = media.Type;
        this.userData = media.UserData;
        this.videoType = media.VideoType;
        this.imageTags = media.ImageTags;
        this.privateBackdropImageTags = media.PrivateBackdropImageTags;
        this.imageBlurHashes = media.ImageBlurHashes;
        this.locationType = media.LocationType;
        this.mediaType = media.MediaType;
    }


    public play(){

    }
}

interface ImageBlurHashes{
    Primary: string;
    Logo: string;
    Backdrop: string;
}

interface ImageTags{
    Primary: string;
    Thumb: string;
}

interface UserData{
    PlaybackPositionTicks: number;
    PlayCount: number;
    PlayedPercentage: number
    IsFavorite: false;
    LastPlayedDate: Date;
    Played: false;
    Key: string;
}

export class Movie extends Media {

    constructor(media: any) {
        super(media);
    }

    public getImage(serverAddress: string,seriesId: string): string{
        return `${serverAddress}/Items/${seriesId}/Images/Backdrop?fillHeight=300&fillWidth=355&quality=96`
    }
}

// {
// 	"0": {
// 		"Name": "À couteaux tirés",
// 		"ServerId": "a907ebd8528b4c2693a2fc2827a551a0",
// 		"Id": "d91db058524ae716421fdfeff87733d5",
// 		"HasSubtitles": true,
// 		"Container": "mkv,webm",
// 		"PremiereDate": "2019-11-27T00:00:00.0000000Z",
// 		"CriticRating": 97,
// 		"OfficialRating": "FR-U",
// 		"ChannelId": null,
// 		"CommunityRating": 7.9,
// 		"RunTimeTicks": 78062075904,
// 		"ProductionYear": 2019,
// 		"IsFolder": false,
// 		"Type": "Movie",
// 		"UserData": {
// 			"PlayedPercentage": 35.54731241598727,
// 			"PlaybackPositionTicks": 27748970000,
// 			"PlayCount": 2,
// 			"IsFavorite": false,
// 			"LastPlayedDate": "2023-07-23T18:05:14.914969Z",
// 			"Played": false,
// 			"Key": "546554"
// 		},
// 		"VideoType": "VideoFile",
// 		"ImageTags": {
// 			"Primary": "9dd7ef5c795523857832eb2ca785c41a",
// 			"Logo": "d6b8093eb7dadcd8132d46fced0665ce",
// 			"Thumb": "783dac72d28022c2cb95e1821bb8c9be"
// 		},
// 		"BackdropImageTags": [
// 			"9d529aee32f06a16a7f9c4f8d5f0674b"
// 		],
// 		"ImageBlurHashes": {
// 			"Backdrop": {
// 				"9d529aee32f06a16a7f9c4f8d5f0674b": "WJDHQ%S^AY+~AoXR}?ofNen,SyobOT$*$PX6n*aeJ7xG$gSwafnm"
// 			},
// 			"Primary": {
// 				"9dd7ef5c795523857832eb2ca785c41a": "d9BVOf-m9v=w~P$~NJo]60$|$$OT-T%GbXV]$SxVbtRp"
// 			},
// 			"Logo": {
// 				"d6b8093eb7dadcd8132d46fced0665ce": "OKBC#2jt0lodWWWDodRms-xqRmN0j@fQ5Caz$}odxXWDaz"
// 			},
// 			"Thumb": {
// 				"783dac72d28022c2cb95e1821bb8c9be": "NGDtnqOT1M=2B5OE^7W;bur^J7xpTD$*rvSxoKjF"
// 			}
// 		},
// 		"LocationType": "FileSystem",
// 		"MediaType": "Video"
// 	}
// }

export class SerieEpisode extends Media {
    public indexNumber: number;
    public parentIndexNumber: number;
    public parentLogoItemId: string;
    public parentBackdropItemId: string;
    public parentBackdropImageTags: string[];
    public seriesName: string;
    public seriesId: string;
    public seasonId: string;
    public seriesPrimaryImageTag: string;
    public seasonName: string;
    public parentLogoImageTag: string;

    constructor(media: any) {
        super(media);
        this.indexNumber = media.IndexNumber;
        this.parentIndexNumber = media.ParentIndexNumber;
        this.parentLogoItemId = media.ParentLogoItemId;
        this.parentBackdropItemId = media.ParentBackdropItemId;
        this.parentBackdropImageTags = media.ParentBackdropImageTags;
        this.seriesName = media.SeriesName;
        this.seriesId = media.SeriesId;
        this.seasonId = media.SeasonId;
        this.seriesPrimaryImageTag = media.SeriesPrimaryImageTag;
        this.seasonName = media.SeasonName;
        this.parentLogoImageTag = media.ParentLogoImageTag;
    }

    public getSerieImage(serverAddress: string,seriesId: string): string{
        return `${serverAddress}/Items/${seriesId}/Images/Backdrop?fillHeight=300&fillWidth=355&quality=96`
    }
}