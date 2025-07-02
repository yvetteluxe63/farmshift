
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, LogOut, Clock, MapPin, Calendar, Loader2, AlertCircle } from "lucide-react";
import { useShifts } from "@/hooks/useShifts";

interface WorkerDashboardProps {
  onLogout: () => void;
}

const WorkerDashboard = ({ onLogout }: WorkerDashboardProps) => {
  const { shifts, loading, error } = useShifts();

  // Filter shifts for demo worker (John Doe) - in real app, you'd filter by current user
  const workerShifts = shifts.filter(shift => shift.worker.name === "John Doe");
  const upcomingShifts = workerShifts.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const cardHover = {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.3 }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as any
    }
  };

  const getShiftBadgeColor = (shiftType: string) => {
    switch (shiftType) {
      case 'Morning':
        return "bg-green-100 text-green-800";
      case 'Evening':
        return "bg-orange-100 text-orange-800";
      case 'Night':
        return "bg-blue-100 text-blue-800";
      case 'Off':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          animate={pulseAnimation}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Loader2 className="h-12 w-12 text-green-600" />
          </motion.div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="bg-green-600 p-2 rounded-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                animate={{ 
                  boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 10px rgba(16, 185, 129, 0)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                }}
                style={{
                  animationDuration: "3s",
                  animationIterationCount: "infinite"
                }}
              >
                <Building2 className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-xl font-bold text-gray-900"
                  animate={{ 
                    color: ["#111827", "#059669", "#111827"]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Worker Dashboard
                </motion.h1>
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Welcome back, John Doe
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Current Shift Status */}
        <motion.div variants={itemVariants} whileHover={cardHover}>
          <Card className="mb-6 border-l-4 border-l-green-500 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="h-5 w-5 text-green-600" />
                </motion.div>
                <span>Current Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <motion.p 
                    className="text-lg font-semibold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {upcomingShifts.length > 0 ? 'Ready for Next Shift' : 'On Break'}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {upcomingShifts.length > 0 
                      ? `Next shift: ${new Date(upcomingShifts[0].shift_date).toLocaleDateString()} at ${upcomingShifts[0].farm?.name || 'Rest Day'}`
                      : 'No upcoming shifts scheduled'
                    }
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  animate={pulseAnimation}
                >
                  <Badge className={upcomingShifts.length > 0 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}>
                    {upcomingShifts.length > 0 ? 'Scheduled' : 'Break Time'}
                  </Badge>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Error loading shifts: {error}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Shifts */}
        <motion.div variants={itemVariants} whileHover={cardHover}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Calendar className="h-5 w-5 text-blue-600" />
                </motion.div>
                <span>Your Upcoming Shifts</span>
                <motion.div
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {upcomingShifts.length} shifts
                </motion.div>
              </CardTitle>
              <CardDescription>
                Your scheduled work assignments from real-time data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {upcomingShifts.length === 0 ? (
                  <motion.div
                    key="no-shifts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming shifts scheduled</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="shifts-list"
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {upcomingShifts.map((shift, index) => (
                      <motion.div 
                        key={shift.id} 
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          x: 10,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: index * 0.1,
                            duration: 0.5
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <motion.h3 
                                className="font-semibold text-lg"
                                whileHover={{ x: 5, color: "#059669" }}
                                transition={{ duration: 0.2 }}
                              >
                                {shift.farm?.name || 'Rest Day'}
                              </motion.h3>
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge className={getShiftBadgeColor(shift.shift_type)}>
                                  {shift.shift_type}
                                </Badge>
                              </motion.div>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-600">
                              <motion.div 
                                className="flex items-center space-x-1"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(shift.shift_date).toLocaleDateString()}</span>
                              </motion.div>
                              {shift.start_time && shift.end_time && (
                                <motion.div 
                                  className="flex items-center space-x-1"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Clock className="h-4 w-4" />
                                  <span>{shift.start_time} - {shift.end_time}</span>
                                </motion.div>
                              )}
                              {shift.farm?.location && (
                                <motion.div 
                                  className="flex items-center space-x-1"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <MapPin className="h-4 w-4" />
                                  <span>{shift.farm.location}</span>
                                </motion.div>
                              )}
                            </div>
                            {shift.notes && (
                              <motion.p 
                                className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                              >
                                <strong>Notes:</strong> {shift.notes}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid gap-4 md:grid-cols-3 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { 
              title: 'This Week', 
              value: workerShifts.length, 
              subtitle: 'Hours scheduled',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50'
            },
            { 
              title: 'This Month', 
              value: workerShifts.length * 4, 
              subtitle: 'Total hours',
              color: 'text-green-600',
              bgColor: 'bg-green-50'
            },
            { 
              title: 'Farms Assigned', 
              value: new Set(workerShifts.filter(s => s.farm_id).map(s => s.farm_id)).size, 
              subtitle: 'Active locations',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50'
            }
          ].map((stat, index) => (
            <motion.div key={stat.title} variants={itemVariants} whileHover={cardHover}>
              <Card className={`${stat.bgColor} border-0`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color}`}
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
                  </motion.div>
                  <motion.p 
                    className="text-xs text-muted-foreground mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    {stat.subtitle}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WorkerDashboard;
