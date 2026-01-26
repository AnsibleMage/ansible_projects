/**
 * Task 2.2.2: Time Formatter
 *
 * Formats elapsed time for display:
 * - mm:ss.ms format (00:05.234)
 * - Short format (00:05)
 * - Parse time strings back to milliseconds
 * - Extract time components
 */

export class TimeFormatter {
  /**
   * Formats time in mm:ss.ms format
   */
  public format(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const ms = milliseconds % 1000

    return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${this.pad(ms, 3)}`
  }

  /**
   * Formats time in mm:ss format (no milliseconds)
   */
  public formatShort(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)

    return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`
  }

  /**
   * Parses formatted time string back to milliseconds
   */
  public parse(timeString: string): number {
    const match = timeString.match(/^(\d+):(\d+)\.(\d+)$/)
    if (!match) return 0

    const minutes = parseInt(match[1], 10)
    const seconds = parseInt(match[2], 10)
    const ms = parseInt(match[3], 10)

    return minutes * 60000 + seconds * 1000 + ms
  }

  /**
   * Gets minutes component
   */
  public getMinutes(milliseconds: number): number {
    return Math.floor(milliseconds / 60000)
  }

  /**
   * Gets seconds component
   */
  public getSeconds(milliseconds: number): number {
    return Math.floor((milliseconds % 60000) / 1000)
  }

  /**
   * Gets milliseconds component
   */
  public getMilliseconds(milliseconds: number): number {
    return milliseconds % 1000
  }

  /**
   * Pads a number with leading zeros
   */
  private pad(num: number, length: number): string {
    return num.toString().padStart(length, '0')
  }
}
