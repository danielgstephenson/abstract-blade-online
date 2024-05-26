import { Server } from 'socket.io';
declare function getIo(onListen: (() => void) | null): Server;
export { getIo };
