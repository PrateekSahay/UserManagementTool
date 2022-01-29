using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserApi.Models;
using UserApi.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // TODO: Add validation
        [HttpGet]
        public IActionResult GetNumberOfUsers()
        {
            var numberOfUsers = UserRepository.GetNumberOfUsers();
            return Ok(numberOfUsers);
        }

        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            var numberOfUsers = UserRepository.GetAllUsers();
            return Ok(numberOfUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDetail(int id)
        {
            var data = UserRepository.GetUsersDetails(id);
            return Ok(data);
        }

        [HttpPost]
        public void AddUser([FromBody] User user)
        {
            UserRepository.AddUser(user);            
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
            UserRepository.DeleteUser(id);
        }

        [HttpPut]
        public void EditUser([FromBody] User user)
        {
            UserRepository.EditUser(user);
        }

        [HttpPost("Auth")]
        public IActionResult isValidUser([FromBody] AuthRequest req)
        {
            bool isValid = UserRepository.IsValidUser(req);
            return Ok(isValid);
        }

        //// GET api/<UserController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<UserController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<UserController>/5        

    }
}
