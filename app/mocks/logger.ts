const getDisplay = () => process.env.DISPLAY_MESSAGES;

export interface Logger {
  server(tags: string[], message: any, timestamp?);
  request(request: any, tags: string[], message: any, timestamp?);
}

export const log = (tags: string[], message: any, timestamp?, forceLog = false) => {
  if (getDisplay() || forceLog) {
    return console.log(tags, message);
  }
  return undefined;
};

export class MockLogger implements Logger {
  public server(tags: string[], message: any, timestamp?) {
    return log(tags, message, timestamp);
  }

  public request(request: any, tags: string[], message: any, timestamp?) {
    return log(tags, message, timestamp);
  }
}

export const mockLogger = new MockLogger();
