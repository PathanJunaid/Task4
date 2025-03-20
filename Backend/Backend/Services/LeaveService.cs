using Basic_Auth.Model.dto;
using Basic_Auth.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Basic_Auth.Model;

namespace Basic_Auth.Services
{
    public class LeaveRequestService : ILeaveRequestService
    {
        private readonly AppDbContext _dbContext;

        public LeaveRequestService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Create Leave Request
        public async Task<LeaveRequest> CreateLeaveRequest(CreateLeaveRequestDto requestDto, Guid EmployeeId)
        {
            try
            {
                // Fetch employee's leave balance
                var leaveBalance = await _dbContext.LeaveBalances
                    .FirstOrDefaultAsync(lb => lb.EmployeeId == EmployeeId);

                if (leaveBalance == null)
                {
                    throw new Exception("Leave balance record not found for this employee.");
                }

                int leaveDays = (requestDto.EndDate - requestDto.StartDate).Days + 1;

                // Check leave balance based on leave type
                if (requestDto.LeaveType.ToLower() == "paid" && leaveBalance.PaidLeavesRemaining < leaveDays)
                {
                    throw new Exception("Insufficient Paid Leave balance.");
                }

                if (requestDto.LeaveType.ToLower() == "unpaid" && leaveBalance.UnpaidLeavesRemaining < leaveDays)
                {
                    throw new Exception("Insufficient Unpaid Leave balance.");
                }

                if (requestDto.LeaveType.ToLower() == "sick" && leaveBalance.SickLeavesRemaining < leaveDays)
                {
                    throw new Exception("Insufficient Sick Leave balance.");
                }

                var leaveRequest = new LeaveRequest
                {
                    Id = Guid.NewGuid(),
                    EmployeeId = EmployeeId,
                    StartDate = requestDto.StartDate,
                    EndDate = requestDto.EndDate,
                    LeaveType = requestDto.LeaveType,
                    Reason = requestDto.Reason,
                    Status = LeaveStatus.Pending,
                    RequestedDate = DateTime.UtcNow
                };

                _dbContext.LeaveRequests.Add(leaveRequest);
                await _dbContext.SaveChangesAsync();

                return leaveRequest;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while creating the leave request: {ex.Message}");
            }
        }

        // Approve or Reject Leave Request
        public async Task<bool> UpdateLeaveRequestStatus(Guid leaveRequestId,UpdateLeaveRequestStatusDto updateDto)
        {
            try
            {
                var leaveRequest = await _dbContext.LeaveRequests
                    .Include(lr => lr.Employee)
                    .FirstOrDefaultAsync(lr => lr.Id == leaveRequestId);

                if (leaveRequest == null)
                {
                    throw new Exception("Leave request not found.");
                }

                // If approving, update the leave balance
                if (updateDto.Status == LeaveStatus.Approved)
                {
                    var leaveBalance = await _dbContext.LeaveBalances
                        .FirstOrDefaultAsync(lb => lb.EmployeeId == leaveRequest.EmployeeId);

                    if (leaveBalance == null)
                    {
                        throw new Exception("Leave balance record not found for this employee.");
                    }

                    int leaveDays = (leaveRequest.EndDate - leaveRequest.StartDate).Days + 1;

                    if (leaveRequest.LeaveType.ToLower() == "paid")
                    {
                        if (leaveBalance.PaidLeavesRemaining < leaveDays)
                            throw new Exception("Insufficient Paid Leave balance.");
                        leaveBalance.PaidLeavesRemaining -= leaveDays;
                    }
                    else if (leaveRequest.LeaveType.ToLower() == "unpaid")
                    {
                        if (leaveBalance.UnpaidLeavesRemaining < leaveDays)
                            throw new Exception("Insufficient Unpaid Leave balance.");
                        leaveBalance.UnpaidLeavesRemaining -= leaveDays;
                    }
                    else if (leaveRequest.LeaveType.ToLower() == "sick")
                    {
                        if (leaveBalance.SickLeavesRemaining < leaveDays)
                            throw new Exception("Insufficient Sick Leave balance.");
                        leaveBalance.SickLeavesRemaining -= leaveDays;
                    }

                    _dbContext.LeaveBalances.Update(leaveBalance);
                }

                leaveRequest.Status = updateDto.Status;
                _dbContext.LeaveRequests.Update(leaveRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the leave request status: {ex.Message}");
            }
        }

        // Get All Leave Requests
        public async Task<List<LeaveRequestDto>> GetAllLeaveRequests()
        {
            try
            {
                return await _dbContext.LeaveRequests
                    .Select(lr => new LeaveRequestDto
                    {
                        Id = lr.Id,
                        EmployeeId = lr.EmployeeId,
                        EmployeeName = lr.Employee.Name,
                        EmployeeEmail = lr.Employee.Email,
                        EmployeeRole = lr.Employee.Role.ToString(),
                        StartDate = lr.StartDate,
                        EndDate = lr.EndDate,
                        LeaveType = lr.LeaveType,
                        Reason = lr.Reason,
                        Status = lr.Status.ToString(),
                        RequestedDate = lr.RequestedDate
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving leave requests: {ex.Message}");
            }
        }

        public async Task<LeaveRequestDto> GetLeaveRequestById(Guid leaveRequestId)
        {
            try
            {
                var leaveRequest = await _dbContext.LeaveRequests
                    .Where(lr => lr.Id == leaveRequestId)
                    .Select(lr => new LeaveRequestDto
                    {
                        Id = lr.Id,
                        EmployeeId = lr.EmployeeId,
                        EmployeeName = lr.Employee.Name,
                        EmployeeEmail = lr.Employee.Email,
                        EmployeeRole = lr.Employee.Role.ToString(),
                        StartDate = lr.StartDate,
                        EndDate = lr.EndDate,
                        LeaveType = lr.LeaveType,
                        Reason = lr.Reason,
                        Status = lr.Status.ToString(),
                        RequestedDate = lr.RequestedDate
                    })
                    .FirstOrDefaultAsync();
                if (leaveRequest == null)
                {
                    throw new Exception("Leave request not found.");
                }

                return leaveRequest;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the leave request: {ex.Message}");
            }
        }

        public async Task<List<LeaveRequestDto>> GetLeaveRequestsByEmployeeId(Guid employeeId)
        {
            try
            {
                return await _dbContext.LeaveRequests
                    .Where(lr => lr.EmployeeId == employeeId)
                    .Select(lr => new LeaveRequestDto
                    {
                        Id = lr.Id,
                        EmployeeId = lr.EmployeeId,
                        EmployeeName = lr.Employee.Name,
                        EmployeeEmail = lr.Employee.Email,
                        EmployeeRole = lr.Employee.Role.ToString(),
                        StartDate = lr.StartDate,
                        EndDate = lr.EndDate,
                        LeaveType = lr.LeaveType,
                        Reason = lr.Reason,
                        Status = lr.Status.ToString(),
                        RequestedDate = lr.RequestedDate
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(
                    $"An error occurred while retrieving leave requests for the employee: {ex.Message}");
            }
        }
    }
}