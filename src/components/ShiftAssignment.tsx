
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, Building2 } from "lucide-react";
import { toast } from "sonner";

const ShiftAssignment = () => {
  const [assignment, setAssignment] = useState({
    worker: "",
    farm: "",
    date: "",
    shiftType: "",
    startTime: "",
    endTime: "",
    notes: "",
    isRecurring: false,
    recurringType: "",
    recurringDays: ""
  });

  const workers = [
    { id: 1, name: "John Doe", role: "Milker" },
    { id: 2, name: "Sarah Smith", role: "Feeder" },
    { id: 3, name: "Mike Johnson", role: "Vet Tech" },
    { id: 4, name: "Emma Wilson", role: "General Worker" }
  ];

  const farms = [
    { id: 1, name: "Dairy Farm A", location: "North Valley" },
    { id: 2, name: "Livestock Farm B", location: "West Pasture" },
    { id: 3, name: "Poultry Farm C", location: "East Wing" }
  ];

  const shiftTypes = [
    { value: "morning", label: "Morning Shift", time: "5:00 AM - 1:00 PM", color: "text-green-600" },
    { value: "evening", label: "Evening Shift", time: "1:00 PM - 9:00 PM", color: "text-orange-600" },
    { value: "night", label: "Night Shift", time: "9:00 PM - 5:00 AM", color: "text-blue-600" },
    { value: "off", label: "Off Day", time: "Rest Day", color: "text-gray-600" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignment.worker || !assignment.farm || !assignment.date || !assignment.shiftType) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate assignment creation
    console.log("Creating shift assignment:", assignment);
    toast.success(`Shift assigned successfully to ${workers.find(w => w.id.toString() === assignment.worker)?.name}`);
    
    // Reset form
    setAssignment({
      worker: "",
      farm: "",
      date: "",
      shiftType: "",
      startTime: "",
      endTime: "",
      notes: "",
      isRecurring: false,
      recurringType: "",
      recurringDays: ""
    });
  };

  const getShiftTypeDetails = (type: string) => {
    return shiftTypes.find(st => st.value === type);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Assign Shifts</h2>
        <p className="text-gray-600">Create and manage shift assignments for your workers</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>New Shift Assignment</span>
            </CardTitle>
            <CardDescription>
              Assign workers to specific shifts and farms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="worker">Worker *</Label>
                  <Select value={assignment.worker} onValueChange={(value) => setAssignment({ ...assignment, worker: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a worker" />
                    </SelectTrigger>
                    <SelectContent>
                      {workers.map((worker) => (
                        <SelectItem key={worker.id} value={worker.id.toString()}>
                          {worker.name} - {worker.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm">Farm *</Label>
                  <Select value={assignment.farm} onValueChange={(value) => setAssignment({ ...assignment, farm: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a farm" />
                    </SelectTrigger>
                    <SelectContent>
                      {farms.map((farm) => (
                        <SelectItem key={farm.id} value={farm.id.toString()}>
                          {farm.name} - {farm.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={assignment.date}
                    onChange={(e) => setAssignment({ ...assignment, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shift-type">Shift Type *</Label>
                  <Select value={assignment.shiftType} onValueChange={(value) => setAssignment({ ...assignment, shiftType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift type" />
                    </SelectTrigger>
                    <SelectContent>
                      {shiftTypes.map((shift) => (
                        <SelectItem key={shift.value} value={shift.value}>
                          <div className="flex items-center space-x-2">
                            <span className={shift.color}>{shift.label}</span>
                            <span className="text-gray-500 text-sm">({shift.time})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {assignment.shiftType && assignment.shiftType !== "off" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Custom Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={assignment.startTime}
                      onChange={(e) => setAssignment({ ...assignment, startTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">Custom End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={assignment.endTime}
                      onChange={(e) => setAssignment({ ...assignment, endTime: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Special instructions or requirements for this shift..."
                  value={assignment.notes}
                  onChange={(e) => setAssignment({ ...assignment, notes: e.target.value })}
                />
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={assignment.isRecurring}
                    onCheckedChange={(checked) => setAssignment({ ...assignment, isRecurring: !!checked })}
                  />
                  <Label htmlFor="recurring">Make this a recurring shift</Label>
                </div>

                {assignment.isRecurring && (
                  <div className="grid gap-4 md:grid-cols-2 ml-6">
                    <div className="space-y-2">
                      <Label htmlFor="recurring-type">Repeat Pattern</Label>
                      <Select value={assignment.recurringType} onValueChange={(value) => setAssignment({ ...assignment, recurringType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recurring-days">For how many occurrences?</Label>
                      <Input
                        id="recurring-days"
                        type="number"
                        placeholder="e.g., 10"
                        min="1"
                        max="52"
                        value={assignment.recurringDays}
                        onChange={(e) => setAssignment({ ...assignment, recurringDays: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Assign Shift
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Shift Types</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shiftTypes.map((shift) => (
                  <div key={shift.value} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className={`font-medium ${shift.color}`}>{shift.label}</p>
                      <p className="text-sm text-gray-600">{shift.time}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${
                      shift.value === "morning" ? "bg-green-500" :
                      shift.value === "evening" ? "bg-orange-500" :
                      shift.value === "night" ? "bg-blue-500" : "bg-gray-500"
                    }`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Workers:</span>
                  <span className="font-medium">{workers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Farms:</span>
                  <span className="font-medium">{farms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Today's Assignments:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span className="font-medium">84</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShiftAssignment;
