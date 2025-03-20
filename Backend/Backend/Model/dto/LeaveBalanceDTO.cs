namespace Basic_Auth.Model.dto
{
    public class CreateLeaveBalanceDto {
        public Guid EmployeeId { get; set; }
    }
    public class LeaveBalanceDto
    {
        public Guid Id { get; set; }
        public int PaidLeavesRemaining { get; set; }
        public int UnpaidLeavesRemaining { get; set; }
        public int SickLeavesRemaining { get; set; }
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeeRole { get; set; }
    }
    
    public class EmployeeLeaveCountDto
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int LeaveCount { get; set; }
    }
    public class EmployeeDto
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmail { get; set; }
        public DateTime? CreatedAt {get; set;}
    }
}
