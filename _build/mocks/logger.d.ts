export interface Logger {
    server(tags: string[], message: any, timestamp?: any): any;
    request(request: any, tags: string[], message: any, timestamp?: any): any;
}
export declare const log: (tags: string[], message: any, timestamp?: any, forceLog?: boolean) => void;
export declare class MockLogger implements Logger {
    server(tags: string[], message: any, timestamp?: any): void;
    request(request: any, tags: string[], message: any, timestamp?: any): void;
}
export declare const mockLogger: MockLogger;
