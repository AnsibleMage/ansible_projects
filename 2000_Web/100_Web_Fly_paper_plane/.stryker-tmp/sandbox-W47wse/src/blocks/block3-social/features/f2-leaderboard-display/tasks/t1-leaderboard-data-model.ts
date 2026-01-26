/**
 * Task 3.2.1: Leaderboard Data Model
 *
 * Defines leaderboard data structure:
 * - Entry structure (rank, email, time, date)
 * - Leaderboard list structure
 * - Type definitions for leaderboard
 */
// @ts-nocheck


/**
 * Single leaderboard entry
 */
export interface LeaderboardEntry {
  rank: number;
  email: string;
  time: number; // milliseconds
  date: Date;
}

/**
 * Complete leaderboard data
 */
export interface LeaderboardData {
  entries: LeaderboardEntry[];
  totalEntries: number;
  updatedAt: Date;
}