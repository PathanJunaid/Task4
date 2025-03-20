using Basic_Auth.Model.dto;
using Microsoft.AspNetCore.Mvc;
using Basic_Auth.Model;
using Microsoft.AspNetCore.Authorization;

namespace Basic_Auth.Controllers
{
    [Route("api/leaverequests")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;
        private readonly ILogger<LeaveRequestController> _logger;

        public LeaveRequestController(ILeaveRequestService leaveRequestService, ILogger<LeaveRequestController> logger)
        {
            _leaveRequestService = leaveRequestService;
            _logger = logger;
        }

        [HttpPost]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> CreateLeaveRequest([FromBody] CreateLeaveRequestDto requestDto)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst("userId")?.Value);
                var leaveRequest = await _leaveRequestService.CreateLeaveRequest(requestDto, userId);
                return Ok(leaveRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to create leave request: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{leaveRequestId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLeaveRequestStatus(Guid leaveRequestId,[FromBody] UpdateLeaveRequestStatusDto updateDto)
        {
            try
            {
                var result = await _leaveRequestService.UpdateLeaveRequestStatus(leaveRequestId,updateDto);
                if (!result) return NotFound("Leave request not found.");
                return Ok("Leave request status updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update leave request status: {ex.Message}");
                return StatusCode(500, "An error occurred while updating the leave request status.");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllLeaveRequests()
        {
            try
            {
                var leaveRequests = await _leaveRequestService.GetAllLeaveRequests();
                return Ok(leaveRequests);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to retrieve leave requests: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving leave requests.");
            }
        }

        [HttpGet("{leaveRequestId}")]
        [Authorize]
        public async Task<IActionResult> GetLeaveRequestById(Guid leaveRequestId)
        {
            try
            {
                var leaveRequest = await _leaveRequestService.GetLeaveRequestById(leaveRequestId);
                if (leaveRequest == null) return NotFound("Leave request not found.");
                return Ok(leaveRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to retrieve leave request: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the leave request.");
            }
        }
        [HttpGet("employee")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> GetLeaveRequestsByEmployeeId()
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("userId")?.Value);
                var leaveRequests = await _leaveRequestService.GetLeaveRequestsByEmployeeId(employeeId);
                if (leaveRequests == null || !leaveRequests.Any())
                {
                    return NotFound(new { message = "No leave requests found for this employee." });
                }
                return Ok(leaveRequests);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
