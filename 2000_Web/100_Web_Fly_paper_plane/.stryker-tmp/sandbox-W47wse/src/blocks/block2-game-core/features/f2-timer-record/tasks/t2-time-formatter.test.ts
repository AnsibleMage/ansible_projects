// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { TimeFormatter } from './t2-time-formatter'

describe('Task 2.2.2: Time Formatter', () => {
  let formatter: TimeFormatter

  beforeEach(() => {
    formatter = new TimeFormatter()
  })

  describe('Format mm:ss.ms', () => {
    it('should format 0 milliseconds', () => {
      expect(formatter.format(0)).toBe('00:00.000')
    })

    it('should format seconds only', () => {
      expect(formatter.format(5000)).toBe('00:05.000')
    })

    it('should format minutes and seconds', () => {
      expect(formatter.format(65000)).toBe('01:05.000')
    })

    it('should format with milliseconds', () => {
      expect(formatter.format(1234)).toBe('00:01.234')
    })

    it('should format complete time', () => {
      expect(formatter.format(125678)).toBe('02:05.678')
    })

    it('should handle large times', () => {
      expect(formatter.format(3661234)).toBe('61:01.234')
    })
  })

  describe('Parse Time String', () => {
    it('should parse formatted time back to milliseconds', () => {
      const time = 125678
      const formatted = formatter.format(time)
      const parsed = formatter.parse(formatted)
      expect(parsed).toBe(time)
    })

    it('should parse zero time', () => {
      expect(formatter.parse('00:00.000')).toBe(0)
    })

    it('should parse minutes', () => {
      expect(formatter.parse('02:00.000')).toBe(120000)
    })

    it('should parse seconds', () => {
      expect(formatter.parse('00:30.000')).toBe(30000)
    })

    it('should parse milliseconds', () => {
      expect(formatter.parse('00:00.500')).toBe(500)
    })
  })

  describe('Short Format', () => {
    it('should format time without milliseconds', () => {
      expect(formatter.formatShort(125678)).toBe('02:05')
    })

    it('should format zero without milliseconds', () => {
      expect(formatter.formatShort(0)).toBe('00:00')
    })
  })

  describe('Milliseconds Only', () => {
    it('should return milliseconds component', () => {
      expect(formatter.getMilliseconds(1234)).toBe(234)
    })

    it('should return seconds component', () => {
      expect(formatter.getSeconds(125678)).toBe(5)
    })

    it('should return minutes component', () => {
      expect(formatter.getMinutes(125678)).toBe(2)
    })
  })
})
