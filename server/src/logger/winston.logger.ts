import { LoggerOptions, createLogger, format, transports } from 'winston';

const options: {
  file: transports.FileTransportOptions;
  console: transports.ConsoleTransportOptions;
} = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

// for development environment
const devLogger: LoggerOptions = {
  format: format.combine(
    format.colorize({
      all: true, // Colorize the entire message
      colors: {
        info: 'blue',
        error: 'red',
        warn: 'yellow',
        debug: 'green',
      },
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', // You can customize the timestamp format
    }),
    format.errors({ stack: true }), // Include stack trace if available
    format.printf((info) => {
      const { timestamp, level, message, stack } = info;
      return `${timestamp} - [${level}] - ${message} ${stack || ''}`;
    }),
  ),
  transports: [new transports.Console(options.console)],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'combine.log',
      level: 'info',
    }),
  ],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? devLogger : devLogger;
//    prodLogger : devLogger;

export const loggerInstance = createLogger(instanceLogger);
