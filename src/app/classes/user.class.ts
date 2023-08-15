export class User {
    private name: string;
    private Id: string;
    private PrimaryimageTag: string;
    private Configuration: Configuration;
    private Policy: Policy;


    constructor(userInformation: any) {
        this.name = userInformation.Name;
        this.Id = userInformation.Id;
        this.PrimaryimageTag = userInformation.PrimaryimageTag;
        this.Configuration = userInformation.Configuration;
        this.Policy = userInformation.Policy;
    }

    public getId(): string{
        return this.Id;
    }

    public getName(): string{
        return this.name;
    }
}

interface Configuration{
    PlayDefaultAudioTrack: boolean,
    SubtitleLanguagePreference: string,
    DisplayMissingEpisodes: boolean,
    GroupedFolders: any[],
    SubtitleMode: string,
    DisplayCollectionsView: boolean,
    EnableLocalPassword: boolean,
    OrderedViews: any[],
    LatestItemsExcludes: any[],
    MyMediaExcludes: any[],
    HidePlayedInLatest: boolean,
    RememberAudioSelections: boolean,
    RememberSubtitleSelections: boolean,
    EnableNextEpisodeAutoPlay: boolean
}

interface Policy{
    IsAdministrator: boolean;
    IsHidden: boolean;
    IsDisabled: false;
    BlockedTags: any[];
    EnableUserPreferenceAccess: boolean;
    AccessSchedules: any[];
    BlockUnratedItems: any[];
    EnableRemoteControlOfOtherUsers: boolean;
    EnableSharedDeviceControl: boolean;
    EnableRemoteAccess: boolean;
    EnableLiveTvManagement: boolean;
    EnableLiveTvAccess: boolean;
    EnableMediaPlayback: boolean;
    EnableAudioPlaybackTranscoding: boolean;
    EnableVideoPlaybackTranscoding: boolean;
    EnablePlaybackRemuxing: boolean;
    ForceRemoteSourceTranscoding: boolean;
    EnableContentDeletion: boolean;
    EnableContentDeletionFromFolders: any[];
    EnableContentDownloading: boolean;
    EnableSyncTranscoding: boolean;
    EnableMediaConversion: boolean;
    EnabledDevices: any[];
    EnableAllDevices: boolean;
    EnabledChannels: any[];
    EnableAllChannels: boolean;
    EnabledFolders: any[];
    EnableAllFolders: boolean;
    InvalidLoginAttemptCount: number;
    LoginAttemptsBeforeLockout: number;
    MaxActiveSessions: number;
    EnablePublicSharing: boolean;
    BlockedMediaFolders: any[];
    BlockedChannels: any[];
    RemoteClientBitrateLimit: number;
    AuthenticationProviderId: string;
    PasswordResetProviderId: string
    SyncPlayAccess: string
}
