-- RankingConstants.lua
-- Constants for Global Ranking System
-- Forest Sprint Premium - Ansible Logic Jump

local RankingConstants = {
	-- OrderedDataStore identifier
	ORDERED_STORE_NAME = "ForestSprintRanking_v1",

	-- Leaderboard configuration
	LEADERBOARD_SIZE = 100,      -- Total entries cached
	DISPLAY_SIZE = 10,           -- Default display count

	-- Cache settings
	CACHE_TTL_SECONDS = 30,      -- Cache refresh interval

	-- RemoteEvent for client sync
	REMOTE_EVENT_NAME = "LeaderboardUpdate",

	-- Time precision for storage (milliseconds)
	TIME_PRECISION = 1000
}

return RankingConstants
