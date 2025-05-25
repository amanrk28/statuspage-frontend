export enum SocketEvent {
    CREATED = "created",
    UPDATED = "updated",
    DELETED = "deleted",
    STATUS_UPDATED = "status_updated",
}

export enum Object {
    SERVICE = "service",
    INCIDENT = "incident",
    STATUS = "status",
}

export interface SocketMessage {
  event: SocketEvent;
  object: Object;
  data: any;
  timestamp: string;
}