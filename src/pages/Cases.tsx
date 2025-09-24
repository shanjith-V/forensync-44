import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaseCard } from "@/components/CaseCard";
import { Search, Plus, Filter } from "lucide-react";
import { mockCases } from "@/data/mockData";

export default function Cases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [investigatorFilter, setInvestigatorFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesInvestigator = investigatorFilter === "all" || case_.investigator === investigatorFilter;
    
    return matchesSearch && matchesStatus && matchesInvestigator;
  });

  const investigators = [...new Set(mockCases.map(case_ => case_.investigator))];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground">Manage and view all forensic investigation cases</p>
        </div>
        <Button onClick={() => navigate("/add-case")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Case
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={investigatorFilter} onValueChange={setInvestigatorFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Investigator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Investigators</SelectItem>
            {investigators.map(investigator => (
              <SelectItem key={investigator} value={investigator}>
                {investigator}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {filteredCases.length} Case{filteredCases.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((case_) => (
            <CaseCard 
              key={case_.id} 
              caseData={case_} 
              onClick={() => navigate(`/cases/${case_.id}`)}
            />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cases found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}