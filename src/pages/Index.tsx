
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Building2, Clock, Shield, Smartphone } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import AdminDashboard from "@/components/AdminDashboard";
import WorkerDashboard from "@/components/WorkerDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "worker">("admin");
  const [showAuth, setShowAuth] = useState(false);

  // Mock authentication for demo purposes
  const handleAuthSuccess = (role: "admin" | "worker") => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAuth(false);
  };

  if (isAuthenticated) {
    return userRole === "admin" ? (
      <AdminDashboard onLogout={handleLogout} />
    ) : (
      <WorkerDashboard onLogout={handleLogout} />
    );
  }

  if (showAuth) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} onBack={() => setShowAuth(false)} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">FarmShift Manager</h1>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => setShowAuth(true)} className="bg-green-600 hover:bg-green-700">
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Streamline Your Farm Operations
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Efficiently manage livestock and dairy farm shifts with our intuitive scheduling system. 
            Perfect for farm managers and workers.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" onClick={() => setShowAuth(true)} className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Farm Shifts
            </h2>
            <p className="text-lg text-gray-600">
              From scheduling to team management, we've got your farm covered.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-green-600" />
                    <CardTitle>Smart Scheduling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Visual calendar with color-coded shifts. Create recurring patterns and manage multiple farms effortlessly.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <CardTitle>Team Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Organize workers by roles, assign them to specific farms, and track their specializations.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <CardTitle>Role-Based Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Secure authentication with admin and worker roles. Everyone sees what they need to see.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <CardTitle>Shift Types</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Morning, Evening, Night, and Off shifts with custom notes and requirements for each assignment.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-6 w-6 text-red-600" />
                    <CardTitle>Multi-Farm Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Manage multiple farm locations with different zones and specialized operations.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-6 w-6 text-teal-600" />
                    <CardTitle>Mobile Friendly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Responsive design perfect for tablets and phones used throughout the farm.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Shift Types Preview */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Color-Coded Shift System
            </h2>
            <p className="text-lg text-gray-600">
              Easily identify shift types at a glance with our intuitive color system.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mb-3">
                  Morning Shift
                </Badge>
              </motion.div>
              <p className="text-gray-600">5:00 AM - 1:00 PM</p>
              <p className="text-sm text-gray-500">Milking, Feeding, Health checks</p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-orange-100 text-orange-800 text-lg px-4 py-2 mb-3">
                  Evening Shift
                </Badge>
              </motion.div>
              <p className="text-gray-600">1:00 PM - 9:00 PM</p>
              <p className="text-sm text-gray-500">Barn cleaning, Maintenance</p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mb-3">
                  Night Shift
                </Badge>
              </motion.div>
              <p className="text-gray-600">9:00 PM - 5:00 AM</p>
              <p className="text-sm text-gray-500">Security, Emergency care</p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-gray-100 text-gray-800 text-lg px-4 py-2 mb-3">
                  Off Day
                </Badge>
              </motion.div>
              <p className="text-gray-600">Rest & Recovery</p>
              <p className="text-sm text-gray-500">Planned time off</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="bg-green-600 p-2 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold">FarmShift Manager</h3>
            </motion.div>
            <p className="text-gray-400 mb-6">
              Modernizing farm operations, one shift at a time.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => setShowAuth(true)} className="bg-green-600 hover:bg-green-700">
                Start Managing Your Farm Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
