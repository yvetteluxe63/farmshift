
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, RefreshCw, Plus, AlertCircle, Loader2 } from "lucide-react";
import { useShifts } from "@/hooks/useShifts";
import { useToast } from "@/hooks/use-toast";
import ShiftAssignment from "./ShiftAssignment";

const ShiftCalendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const { shifts, loading, error, refetch } = useShifts();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddShiftModal, setShowAddShiftModal] = useState(false);

  const getShiftColor = (shiftType: string) => {
    switch (shiftType) {
      case 'Morning':
        return { backgroundColor: '#10b981', borderColor: '#10b981' };
      case 'Evening':
        return { backgroundColor: '#f59e0b', borderColor: '#f59e0b' };
      case 'Night':
        return { backgroundColor: '#3b82f6', borderColor: '#3b82f6' };
      case 'Off':
        return { backgroundColor: '#6b7280', borderColor: '#6b7280' };
      default:
        return { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' };
    }
  };

  const events = shifts.map(shift => ({
    id: shift.id,
    title: `${shift.worker.name} - ${shift.shift_type}`,
    start: shift.shift_date,
    ...getShiftColor(shift.shift_type),
    extendedProps: {
      worker: shift.worker.name,
      farm: shift.farm?.name || 'Rest Day',
      location: shift.farm?.location || '-',
      type: shift.shift_type,
      notes: shift.notes || 'No notes',
      status: shift.status,
      startTime: shift.start_time,
      endTime: shift.end_time
    }
  }));

  const handleDateClick = (arg: any) => {
    console.log("Date clicked:", arg.dateStr);
    toast({
      title: "Date Selected",
      description: `You clicked on ${new Date(arg.dateStr).toLocaleDateString()}. Shift assignment functionality coming soon!`,
    });
  };

  const handleEventClick = (arg: any) => {
    setSelectedEvent(arg.event);
    console.log("Event clicked:", arg.event.extendedProps);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    toast({
      title: "Calendar Refreshed",
      description: "Shift data has been updated.",
    });
  };

  const getTodaysShifts = () => {
    const today = new Date().toISOString().split('T')[0];
    return shifts.filter(shift => shift.shift_date === today);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHover = {
    y: -8,
    scale: 1.02,
    transition: { 
      duration: 0.3
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-green-600" />
        </motion.div>
        <span className="ml-2 text-lg">Loading calendar...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
        <span className="text-red-500">Error loading shifts: {error}</span>
        <motion.div
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleRefresh} variant="outline" className="ml-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} whileHover={cardHover}>
        <Card className="overflow-hidden">
          <CardHeader>
            <motion.div 
              className="flex items-center justify-between"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calendar className="h-5 w-5 text-green-600" />
                </motion.div>
                <CardTitle>Live Shift Schedule Calendar</CardTitle>
              </div>
              <div className="flex space-x-2">
                <motion.div
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline" 
                    size="sm"
                    disabled={refreshing}
                  >
                    <motion.div
                      animate={refreshing ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                    </motion.div>
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm" onClick={() => setShowAddShiftModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shift
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-4">
                {[
                  { color: 'bg-green-500', label: 'Morning Shift', count: shifts.filter(s => s.shift_type === 'Morning').length },
                  { color: 'bg-amber-500', label: 'Evening Shift', count: shifts.filter(s => s.shift_type === 'Evening').length },
                  { color: 'bg-blue-500', label: 'Night Shift', count: shifts.filter(s => s.shift_type === 'Night').length },
                  { color: 'bg-gray-500', label: 'Off Day', count: shifts.filter(s => s.shift_type === 'Off').length }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className={`w-4 h-4 ${item.color} rounded`}
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <motion.span 
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {item.count}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="border rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ 
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek"
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
                dayMaxEvents={3}
                moreLinkClick="popover"
                eventDisplay="block"
                displayEventTime={false}
                eventMouseEnter={(info) => {
                  info.el.style.transform = "scale(1.05)";
                  info.el.style.transition = "transform 0.2s ease";
                }}
                eventMouseLeave={(info) => {
                  info.el.style.transform = "scale(1)";
                }}
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <motion.span
                  animate={{ 
                    color: ["#10b981", "#3b82f6", "#f59e0b", "#10b981"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Today's Schedule
                </motion.span>
                <motion.div
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getTodaysShifts().length} shifts
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {getTodaysShifts().length === 0 ? (
                  <motion.p 
                    className="text-gray-500 text-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    No shifts scheduled for today
                  </motion.p>
                ) : (
                  <motion.div 
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {getTodaysShifts().map((shift, index) => (
                      <motion.div 
                        key={shift.id} 
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                          shift.shift_type === 'Morning' ? 'bg-green-50 hover:bg-green-100' :
                          shift.shift_type === 'Evening' ? 'bg-amber-50 hover:bg-amber-100' :
                          shift.shift_type === 'Night' ? 'bg-blue-50 hover:bg-blue-100' :
                          'bg-gray-50 hover:bg-gray-100'
                        }`}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          x: 10,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 }
                        }}
                      >
                        <div className="space-y-1">
                          <motion.p 
                            className="font-medium"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {shift.worker.name}
                          </motion.p>
                          <p className="text-sm text-gray-600">
                            {shift.farm?.name || 'Rest Day'} 
                            {shift.start_time && shift.end_time && 
                              ` • ${shift.start_time} - ${shift.end_time}`
                            }
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge className={
                            shift.shift_type === 'Morning' ? 'bg-green-100 text-green-800' :
                            shift.shift_type === 'Evening' ? 'bg-amber-100 text-amber-800' :
                            shift.shift_type === 'Night' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {shift.shift_type}
                          </Badge>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Calendar Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: 'Total Shifts This Week', value: shifts.length, color: 'text-blue-600' },
                  { label: 'Active Workers', value: new Set(shifts.map(s => s.worker_id)).size, color: 'text-green-600' },
                  { label: 'Farms in Operation', value: new Set(shifts.filter(s => s.farm_id).map(s => s.farm_id)).size, color: 'text-purple-600' },
                  { label: 'Completion Rate', value: '94%', color: 'text-orange-600' }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    variants={itemVariants}
                    whileHover={{
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.8 + index * 0.1 }
                    }}
                  >
                    <span className="text-sm font-medium">{stat.label}</span>
                    <motion.span 
                      className={`text-lg font-bold ${stat.color}`}
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Shift Details</h3>
              <div className="space-y-2">
                <p><strong>Worker:</strong> {selectedEvent.extendedProps.worker}</p>
                <p><strong>Farm:</strong> {selectedEvent.extendedProps.farm}</p>
                <p><strong>Type:</strong> {selectedEvent.extendedProps.type}</p>
                <p><strong>Time:</strong> {selectedEvent.extendedProps.startTime || 'N/A'} - {selectedEvent.extendedProps.endTime || 'N/A'}</p>
                <p><strong>Notes:</strong> {selectedEvent.extendedProps.notes}</p>
              </div>
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Button onClick={() => setSelectedEvent(null)} className="w-full">
                  Close
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Shift Modal */}
      <Dialog open={showAddShiftModal} onOpenChange={setShowAddShiftModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Shift</DialogTitle>
          </DialogHeader>
          <ShiftAssignment />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ShiftCalendar;
