const { EventEmitter } = require("events");
const bus = new EventEmitter();

module.exports = {
  producer: {
    send: async ({ topic, messages }) => {
      for (const msg of messages) {
        bus.emit(topic, msg);
      }
    },
  },
  consumer: {
    subscribe: async ({ topic }) => topic,
    run: async ({ topic, eachMessage }) => {
      bus.on(topic, async (message) => {
        await eachMessage({ topic, message });
      });
    },
  },
};
