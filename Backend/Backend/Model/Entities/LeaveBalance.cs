using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Basic_Auth.Model.Entities
{
    public class LeaveBalance
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("Employee")]
        public Guid EmployeeId { get; set; }

        [Required]
        public int PaidLeavesRemaining { get; set; } = 12; // Example default value

        [Required]
        public int UnpaidLeavesRemaining { get; set; } = 5; // Example default value

        [Required]
        public int SickLeavesRemaining { get; set; } = 10; // Example default value

        // Navigation property
        public virtual User Employee { get; set; }
    }
}