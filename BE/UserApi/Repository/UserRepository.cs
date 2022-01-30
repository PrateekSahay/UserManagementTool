using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using UserApi.Models;

namespace UserApi.Repository
{
    // TODO: Create abstraction using interface and implement it
    // TODO: Use dependecy injection
    // TODO: Write stored procedures for sql operations
    public class UserRepository
    {        
        private static string _connectionString = @"Data Source=.;Initial Catalog=UserDetails;Integrated Security=True;";        
        public static int GetNumberOfUsers()
        {            
            string sql = "Select count(*) from UserInfo;";
            var con = new SqlConnection(_connectionString);            
            var numberOfUsers = con.QueryFirst<int>(sql);            
            return numberOfUsers;
        }

        public static void AddUser(User user)
        {
            //string userExistSql = "Select count(*) from UserInfo where UserId = @UserId";
            var con = new SqlConnection(_connectionString);
            //int userCount = con.QueryFirst<int>(userExistSql, new { UserId = user.UserId });

            //if (userCount < 1)
            //{
                string sql = "Insert into UserInfo values(@UserName, @Password, @Email, @FirstName, @LastName, @IsTrialUser)";
                con.Query(sql,
                    new
                    {                        
                        UserName = user.UserName,
                        Password = user.Password,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        IsTrialUser = user.IsTrialUser
                    });
                

            string sql5 = "Select UserId from UserInfo where UserName = @UserName and Password = @Password and Email = @Email and FirstName = @FirstName and LastName = @LastName and IsTrialUser = @IsTrialUser";

            var userIdNew = con.QueryFirst<int>(sql5,
                    new
                    {
                        UserName = user.UserName,
                        Password = user.Password,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        IsTrialUser = user.IsTrialUser
                    });

            foreach (var role in user.UserRoles)
                {
                    string sql2 = "Select count(*) from UserRoles where UserId = @UserId and RoleId = @RoleId";
                    int roleCount = con.QueryFirst<int>(sql2, new { UserId = userIdNew, RoleId = role.RoleId });
                    if (roleCount >= 1)
                        continue;
                    string sql3 = "Insert into UserRoles values (@UserId, @RoleId)";
                    con.Query(sql3, new { UserId = userIdNew, RoleId = role.RoleId });
                }
            //}
        }

        public static void DeleteUser(int id)
        {
            string sql = "delete from UserInfo where UserId = @UserId";
            var con = new SqlConnection(_connectionString);
            con.Query(sql, new { UserId = id });

            string sql2 = "Delete from UserRoles where UserId = @UserId";
            con.Query(sql2, new { UserId = id });
        }

        public static void EditUser(User user)
        {
            string userExistSql = "Select count(*) from UserInfo where UserId = @UserId";
            var con = new SqlConnection(_connectionString);
            int userCount = con.QueryFirst<int>(userExistSql, new { UserId = user.UserId });

            if (userCount == 1)
            {
                string sql = "Update UserInfo Set UserName = @UserName, Password = @Password, Email = @Email, FirstName = @FirstName, LastName = @LastName, IsTrialUser = @IsTrialUser where UserId = @UserId";
                con.Query(sql,
                    new
                    {                        
                        UserName = user.UserName,
                        Password = user.Password,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        IsTrialUser = user.IsTrialUser,
                        UserId = user.UserId
                    });

                string sql4 = "Delete from UserRoles where UserId = @UserId";
                con.Query(sql4, new { UserId = user.UserId });

                foreach (var role in user.UserRoles)
                {
                    //string sql2 = "Select count(*) from UserRoles where UserId = @UserId and RoleId = @RoleId";
                    //int roleCount = con.QueryFirst<int>(sql2, new { UserId = user.UserId, RoleId = role.RoleId });
                    //if (roleCount >= 1)
                    //    continue;
                    string sql3 = "Insert into UserRoles values (@UserId, @RoleId)";
                    con.Query(sql3, new { UserId = user.UserId, RoleId = role.RoleId });
                }
            }
        }

        public static bool IsValidUser(AuthRequest req)
        {
            string userExistSql = "Select count(*) from UserInfo where UserName = @UserName and Password = @Password";
            var con = new SqlConnection(_connectionString);
            int userCount = con.QueryFirst<int>(userExistSql, new { UserName = req.UserName, Password = req.Password });

            if (userCount == 1)
                return true;
            return false;
        }




        public static User GetUsersDetails(int userId)
        {
            string sql = "Select * from UserInfo where UserId = @UserId";
            var con = new SqlConnection(_connectionString);
            User userCoreData = con.QueryFirst<User>(sql, new { UserId = userId });

            string sql2 = "select ur.roleId, r.RoleName from userRoles ur inner join roles r on r.RoleId = ur.RoleId where ur.UserId = @UserId";
            var userRoleData = con.Query<UserRoles>(sql2, new { UserId = userId });

            userCoreData.UserRoles = (System.Collections.Generic.List<UserRoles>)userRoleData;

            return userCoreData;
        }

        public static List<User> GetAllUsers()
        {
            var result = new List<User>();
            string sql = "Select UserId from UserInfo";
            var con = new SqlConnection(_connectionString);
            var userIds = con.Query<int>(sql);
            foreach(int userId in userIds)
            {
                User user = GetUsersDetails(userId);
                result.Add(user);
            }
            return result;
        }

        public static IEnumerable<UserRoles> GetAllRoles()
        {
            var result = new List<User>();
            string sql = "Select * from Roles";
            var con = new SqlConnection(_connectionString);
            var userRoles = con.Query<UserRoles>(sql);            
            return userRoles;
        }
    }
}
