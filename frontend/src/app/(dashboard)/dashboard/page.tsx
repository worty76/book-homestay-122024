"use client";

import { useState, useEffect } from "react";
import {
  BedDouble,
  CalendarDays,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  DonutChart,
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
  Metric,
  Text,
} from "@tremor/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface OverallStats {
  counts: {
    users: number;
    rooms: number;
    bookings: number;
    blogs: number;
  };
  bookingStatus: {
    confirmed: number;
    pending: number;
    cancelled: number;
  };
  revenue: {
    total: number;
  };
  recentActivity: any[];
}

interface RoomStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  unavailableRooms: number;
  occupancyRate: string;
}

interface UserStats {
  totalUsers: number;
  newUsers: number;
  userTypes: {
    admin: number;
    regular: number;
  };
  accountStatus: {
    verified: number;
    unverified: number;
  };
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        if (!token) {
          console.error("Authentication token not found");
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Fetch overall statistics
        const overallRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/statistics/overall`,
          { headers }
        );
        const overallData = await overallRes.json();
        if (overallData.success) {
          setOverallStats(overallData.data);
        }

        // Fetch room occupancy statistics
        const roomsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/statistics/rooms`,
          { headers }
        );
        const roomsData = await roomsRes.json();
        if (roomsData.success) {
          setRoomStats(roomsData.data);
        }

        // Fetch user statistics
        const usersRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/statistics/users`,
          { headers }
        );
        const usersData = await usersRes.json();
        if (usersData.success) {
          setUserStats(usersData.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [token]);

  // Enhanced loading check: verify that all required data is present
  const isDataLoaded = !loading && overallStats && roomStats && userStats;

  if (!isDataLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Loading dashboard data...</h2>
        <p className="text-muted-foreground mt-2">
          Please wait while we fetch the latest statistics
        </p>
      </div>
    );
  }

  // Fix colors - use color names for Tremor's DonutChart instead of hex values
  const verificationColors = ["emerald", "rose"];
  const verificationColorClasses = ["bg-emerald-500", "bg-rose-500"];

  // Prepare data for visualizations with verified data now available
  const userVerificationData = [
    {
      name: "Verified",
      value: userStats.accountStatus.verified,
    },
    {
      name: "Unverified",
      value: userStats.accountStatus.unverified,
    },
  ];

  const bookingStatusData = [
    {
      name: "Confirmed",
      value: overallStats.bookingStatus.confirmed,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: overallStats.bookingStatus.pending,
      color: "#eab308",
    },
    {
      name: "Cancelled",
      value: overallStats.bookingStatus.cancelled,
      color: "#f43f5e",
    },
  ];

  const otherStatsData = [
    {
      metric: "Total Blogs",
      value: overallStats.counts.blogs,
    },
    {
      metric: "New Users (30 days)",
      value: userStats.newUsers,
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      {/* Counts Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.counts.rooms}
            </div>
            <p className="text-xs text-muted-foreground">
              {roomStats.occupiedRooms} currently occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats?.counts.users || 0}
            </div>
            {userStats && (
              <p className="text-xs text-muted-foreground">
                {userStats.newUsers} new in last 30 days
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats?.counts.bookings || 0}
            </div>
            {overallStats && (
              <p className="text-xs text-muted-foreground">
                {overallStats.bookingStatus.confirmed} confirmed bookings
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${overallStats?.revenue.total.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              From confirmed bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Room & Booking Status with Enhanced Tables */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            {roomStats && (
              <div className="space-y-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <Text>Occupancy Rate</Text>
                    <div className="flex items-center">
                      <Metric>{roomStats.occupancyRate}%</Metric>
                    </div>
                  </div>
                  <ProgressBar
                    value={parseFloat(roomStats.occupancyRate)}
                    color={
                      parseFloat(roomStats.occupancyRate) > 70
                        ? "emerald"
                        : parseFloat(roomStats.occupancyRate) > 40
                        ? "amber"
                        : "rose"
                    }
                    className="mt-2"
                  />
                </div>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Room Status</TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Count
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Percentage
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Badge color="emerald">Available</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.availableRooms}
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.totalRooms > 0
                          ? (
                              (roomStats.availableRooms /
                                roomStats.totalRooms) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge color="amber">Occupied</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.occupiedRooms}
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.totalRooms > 0
                          ? (
                              (roomStats.occupiedRooms / roomStats.totalRooms) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge color="rose">Unavailable</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.unavailableRooms}
                      </TableCell>
                      <TableCell className="text-right">
                        {roomStats.totalRooms > 0
                          ? (
                              (roomStats.unavailableRooms /
                                roomStats.totalRooms) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            {overallStats && (
              <div className="space-y-6">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Count
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Percentage
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <Text>Confirmed</Text>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {overallStats.bookingStatus.confirmed}
                      </TableCell>
                      <TableCell className="text-right">
                        {calculatePercentage(
                          overallStats.bookingStatus.confirmed,
                          overallStats.counts.bookings
                        )}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                          <Text>Pending</Text>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {overallStats.bookingStatus.pending}
                      </TableCell>
                      <TableCell className="text-right">
                        {calculatePercentage(
                          overallStats.bookingStatus.pending,
                          overallStats.counts.bookings
                        )}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          <Text>Cancelled</Text>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {overallStats.bookingStatus.cancelled}
                      </TableCell>
                      <TableCell className="text-right">
                        {calculatePercentage(
                          overallStats.bookingStatus.cancelled,
                          overallStats.counts.bookings
                        )}
                        %
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Text>Conversion Rate</Text>
                      <Badge color="emerald">
                        {calculatePercentage(
                          overallStats.bookingStatus.confirmed,
                          overallStats.counts.bookings
                        )}
                        %
                      </Badge>
                    </div>
                    <Text className="text-slate-500 dark:text-slate-400 text-sm">
                      Percentage of total bookings that converted to confirmed
                      status
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced User Statistics with Fixed Colors */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {userStats && (
              <div>
                <Text className="font-medium mb-2">Account Verification</Text>
                <div className="h-[250px]">
                  <DonutChart
                    data={userVerificationData}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value} users`}
                    colors={verificationColors}
                    className="mt-2"
                    showAnimation
                    showTooltip
                    showLabel
                  />
                </div>
                <div className="mt-4">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${verificationColorClasses[0]}`}
                            ></div>
                            <Text>Verified Accounts</Text>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {userStats.accountStatus.verified}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculatePercentage(
                            userStats.accountStatus.verified,
                            userStats.totalUsers
                          )}
                          %
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${verificationColorClasses[1]}`}
                            ></div>
                            <Text>Unverified Accounts</Text>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {userStats.accountStatus.unverified}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculatePercentage(
                            userStats.accountStatus.unverified,
                            userStats.totalUsers
                          )}
                          %
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Analysis card - KEEP AS IS */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {overallStats && (
              <div className="space-y-6">
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                          index,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            25 + innerRadius + (outerRadius - innerRadius);
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y}
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              className="text-xs"
                            >
                              {bookingStatusData[index].name} ({value})
                            </text>
                          );
                        }}
                      >
                        {bookingStatusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, props) => [
                          `${value} bookings`,
                          props.payload.name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-4">
                    Blogs & New Users
                  </h3>
                  <BarChart
                    data={otherStatsData}
                    index="metric"
                    categories={["value"]}
                    colors={["violet"]}
                    valueFormatter={(value) => `${value}`}
                    yAxisWidth={48}
                    showAnimation
                    className="h-40"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Helper function to calculate percentages
function calculatePercentage(value: number, total: number): string {
  if (total === 0) return "0.0";
  return ((value / total) * 100).toFixed(1);
}
