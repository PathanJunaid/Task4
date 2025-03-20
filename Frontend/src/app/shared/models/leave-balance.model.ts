export interface LeaveBalance {
    id: string;
    paidLeavesRemaining: number;
    unpaidLeavesRemaining: number;
    sickLeavesRemaining: number;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    employeeRole: string;
}