using Basic_Auth.Model.dto;
using Basic_Auth.Model.Entities;

namespace Basic_Auth.Model;

public interface ILeaveRequestService
{
    Task<LeaveRequest> CreateLeaveRequest(CreateLeaveRequestDto requestDto, Guid EmployeeId);
    Task<bool> UpdateLeaveRequestStatus(Guid leaveRequestId, UpdateLeaveRequestStatusDto updateDto);
    Task<List<LeaveRequestDto>> GetAllLeaveRequests();
    Task<LeaveRequestDto> GetLeaveRequestById(Guid leaveRequestId);
    Task<List<LeaveRequestDto>> GetLeaveRequestsByEmployeeId(Guid employeeId);
}