using Basic_Auth.Model.dto;
using Basic_Auth.Model.Entities;

namespace Basic_Auth.Model
{
    public interface ILeaveBalanceServices
    {
        Task<LeaveBalance> CreateLeaveBalance(Guid EmployeeId);
        
        Task<LeaveBalance> GetLeaveBalanceofEmployee(Guid EmployeeId);
        Task<List<LeaveBalanceDto>> GetLeaveBalanceAll();
        Task<List<EmployeeLeaveCountDto>> GetTop10FrequentLeaveTakers();
        Task<List<EmployeeDto>> GetTop5EmployeesWithoutPaidLeaves();
        Task<List<EmployeeDto>> GetRecent5Employees();
        
    }
}

