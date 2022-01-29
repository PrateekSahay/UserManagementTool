﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApi.Models
{
	public class User
	{
		public int UserId { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public bool IsTrialUser { get; set; }
		public List<UserRoles> UserRoles { get; set; }
	}
}
