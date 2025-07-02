
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, Edit, Trash2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@farm.com",
      phone: "+1-555-0101",
      role: "Milker",
      farm: "Dairy Farm A",
      experience: "5 years",
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@farm.com",
      phone: "+1-555-0102",
      role: "Feeder",
      farm: "Livestock Farm B",
      experience: "3 years",
      status: "Active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@farm.com",
      phone: "+1-555-0103",
      role: "Vet Tech",
      farm: "Dairy Farm A",
      experience: "7 years",
      status: "Active"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@farm.com",
      phone: "+1-555-0104",
      role: "General Worker",
      farm: "Poultry Farm C",
      experience: "2 years",
      status: "On Leave"
    }
  ]);

  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    farm: "",
    experience: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<typeof workers[0] | null>(null);

  const farms = ["Dairy Farm A", "Livestock Farm B", "Poultry Farm C"];
  const roles = ["Milker", "Feeder", "Vet Tech", "General Worker", "Supervisor", "Maintenance"];

  const handleAddWorker = () => {
    if (!newWorker.name || !newWorker.email || !newWorker.role || !newWorker.farm) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingWorker) {
      // Update existing worker
      const updatedWorkers = workers.map(worker => 
        worker.id === editingWorker.id 
          ? {
              ...worker,
              name: newWorker.name,
              email: newWorker.email,
              phone: newWorker.phone,
              role: newWorker.role,
              farm: newWorker.farm,
              experience: newWorker.experience
            }
          : worker
      );
      setWorkers(updatedWorkers);
      toast.success("Worker updated successfully!");
    } else {
      // Add new worker
      const worker = {
        id: workers.length + 1,
        name: newWorker.name,
        email: newWorker.email,
        phone: newWorker.phone,
        role: newWorker.role,
        farm: newWorker.farm,
        experience: newWorker.experience,
        status: "Active"
      };
      setWorkers([...workers, worker]);
      toast.success("Worker added successfully!");
    }

    setNewWorker({ name: "", email: "", phone: "", role: "", farm: "", experience: "" });
    setEditingWorker(null);
    setIsDialogOpen(false);
  };

  const handleEditWorker = (worker: typeof workers[0]) => {
    setEditingWorker(worker);
    setNewWorker({
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      role: worker.role,
      farm: worker.farm,
      experience: worker.experience
    });
    setIsDialogOpen(true);
  };

  const handleDeleteWorker = (id: number) => {
    setWorkers(workers.filter(worker => worker.id !== id));
    toast.success("Worker removed successfully!");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Worker Management</h2>
          <p className="text-gray-600">Manage your farm workers and their assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Worker
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingWorker ? "Edit Worker" : "Add New Worker"}</DialogTitle>
              <DialogDescription>
                {editingWorker ? "Update worker information" : "Add a new worker to your farm team"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="worker-name">Full Name *</Label>
                <Input
                  id="worker-name"
                  placeholder="e.g., John Doe"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-email">Email *</Label>
                <Input
                  id="worker-email"
                  type="email"
                  placeholder="john@farm.com"
                  value={newWorker.email}
                  onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-phone">Phone</Label>
                <Input
                  id="worker-phone"
                  placeholder="+1-555-0101"
                  value={newWorker.phone}
                  onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-role">Role *</Label>
                <Select value={newWorker.role} onValueChange={(value) => setNewWorker({ ...newWorker, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-farm">Assigned Farm *</Label>
                <Select value={newWorker.farm} onValueChange={(value) => setNewWorker({ ...newWorker, farm: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a farm" />
                  </SelectTrigger>
                  <SelectContent>
                    {farms.map((farm) => (
                      <SelectItem key={farm} value={farm}>{farm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker-experience">Experience</Label>
                <Input
                  id="worker-experience"
                  placeholder="e.g., 3 years"
                  value={newWorker.experience}
                  onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddWorker} className="bg-green-600 hover:bg-green-700">
                  {editingWorker ? "Update Worker" : "Add Worker"}
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingWorker(null);
                  setNewWorker({ name: "", email: "", phone: "", role: "", farm: "", experience: "" });
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {getInitials(worker.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{worker.name}</CardTitle>
                    <p className="text-sm text-gray-600">{worker.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditWorker(worker)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteWorker(worker.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(worker.status)}>
                  {worker.status}
                </Badge>
                <span className="text-sm text-gray-600">{worker.experience}</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Assigned to: {worker.farm}</p>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{worker.email}</span>
                </div>
                {worker.phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{worker.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workers yet</h3>
            <p className="text-gray-600 mb-4">Add your first worker to start assigning shifts</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Worker
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkerManagement;
