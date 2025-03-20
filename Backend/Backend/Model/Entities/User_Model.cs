using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Basic_Auth.Model.Entities
{
    public enum UserRole
    {
        Admin,
        Employee
    }

    public class User
    {
        [Key]
        [Required]
        public Guid Id { get; set; }= Guid.NewGuid();
        [Required]
        public string Name { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public bool Active { get; set; } = true;
        public UserRole Role { get; set; } = UserRole.Employee;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        // Relationships
        public virtual ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();

        public virtual LeaveBalance LeaveBalance { get; set; }
        
    }

}
