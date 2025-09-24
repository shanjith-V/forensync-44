import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaseCard } from "@/components/CaseCard";
import { RFIDReaderStatus } from "@/components/RFIDReaderStatus";
import { BarChart3, FolderOpen, Package, Users, TrendingUp } from "lucide-react";
import { mockCases } from "@/data/mockData";

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCases = mockCases.filter(case_ => 
    statusFilter === "all" || case_.status === statusFilter
  );

  const stats = [
    { title: "Total Cases", value: "24", icon: FolderOpen, color: "text-primary" },
    { title: "Active Cases", value: "8", icon: TrendingUp, color: "text-success" },
    { title: "Evidence Items", value: "127", icon: Package, color: "text-warning" },
    { title: "Active Users", value: "12", icon: Users, color: "text-primary" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of forensic evidence tracking system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Recent Cases
            </h2>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => navigate("/add-case")}>Add New Case</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCases.map((case_) => (
              <CaseCard 
                key={case_.id} 
                caseData={case_} 
                onClick={() => navigate(`/cases/${case_.id}`)}
              />
            ))}
          </div>
        </div>

        {/* RFID Status */}
        <div>
          <RFIDReaderStatus />
        </div>
      </div>
    </div>
  );
}