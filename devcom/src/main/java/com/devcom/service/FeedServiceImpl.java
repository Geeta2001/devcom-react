package com.devcom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devcom.dto.FeedDTO;
import com.devcom.entity.Developer;
import com.devcom.entity.Feed;
import com.devcom.exception.DeveloperNotFoundException;
import com.devcom.exception.FeedNotFoundException;
import com.devcom.exception.QueryExistsException;
import com.devcom.repository.DeveloperRepository;
import com.devcom.repository.FeedRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class FeedServiceImpl implements FeedService {
	
	private static final Logger log = LoggerFactory.getLogger(FeedServiceImpl.class);

	@Autowired
	FeedRepository feedRepository;
	
	@Autowired
	DeveloperRepository developerRepository;	
	
	@Override
	public Feed addFeed(FeedDTO feeddto) throws DeveloperNotFoundException {
		Optional<Developer> developer = developerRepository.findById(feeddto.getDevId());
		if(developer.isEmpty()) {
			log.error("developer not found");
			throw new DeveloperNotFoundException();
		}
		Optional<Feed> feed = feedRepository.findByQuery(feeddto.getQuery());
		if(feed.isPresent()) {
			log.error("query already exists");
			throw new QueryExistsException();
		}
		Feed feed1=new Feed();
		feed1.setQuery(feeddto.getQuery());
		feed1.setTopic(feeddto.getTopic());
		feed1.setFeedDate(feeddto.getFeedDate());
		feed1.setDeveloper(developer.get());
		log.info("feed saved");
		return  feedRepository.save(feed1);
	}
	
	@Override
	public String removeFeed(int feedId) throws FeedNotFoundException {
		
		Optional<Feed> feed = feedRepository.findById(feedId);
		if(!feed.isPresent()) {
			log.error("feed not found");
			throw new FeedNotFoundException();
		}
		feedRepository.deleteById(feedId);
        return "Feed Deleted";
	
	}
	@Override
	public Optional<Feed> getFeed(int feedId) throws FeedNotFoundException {
		Optional<Feed> opt = feedRepository.findById(feedId);
		if (opt.isEmpty()) {
			throw new FeedNotFoundException();
		}
		return feedRepository.findById(feedId);
	}

	@Override
	public List<Feed> getAllFeeds() {
		return feedRepository.findAll();

	}

}
