using Microsoft.AspNetCore.Mvc;
using Basic_Auth.Model;
using Microsoft.AspNetCore.Authorization;

namespace Basic_Auth.Controllers
{
    [Route("api/analytics")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly ILeaveBalanceServices _LeaveBalanceServices;
        private readonly ILogger<AnalyticsController> _logger;

        public AnalyticsController(ILeaveBalanceServices leaveBalanceServices, ILogger<AnalyticsController> logger)
        {
            _LeaveBalanceServices = leaveBalanceServices;
            _logger = logger;
        }

        // 🔹 GET: api/analytics/top10-frequent-leave-takers
        [HttpGet("top10-frequent-leave-takers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTop10FrequentLeaveTakers()
        {
            try
            {
                var result = await _LeaveBalanceServices.GetTop10FrequentLeaveTakers();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch top 10 frequent leave takers.");
                return StatusCode(500, new { Message = "Internal Server Error", Error = ex.Message });
            }
        }

        // 🔹 GET: api/analytics/top5-no-paid-leaves
        [HttpGet("top5-no-paid-leaves")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTop5EmployeesWithoutPaidLeaves()
        {
            try
            {
                var result = await _LeaveBalanceServices.GetTop5EmployeesWithoutPaidLeaves();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch employees with no paid leaves.");
                return StatusCode(500, new { Message = "Internal Server Error", Error = ex.Message });
            }
        }

        // 🔹 GET: api/analytics/recent5-employees
        [HttpGet("recent5-employees")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRecent5Employees()
        {
            try
            {
                var result = await _LeaveBalanceServices.GetRecent5Employees();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch recent 5 employees.");
                return StatusCode(500, new { Message = "Internal Server Error", Error = ex.Message });
            }
        }

        // 🔹 GET: api/analytics/leave-balance
        [HttpGet("leave-balance")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetEmployeesLeaveBalance()
        {
            try
            {
                var result = await _LeaveBalanceServices.GetLeaveBalanceAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch employees leave balance.");
                return StatusCode(500, new { Message = "Internal Server Error", Error = ex.Message });
            }
        }
    }
}
