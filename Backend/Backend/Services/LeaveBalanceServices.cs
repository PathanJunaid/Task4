using Basic_Auth.Model;
using Basic_Auth.Model.dto;
using Basic_Auth.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Basic_Auth.Services;

public class LeaveBalanceServices : ILeaveBalanceServices
{
    private AppDbContext _dbContext;

    public LeaveBalanceServices(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<LeaveBalance> GetLeaveBalanceofEmployee(Guid EmployeeId)
    {
        try
        {
            var Result = _dbContext.LeaveBalances.FirstOrDefault(LB => LB.EmployeeId == EmployeeId);
            return Result;
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to get leave balance of employee");
        }
    }

    public async Task<List<LeaveBalanceDto>> GetLeaveBalanceAll()
    {
        try
        {
            var result = await _dbContext.LeaveBalances
                .Include(lb => lb.Employee) // Include Employee entity
                .Select(lb => new LeaveBalanceDto // Explicitly create DTO
                {
                    Id = lb.Id,
                    PaidLeavesRemaining = lb.PaidLeavesRemaining,
                    UnpaidLeavesRemaining = lb.UnpaidLeavesRemaining,
                    SickLeavesRemaining = lb.SickLeavesRemaining,
                    EmployeeId = lb.Employee.Id,
                    EmployeeName = lb.Employee.Name,
                    EmployeeEmail = lb.Employee.Email,
                    EmployeeRole = lb.Employee.Role.ToString()
                })
                .ToListAsync();

            return result;
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to get leave balances");
        }
    }
    // Create Leavebalance for employees

    public async Task<LeaveBalance> CreateLeaveBalance(Guid EmployeeId)
    {
        try
        {
            var leaveB = new LeaveBalance
            {
                EmployeeId = EmployeeId,
            };
            await _dbContext.LeaveBalances.AddAsync(leaveB);
            await _dbContext.SaveChangesAsync();
            return leaveB;
        }
        catch (Exception e)
        {
            throw new Exception("Failed to create LeaveBalance", e);
        }
    }
    
    public async Task<List<EmployeeLeaveCountDto>> GetTop10FrequentLeaveTakers()
        {
            try
            {
                return await _dbContext.LeaveRequests
                    .GroupBy(lr => new { lr.EmployeeId, lr.Employee.Name }) // Group by Employee
                    .Select(g => new EmployeeLeaveCountDto
                    {
                        EmployeeId = g.Key.EmployeeId,
                        EmployeeName = g.Key.Name,
                        LeaveCount = g.Count()
                    })
                    .OrderByDescending(e => e.LeaveCount) // Sort by leave count
                    .Take(10) // Top 10
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<EmployeeLeaveCountDto>();
            }
        }

        // 🔹 Get Top 5 Employees Who Don't Have Paid Leaves Left
        public async Task<List<EmployeeDto>> GetTop5EmployeesWithoutPaidLeaves()
        {
            try
            {
                return await _dbContext.LeaveBalances
                    .Where(lb => lb.PaidLeavesRemaining == 0) // Employees with no paid leaves
                    .OrderBy(lb => lb.Employee.Name) // Sort alphabetically
                    .Take(5)
                    .Select(lb => new EmployeeDto
                    {
                        EmployeeId = lb.EmployeeId,
                        EmployeeName = lb.Employee.Name,
                        EmployeeEmail = lb.Employee.Email,
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<EmployeeDto>();
            }
        }

        // 🔹 Get 5 Most Recent Employees
        public async Task<List<EmployeeDto>> GetRecent5Employees()
        {
            try
            {
                return await _dbContext.Users
                    .OrderByDescending(e => e.CreatedAt) // Sort by latest created
                    .Take(5) // Get 5 latest employees
                    .Select(e => new EmployeeDto
                    {
                        EmployeeId = e.Id,
                        EmployeeName = e.Name,
                        EmployeeEmail = e.Email,
                        CreatedAt = e.CreatedAt,
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<EmployeeDto>();
            }
        }
    
   
}