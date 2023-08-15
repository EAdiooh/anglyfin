export class Server {

    private address: string;
    private id: string;

    constructor(serverAddress: string, serverId: string) {
        this.address = serverAddress;
        this.id = serverId;
    }

    public getAddress(): string{
        return this.address;
    }
}