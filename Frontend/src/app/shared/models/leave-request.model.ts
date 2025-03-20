export interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    employeeRole: string;
    startDate: string;
    endDate: string;
    leaveType: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    requestedDate: string;
}