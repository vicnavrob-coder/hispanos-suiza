/**
 * Centralized Logger
 *
 * Production-ready logging system that replaces console.log.
 * Supports structured logging with levels, context, and timestamps.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private readonly isDevelopment: boolean;
  private readonly isProduction: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  /**
   * Format log entry for output
   */
  private format(entry: LogEntry): string {
    if (this.isDevelopment) {
      // Human-readable format for development
      const ctx = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
      const err = entry.error ? `\n  Error: ${entry.error.message}\n  ${entry.error.stack}` : '';
      return `[${entry.level.toUpperCase()}] ${entry.message}${ctx}${err}`;
    } else {
      // JSON format for production (easier to parse in logs)
      return JSON.stringify(entry);
    }
  }

  /**
   * Write log entry to output
   */
  private write(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
    };

    const formatted = this.format(entry);

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formatted);
        }
        break;
      case 'info':
        console.info(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  }

  /**
   * Debug level - only shown in development
   */
  debug(message: string, context?: LogContext): void {
    this.write('debug', message, context);
  }

  /**
   * Info level - general informational messages
   */
  info(message: string, context?: LogContext): void {
    this.write('info', message, context);
  }

  /**
   * Warning level - something unexpected but not critical
   */
  warn(message: string, context?: LogContext): void {
    this.write('warn', message, context);
  }

  /**
   * Error level - critical errors that need attention
   */
  error(message: string, error?: Error, context?: LogContext): void {
    this.write('error', message, context, error);
  }

  /**
   * Log HTTP request
   */
  request(method: string, path: string, statusCode?: number, duration?: number): void {
    this.info('HTTP Request', {
      method,
      path,
      statusCode,
      duration: duration ? `${duration}ms` : undefined,
    });
  }

  /**
   * Log database operation
   */
  db(operation: string, collection: string, success: boolean, duration?: number): void {
    const level = success ? 'info' : 'error';
    this.write(level, 'Database Operation', {
      operation,
      collection,
      success,
      duration: duration ? `${duration}ms` : undefined,
    });
  }

  /**
   * Log external API call
   */
  api(service: string, operation: string, success: boolean, error?: Error): void {
    const level = success ? 'info' : 'error';
    this.write(level, `External API: ${service}`, {
      operation,
      success,
    }, error);
  }

  /**
   * Log webhook event
   */
  webhook(provider: string, event: string, success: boolean): void {
    this.info('Webhook Event', {
      provider,
      event,
      success,
    });
  }

  /**
   * Log email sent
   */
  email(to: string, subject: string, success: boolean, error?: Error): void {
    const level = success ? 'info' : 'error';
    this.write(level, 'Email Sent', {
      to,
      subject,
      success,
    }, error);
  }

  /**
   * Log social media post
   */
  social(platform: string, postId?: string, success?: boolean, error?: Error): void {
    const level = success ? 'info' : 'error';
    this.write(level, `Social Media: ${platform}`, {
      postId,
      success,
    }, error);
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Export type for consumers
export type { LogContext, LogLevel };
