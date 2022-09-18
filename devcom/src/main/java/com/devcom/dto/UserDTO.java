package com.devcom.dto;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

	public class UserDTO {
		
		@SuppressWarnings("unused")
		private int userId;
		
		@Email
		private String userName;
		
		@NotEmpty(message = "password is required")
		private String password;
		
		private boolean isBlocked;
		
		public UserDTO(@Email String userName, @NotEmpty(message = "password is required") String password) {
			super();
			this.userName = userName;
			this.password = password;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public boolean isBlocked() {
			return isBlocked;
		}

		public void setBlocked(boolean isBlocked) {
			this.isBlocked = isBlocked;
		}

		

	}


