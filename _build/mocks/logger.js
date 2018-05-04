"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDisplay = () => process.env.DISPLAY_MESSAGES;
exports.log = (tags, message, timestamp, forceLog = false) => {
    if (getDisplay() || forceLog) {
        return console.log(tags, message);
    }
    return undefined;
};
class MockLogger {
    server(tags, message, timestamp) {
        return exports.log(tags, message, timestamp);
    }
    request(request, tags, message, timestamp) {
        return exports.log(tags, message, timestamp);
    }
}
exports.MockLogger = MockLogger;
exports.mockLogger = new MockLogger();
//# sourceMappingURL=logger.js.map