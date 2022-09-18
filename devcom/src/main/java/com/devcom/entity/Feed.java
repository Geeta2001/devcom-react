package com.devcom.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

	@Entity
	public class Feed {
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		int feedId;
		String query;
		@JsonFormat(pattern="dd-MM-yyyy")
		private Date feedDate;
		String topic;
		int relevance;
		
		@ManyToOne(cascade =CascadeType.MERGE)
		@JoinColumn(name="fd_fk")
		private Developer developer;
		
		
		public Feed() {
			super();
		}
		
		public Feed(int feedId, String query, Date feedDate, String topic, int relevance) {
			super();
			this.feedId = feedId;
			this.query = query;
			this.feedDate = feedDate;
			this.topic = topic;
			this.relevance = relevance;
		}

		public Feed(String query, String topic, Date feedDate) {
			super();
			this.query = query;
			this.topic = topic;
			this.feedDate = feedDate;
		}

		public Developer getDeveloper() {
			return developer;
		}
		public void setDeveloper(Developer developer) {
			this.developer = developer;
		}
		public int getFeedId() {
			return feedId;
		}
		public void setFeedId(int feedId) {
			this.feedId = feedId;
		}
		public Date getFeedDate() {
			return feedDate;
		}
		public void setFeedDate(Date feedDate) {
			this.feedDate = feedDate;
		}
		public String getQuery() {
			return query;
		}
		public void setQuery(String query) {
			this.query = query;
		}
		public String getTopic() {
			return topic;
		}
		public void setTopic(String topic) {
			this.topic = topic;
		}
		public int getRelevance() {
			return relevance;
		}
		public void setRelevance(int relevance) {
			this.relevance = relevance;
		}
}