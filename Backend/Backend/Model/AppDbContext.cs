using Basic_Auth.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Basic_Auth.Model;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<LeaveRequest> LeaveRequests { get; set; }
    public DbSet<LeaveBalance> LeaveBalances { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasConversion<string>(); // Convert Enum to String
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        modelBuilder.Entity<LeaveRequest>()
            .Property(lr => lr.Status)
            .HasConversion<string>(); // Converts enum to string in DB

        modelBuilder.Entity<User>()
            .HasMany(e => e.LeaveRequests) // One-to-Many relation
            .WithOne(lr => lr.Employee)
            .HasForeignKey(lr => lr.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade); // Deletes leave requests if employee is removed

        modelBuilder.Entity<User>()
            .HasOne(e => e.LeaveBalance) // One-to-One relation
            .WithOne(lb => lb.Employee)
            .HasForeignKey<LeaveBalance>(lb => lb.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade); // Deletes balance if employee is removed
    }
}