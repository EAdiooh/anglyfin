export class Session {
    private PlayState: PlayState;
    private AdditionalUsers: any[];
    private Capabilities: Capabilities;
    private RemoteEndPoint: string;
    private PlayableMediaTypes: any[];
    private Id: string;
    private UserId: string;
    private UserName: string;
    private Client: string;
    private LastActivityDate: Date;
    private LastPlaybackCheckIn: Date;
    private DeviceName: string;
    private DeviceId: string;
    private ApplicationVersion: string;
    private IsActive: boolean;
    private SupportsMediaControl: boolean;
    private SupportsRemoteControl: boolean;
    private NowPlayingQueue: any[];
    private NowPlayingQueueFullItems: any[];
    private HasCustomDeviceName: boolean;
    private ServerId: string;
    private UserPrimaryImageTag: string;
    private SupportedCommands: any[];

    constructor(sessionInformation: any) {
        this.PlayState = sessionInformation.PlayState;
        this.AdditionalUsers = sessionInformation.AdditionalUsers;
        this.Capabilities = sessionInformation.Capabilities;
        this.RemoteEndPoint = sessionInformation.RemoteEndPoint;
        this.PlayableMediaTypes = sessionInformation.PlayableMediaTypes;
        this.Id = sessionInformation.Id;
        this.UserId = sessionInformation.UserId;
        this.UserName = sessionInformation.UserName;
        this.Client = sessionInformation.Client;
        this.LastActivityDate = new Date(sessionInformation.LastActivityDate);
        this.LastPlaybackCheckIn = new Date(sessionInformation.LastPlaybackCheckIn);
        this.DeviceName = sessionInformation.DeviceName;
        this.DeviceId = sessionInformation.DeviceId;
        this.ApplicationVersion = sessionInformation.ApplicationVersion;
        this.IsActive = sessionInformation.IsActive;
        this.SupportsMediaControl = sessionInformation.SupportsMediaControl;
        this.SupportsRemoteControl = sessionInformation.SupportsRemoteControl;
        this.NowPlayingQueue = sessionInformation.NowPlayingQueue;
        this.NowPlayingQueueFullItems = sessionInformation.NowPlayingQueueFullItems;
        this.HasCustomDeviceName = sessionInformation.HasCustomDeviceName;
        this.ServerId = sessionInformation.ServerId;
        this.UserPrimaryImageTag = sessionInformation.UserPrimaryImageTag;
        this.SupportedCommands = sessionInformation.SupportedCommands;
    }

}

interface PlayState{
    CanSeek: boolean;
    IsPaused: boolean;
    IsMuted: boolean;
    RepeatMode: string;
}

interface Capabilities{
    layableMediaTypes: any[];
    upportedCommands: any[];
    upportsMediaControl: boolean;
    upportsContentUploading: boolean;
    upportsPersistentIdentifier: boolean;
    upportsSync: boolean;
}