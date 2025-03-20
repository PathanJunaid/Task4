using Basic_Auth.Model.Entities;

namespace Basic_Auth.Model.dto
{
    public class CreateLeaveRequestDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string LeaveType { get; set; } // Paid, Unpaid, Sick Leave, etc.
        public string Reason { get; set; }
    }

    public class UpdateLeaveRequestStatusDto
    {
        public LeaveStatus Status { get; set; } // Approved or Rejected
    }
    public class LeaveRequestDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeeRole { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string LeaveType { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public DateTime RequestedDate { get; set; }
    }

}

