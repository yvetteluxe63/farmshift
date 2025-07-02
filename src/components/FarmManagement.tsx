
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const FarmManagement = () => {
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: "Dairy Farm A",
      location: "North Valley, Section 1",
      type: "Dairy",
      workers: 12,
      zones: ["Main Barn", "Milking Parlor", "Feed Storage"],
      description: "Primary dairy operation with 200 Holstein cows"
    },
    {
      id: 2,
      name: "Livestock Farm B",
      location: "West Pasture, Section 3",
      type: "Livestock",
      workers: 8,
      zones: ["West Pasture", "Feeding Area", "Shelter"],
      description: "Beef cattle and sheep grazing operation"
    },
    {
      id: 3,
      name: "Poultry Farm C",
      location: "East Wing, Section 2",
      type: "Poultry",
      workers: 4,
      zones: ["Henhouse A", "Henhouse B", "Processing Area"],
      description: "Free-range chicken and egg production"
    }
  ]);

  const [newFarm, setNewFarm] = useState({
    name: "",
    location: "",
    type: "",
    description: "",
    zones: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<typeof farms[0] | null>(null);

  const handleAddFarm = () => {
    if (!newFarm.name || !newFarm.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingFarm) {
      // Update existing farm
      const updatedFarms = farms.map(farm => 
        farm.id === editingFarm.id 
          ? {
              ...farm,
              name: newFarm.name,
              location: newFarm.location,
              type: newFarm.type || "General",
              zones: newFarm.zones ? newFarm.zones.split(",").map(z => z.trim()) : [],
              description: newFarm.description
            }
          : farm
      );
      setFarms(updatedFarms);
      toast.success("Farm updated successfully!");
    } else {
      // Add new farm
      const farm = {
        id: farms.length + 1,
        name: newFarm.name,
        location: newFarm.location,
        type: newFarm.type || "General",
        workers: 0,
        zones: newFarm.zones ? newFarm.zones.split(",").map(z => z.trim()) : [],
        description: newFarm.description
      };
      setFarms([...farms, farm]);
      toast.success("Farm added successfully!");
    }

    setNewFarm({ name: "", location: "", type: "", description: "", zones: "" });
    setEditingFarm(null);
    setIsDialogOpen(false);
  };

  const handleEditFarm = (farm: typeof farms[0]) => {
    setEditingFarm(farm);
    setNewFarm({
      name: farm.name,
      location: farm.location,
      type: farm.type,
      description: farm.description,
      zones: farm.zones.join(", ")
    });
    setIsDialogOpen(true);
  };

  const handleDeleteFarm = (id: number) => {
    setFarms(farms.filter(farm => farm.id !== id));
    toast.success("Farm deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Farm Management</h2>
          <p className="text-gray-600">Manage your farm locations and zones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFarm ? "Edit Farm" : "Add New Farm"}</DialogTitle>
              <DialogDescription>
                {editingFarm ? "Update farm information" : "Create a new farm location for shift management"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farm-name">Farm Name *</Label>
                <Input
                  id="farm-name"
                  placeholder="e.g., Dairy Farm A"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farm-location">Location *</Label>
                <Input
                  id="farm-location"
                  placeholder="e.g., North Valley, Section 1"
                  value={newFarm.location}
                  onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farm-type">Farm Type</Label>
                <Input
                  id="farm-type"
                  placeholder="e.g., Dairy, Livestock, Poultry"
                  value={newFarm.type}
                  onChange={(e) => setNewFarm({ ...newFarm, type: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farm-zones">Zones/Areas</Label>
                <Input
                  id="farm-zones"
                  placeholder="e.g., Main Barn, Milking Parlor, Feed Storage (comma separated)"
                  value={newFarm.zones}
                  onChange={(e) => setNewFarm({ ...newFarm, zones: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farm-description">Description</Label>
                <Textarea
                  id="farm-description"
                  placeholder="Brief description of the farm operations"
                  value={newFarm.description}
                  onChange={(e) => setNewFarm({ ...newFarm, description: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddFarm} className="bg-green-600 hover:bg-green-700">
                  {editingFarm ? "Update Farm" : "Add Farm"}
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingFarm(null);
                  setNewFarm({ name: "", location: "", type: "", description: "", zones: "" });
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <Card key={farm.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">{farm.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditFarm(farm)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteFarm(farm.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{farm.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{farm.type}</Badge>
                <span className="text-sm text-gray-600">{farm.workers} workers</span>
              </div>
              
              {farm.description && (
                <p className="text-sm text-gray-700">{farm.description}</p>
              )}
              
              {farm.zones.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Zones:</p>
                  <div className="flex flex-wrap gap-1">
                    {farm.zones.map((zone, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {farms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No farms yet</h3>
            <p className="text-gray-600 mb-4">Add your first farm to start managing shifts</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Farm
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FarmManagement;
