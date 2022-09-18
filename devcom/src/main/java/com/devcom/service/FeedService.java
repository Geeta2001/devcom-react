package com.devcom.service;
import java.util.List;
import java.util.Optional;

import com.devcom.dto.FeedDTO;
import com.devcom.entity.Feed;

public interface FeedService {
	public Feed addFeed(FeedDTO feeddto);
	public String removeFeed(int feedId);
	public Optional<Feed> getFeed(int feedId);
	public List<Feed> getAllFeeds();
}
