package com.devcom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcom.dto.DeveloperDTO;
import com.devcom.dto.FeedDTO;
import com.devcom.dto.ResponseDTO;
import com.devcom.entity.Developer;
import com.devcom.entity.Feed;
import com.devcom.entity.Response;
import com.devcom.exception.DeveloperExistsException;
import com.devcom.exception.DeveloperNotFoundException;
import com.devcom.exception.FeedNotFoundException;
import com.devcom.exception.ResponseNotFoundException;
import com.devcom.exception.UserNotFoundException;
import com.devcom.service.DeveloperService;
import com.devcom.service.FeedService;
import com.devcom.service.ResponseService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/developers")
public class DeveloperController {
	 
	@Autowired
	DeveloperService developerService;
	
	@Autowired
	ResponseService responseService;
	
	@Autowired
	FeedService feedService;
	
	@PostMapping("/adddetails")
	public ResponseEntity<Integer> addDeveloper(@RequestBody DeveloperDTO developerdto) throws UserNotFoundException, DeveloperExistsException {
			Developer dev = developerService.addDeveloper(developerdto);
			return new ResponseEntity<>(dev.getDevId(), HttpStatus.OK);
	}
	
	@GetMapping("/getdetails/{devId}")
	public Optional<Developer> getDeveloper(@PathVariable int devId ) throws DeveloperNotFoundException {
			return developerService.getDeveloper(devId);	
	}
	
	@PutMapping("/editdetails/{devId}")
	public ResponseEntity<Developer> editDeveloper(@PathVariable("devId") int devId, @RequestBody DeveloperDTO developerdto) throws DeveloperNotFoundException {
		Developer updateDev = developerService.editDeveloper(developerdto,devId);
		return ResponseEntity.ok().body(updateDev);
	}
	
	@PostMapping("/addfeed")
	public ResponseEntity<Integer> addFeed(@RequestBody FeedDTO feeddto) throws DeveloperNotFoundException
	{
		Feed feed = feedService.addFeed(feeddto);
		return new ResponseEntity<>(feed.getFeedId(), HttpStatus.OK);
	}
	
	@GetMapping("/getfeed/{feedId}")
	public Optional<Feed> getFeed(@PathVariable int feedId ) throws FeedNotFoundException {
		return feedService.getFeed(feedId);	
	}
	
	@PostMapping("/addresponse")
	public ResponseEntity<String> addResponse(@RequestBody ResponseDTO responsedto) throws FeedNotFoundException, DeveloperNotFoundException {
		responseService.addResponse(responsedto);
		return new ResponseEntity<>("Response Added", HttpStatus.OK);
		
	}
	
	@PutMapping("/edit/{respId}")
	public ResponseEntity<Response> editResponse(@PathVariable("respId") int respId,@RequestBody ResponseDTO responsedto) throws ResponseNotFoundException {
		Response updateResp = responseService.editResponse(respId, responsedto);
		return ResponseEntity.ok().body(updateResp);
	}
	
	@GetMapping("/allfeeds")
	public List<Feed> getAllFeeds() {
		return feedService.getAllFeeds();
	}
	
	@GetMapping("/getresponse/{respid}")
	public Optional<Response> getResponse(@PathVariable int respid ) throws ResponseNotFoundException {
		return responseService.getResponse(respid);	
	}
	
	@GetMapping("/getresp/{feedId}")
	public Optional<Response> getResp(@PathVariable int feedId ) {
		return responseService.getResp(feedId);	
	}
	
	@GetMapping("/allresponses") 
	public List<Response> getAllResponses() {
		return responseService.getAllResponses();
	}
	
}