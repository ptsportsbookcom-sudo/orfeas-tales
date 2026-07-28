try {
  if (Array.isArray(DYNAMIC_WAL_STORY_IDS) && !DYNAMIC_WAL_STORY_IDS.includes(13)) {
    DYNAMIC_WAL_STORY_IDS.push(13);
  }
  const previousEpisodeNumeral = episodeNumeral;
  episodeNumeral = function(storyId) {
    return Number(storyId) === 13 ? 'XIII' : previousEpisodeNumeral(storyId);
  };
} catch (err) {}
